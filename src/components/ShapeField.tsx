import React, { useEffect, useRef } from 'react';

/**
 * ShapeField — a packed pile of small geometric shapes resting along the bottom
 * of its host section. Shapes are pushed by the pointer (mouse) or finger (touch),
 * then spring back to their slot; shapes near the pointer warm up to the accent colour
 * and cool down after it passes, leaving a short fading trail. The pile rises into place as the section is
 * scrolled into view, and scroll velocity gives it a small physical nudge.
 *
 * Canvas 2D, single rAF loop, no React state per frame. The loop sleeps when the
 * pile is at rest, pauses offscreen / when the tab is hidden, and renders one
 * static frame under prefers-reduced-motion. Decorative only (aria-hidden).
 */

interface ShapeFieldProps {
  /** Section that hosts the field: sizes the canvas and receives pointer/touch input. */
  hostRef: React.RefObject<HTMLElement | null>;
  /** Headline block: the pile starts just below it so there is no dead gap. */
  contentRef: React.RefObject<HTMLElement | null>;
}

// Shape kinds. "Cross" is a plus rotated 45° (handled via its rest rotation).
const CIRCLE = 0;
const SQUARE = 1;
const TRIANGLE = 2;
const DIAMOND = 3;
const SLAB = 4; // upright monolith rectangle
const PLUS = 5;
const KIND_WEIGHTS = [0.27, 0.21, 0.18, 0.09, 0.09, 0.16];

// Unit vertices for polygon kinds (scaled by each shape's radius).
const POLY: Record<number, readonly number[]> = {
  [SQUARE]: [-0.82, -0.82, 0.82, -0.82, 0.82, 0.82, -0.82, 0.82],
  [TRIANGLE]: [0, -1.1, 1.02, 0.72, -1.02, 0.72],
  [DIAMOND]: [0, -1.18, 0.82, 0, 0, 1.18, -0.82, 0],
  [SLAB]: [-0.46, -1.22, 0.46, -1.22, 0.46, 1.22, -0.46, 1.22],
};

const MAX_SHAPES = 1800;

// Physics (per 60fps frame; scaled by dt).
const SPRING = 0.05;
const DAMP = 0.82;
const ROT_SPRING = 0.04;
const ROT_DAMP = 0.86;

/** Small deterministic PRNG so the pile composition is stable between renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const ShapeField: React.FC<ShapeFieldProps> = ({ hostRef, contentRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    // ---- Particle storage (struct of arrays, allocated once) ----
    const hx = new Float32Array(MAX_SHAPES);
    const hy = new Float32Array(MAX_SHAPES);
    const x = new Float32Array(MAX_SHAPES);
    const y = new Float32Array(MAX_SHAPES);
    const vx = new Float32Array(MAX_SHAPES);
    const vy = new Float32Array(MAX_SHAPES);
    const rot = new Float32Array(MAX_SHAPES);
    const rot0 = new Float32Array(MAX_SHAPES);
    const vr = new Float32Array(MAX_SHAPES);
    const size = new Float32Array(MAX_SHAPES);
    const delay = new Float32Array(MAX_SHAPES);
    const rise = new Float32Array(MAX_SHAPES);
    const kickGain = new Float32Array(MAX_SHAPES);
    const kind = new Uint8Array(MAX_SHAPES);
    const alt = new Uint8Array(MAX_SHAPES);
    const heat = new Float32Array(MAX_SHAPES); // 0..1 pointer warmth
    let count = 0;

    // ---- Frame state ----
    let w = 0;
    let h = 0;
    let dpr = 1;
    let strokeW = 2;
    let radius = 110; // pointer influence radius
    let progress = reduceMotion ? 1 : 0; // scroll-linked "pile has risen" 0..1
    let colorMain = '#F4F3EE';
    let colorAlt = '#080A0C';
    let colorHot = '#FF6B00';

    let pointerActive = false;
    let px = -9999;
    let py = -9999;
    let pvx = 0;
    let pvy = 0;
    let burst = 0; // tap / click pulse
    let kick = 0; // scroll velocity impulse
    let releaseAt = 0; // keep a lifted touch alive briefly so quick taps still register

    let raf = 0;
    let last = 0;
    let visible = false;
    let lastScrollY = window.scrollY;

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      colorMain = cs.getPropertyValue('--wt-shape').trim() || colorMain;
      colorAlt = cs.getPropertyValue('--wt-shape-alt').trim() || colorAlt;
      colorHot = cs.getPropertyValue('--wt-shape-hot').trim() || colorHot;
    };

    const computeProgress = () => {
      if (reduceMotion) return 1;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Starts as the pile region nears the fold; complete once the section's
      // bottom edge is just inside the viewport.
      return clamp01((vh * 1.3 - rect.bottom) / (vh * 0.36));
    };

    const build = () => {
      const rand = mulberry32(0x6d6f6e6f);
      const spacing = w < 640 ? 17 : w < 1024 ? 19 : 22;
      strokeW = spacing * 0.15;
      radius = w < 640 ? 84 : 120;

      // Pile starts below the headline block, within sensible bounds.
      const content = contentRef.current;
      const contentBottom = content ? content.offsetTop + content.offsetHeight + 28 : h * 0.55;
      const fieldTop = Math.min(h * 0.74, Math.max(h * 0.46, contentBottom));
      const fieldH = h - fieldTop;

      const edge = (px0: number) =>
        fieldTop + 16 * Math.sin(px0 * 0.011 + 1.3) + 9 * Math.sin(px0 * 0.029 + 0.4) + 5 * Math.sin(px0 * 0.071);

      count = 0;
      let row = 0;
      for (let ry = h - spacing * 0.5; ry > fieldTop - 70; ry -= spacing * 0.87, row++) {
        const offset = row % 2 ? spacing * 0.5 : 0;
        for (let rx = -spacing * 0.5 + offset; rx < w + spacing; rx += spacing) {
          if (count >= MAX_SHAPES) break;
          const sx = rx + (rand() - 0.5) * spacing * 0.36;
          const sy = ry + (rand() - 0.5) * spacing * 0.36;
          const r = rand();
          // Above the irregular top edge only a few strays survive (scattered look).
          if (sy < edge(sx) && r > 0.035) continue;

          const i = count++;
          let k = 0;
          const kr = rand();
          for (let acc = 0; k < KIND_WEIGHTS.length; k++) {
            acc += KIND_WEIGHTS[k];
            if (kr < acc) break;
          }
          kind[i] = Math.min(k, PLUS);
          alt[i] = rand() < 0.045 ? 1 : 0;
          size[i] = spacing * (0.25 + rand() * 0.07);
          hx[i] = sx;
          hy[i] = sy;
          const plusRot = kind[i] === PLUS && rand() < 0.45 ? Math.PI / 4 : 0;
          rot0[i] = plusRot + (kind[i] === CIRCLE || kind[i] === PLUS ? 0 : (rand() - 0.5) * 0.9);

          // Bottom rows rise first; a random spread keeps the edge organic.
          const depth = clamp01((h - sy) / Math.max(1, fieldH));
          delay[i] = depth * 0.5 + rand() * 0.3;
          rise[i] = fieldH + 40 + rand() * 80;
          kickGain[i] = 0.4 + rand() * 0.6;

          const settled = clamp01((progress - delay[i]) / 0.25);
          x[i] = sx;
          y[i] = sy + (1 - settled) * rise[i];
          rot[i] = rot0[i];
          vx[i] = vy[i] = vr[i] = heat[i] = 0;
        }
      }
    };

    const resize = () => {
      const nw = host.clientWidth;
      const nh = host.clientHeight;
      // Ignore tiny height changes (mobile URL bar) to keep the pile stable.
      if (nw === w && Math.abs(nh - h) < 60 && count) return;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      progress = computeProgress();
      build();
      draw();
      wake();
    };

    const addPath = (i: number) => {
      const cx = x[i];
      const cy = y[i];
      const r = size[i];
      const k = kind[i];
      if (k === CIRCLE) {
        ctx.moveTo(cx + r * 0.9, cy);
        ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
        return;
      }
      const c = Math.cos(rot[i]);
      const s = Math.sin(rot[i]);
      if (k === PLUS) {
        const a = r * 1.05;
        ctx.moveTo(cx - a * c, cy - a * s);
        ctx.lineTo(cx + a * c, cy + a * s);
        ctx.moveTo(cx + a * s, cy - a * c);
        ctx.lineTo(cx - a * s, cy + a * c);
        return;
      }
      const v = POLY[k];
      for (let j = 0; j < v.length; j += 2) {
        const lx = v[j] * r;
        const ly = v[j + 1] * r;
        const px0 = cx + lx * c - ly * s;
        const py0 = cy + lx * s + ly * c;
        if (j === 0) ctx.moveTo(px0, py0);
        else ctx.lineTo(px0, py0);
      }
      ctx.closePath();
    };

    // 0 = base, 1 = accent-neutral, 2 = warm (fading accent), 3 = hot (full accent)
    const group = (i: number) => (heat[i] > 0.5 ? 3 : heat[i] > 0.12 ? 2 : alt[i]);

    const drawBatch = (g: number, strokes: boolean) => {
      ctx.beginPath();
      const limit = h + 12;
      for (let i = 0; i < count; i++) {
        if (group(i) !== g || (kind[i] === PLUS) !== strokes || y[i] > limit) continue;
        addPath(i);
      }
      if (strokes) ctx.stroke();
      else ctx.fill();
    };

    function draw() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = strokeW;
      ctx!.lineCap = 'butt';
      ctx!.fillStyle = colorMain;
      ctx!.strokeStyle = colorMain;
      drawBatch(0, false);
      drawBatch(0, true);
      ctx!.fillStyle = colorAlt;
      ctx!.strokeStyle = colorAlt;
      drawBatch(1, false);
      drawBatch(1, true);
      ctx!.fillStyle = colorHot;
      ctx!.strokeStyle = colorHot;
      ctx!.globalAlpha = 0.5;
      drawBatch(2, false);
      drawBatch(2, true);
      ctx!.globalAlpha = 1;
      drawBatch(3, false);
      drawBatch(3, true);
    }

    const step = (now: number) => {
      raf = 0;
      if (releaseAt && now >= releaseAt) {
        releaseAt = 0;
        pointerActive = false;
        px = py = -9999;
      }
      const dt = Math.min(2.5, Math.max(0.25, (now - (last || now - 16.7)) / 16.667));
      last = now;

      const damp = Math.pow(DAMP, dt);
      const rdamp = Math.pow(ROT_DAMP, dt);
      const r2 = radius * radius;
      const push = 1.9 + burst * 5;
      let moving = false;

      for (let i = 0; i < count; i++) {
        const settled = clamp01((progress - delay[i]) / 0.25);
        const e = 1 - (1 - settled) * (1 - settled) * (1 - settled);
        const ty = hy[i] + (1 - e) * rise[i];

        let ax = (hx[i] - x[i]) * SPRING;
        let ay = (ty - y[i]) * SPRING;
        let warm = 0;

        if (pointerActive) {
          const dx = x[i] - px;
          const dy = y[i] - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) + 0.001;
            let f = 1 - d / radius;
            warm = Math.min(1, f * 1.5);
            f *= f;
            ax += (dx / d) * f * push + pvx * f * 0.22;
            ay += (dy / d) * f * push + pvy * f * 0.22;
            vr[i] += (dx > 0 ? 0.035 : -0.035) * f * (1 + burst);
          }
        }
        if (kick !== 0) vy[i] += kick * kickGain[i];

        // Warm up quickly, cool down slowly → a short trail behind the pointer.
        heat[i] += (warm - heat[i]) * Math.min(1, (warm > heat[i] ? 0.3 : 0.045) * dt);
        if (heat[i] < 0.005) heat[i] = 0;

        vx[i] = (vx[i] + ax * dt) * damp;
        vy[i] = (vy[i] + ay * dt) * damp;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;

        vr[i] = (vr[i] + (rot0[i] - rot[i]) * ROT_SPRING * dt) * rdamp;
        rot[i] += vr[i] * dt;

        if (
          !moving &&
          (Math.abs(vx[i]) + Math.abs(vy[i]) > 0.03 ||
            Math.abs(ty - y[i]) > 0.2 ||
            Math.abs(hx[i] - x[i]) > 0.2 ||
            Math.abs(vr[i]) > 0.002 ||
            heat[i] > 0)
        ) {
          moving = true;
        }
      }

      kick = 0;
      pvx *= 0.75;
      pvy *= 0.75;
      burst *= Math.pow(0.86, dt);
      if (burst < 0.01) burst = 0;

      draw();
      if (moving || burst > 0 || (pointerActive && (Math.abs(pvx) + Math.abs(pvy) > 0.05))) schedule();
    };

    function schedule() {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(step);
    }

    function wake() {
      if (reduceMotion) return;
      if (!raf) last = 0;
      schedule();
    }

    // ---- Input ----
    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const nx = clientX - rect.left;
      const ny = clientY - rect.top;
      if (pointerActive) {
        pvx = Math.max(-40, Math.min(40, nx - px));
        pvy = Math.max(-40, Math.min(40, ny - py));
      }
      px = nx;
      py = ny;
      pointerActive = true;
      releaseAt = 0;
      wake();
    };
    const release = () => {
      if (pointerActive) releaseAt = performance.now() + 120;
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') setPointer(e.clientX, e.clientY);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setPointer(e.clientX, e.clientY);
      burst = 1;
    };
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') release();
    };
    // Touch: passive listeners so the page still scrolls natively while the
    // finger pushes shapes around.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointerActive = false;
      setPointer(t.clientX, t.clientY);
      burst = 0.8;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    };

    const onScroll = () => {
      const sy = window.scrollY;
      const delta = sy - lastScrollY;
      lastScrollY = sy;
      if (!visible) return;
      progress = computeProgress();
      // Scrolling down jolts the pile upward a touch (and vice-versa).
      kick = Math.max(-2.2, Math.min(2.2, -delta * 0.05));
      // A held finger moves with the page; keep its canvas position in sync.
      if (pointerActive) py += delta;
      wake();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          progress = computeProgress();
          wake();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '120px 0px' },
    );

    const ro = new ResizeObserver(resize);

    // Theme switches change the CSS tokens; re-read and repaint.
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });

    readColors();
    resize();
    io.observe(host);
    ro.observe(host);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    if (!reduceMotion) {
      host.addEventListener('pointermove', onPointerMove, { passive: true });
      host.addEventListener('pointerdown', onPointerDown, { passive: true });
      host.addEventListener('pointerleave', onPointerLeave, { passive: true });
      host.addEventListener('touchstart', onTouchStart, { passive: true });
      host.addEventListener('touchmove', onTouchMove, { passive: true });
      host.addEventListener('touchend', release, { passive: true });
      host.addEventListener('touchcancel', release, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
      host.removeEventListener('pointerleave', onPointerLeave);
      host.removeEventListener('touchstart', onTouchStart);
      host.removeEventListener('touchmove', onTouchMove);
      host.removeEventListener('touchend', release);
      host.removeEventListener('touchcancel', release);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hostRef, contentRef]);

  return <canvas ref={canvasRef} className="wt__field" aria-hidden="true" />;
};
