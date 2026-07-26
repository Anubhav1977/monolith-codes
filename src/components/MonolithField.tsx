import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Module {
  x: number;
  y: number;
  w: number;
  h: number;
  id: number;
  neighbors: number[];
  intensity: number;
  targetIntensity: number;
  hasMark?: boolean;
}

export const MonolithField: React.FC = () => {
  // Canvas element ref (this is what we actually draw on)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Wrapping div ref, used for sizing + pointer/touch event listeners
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  // Keep a ref copy of the theme so the render loop (started once in useEffect)
  // always reads the *current* theme instead of the value captured at mount time
  const themeRef = useRef(resolvedTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let modules: Module[] = []; // all the "bit" rectangles currently on screen
    let isPointerDown = false; // true while mouse/touch is held down (drag)
    let isHovered = false; // true while pointer is inside the container
    let isVisible = true; // pauses the render loop when scrolled off-screen

    // Pointer glow/interaction radius.
    // CHANGE: reduced from 130 -> 92 so the hover/drag glow affects a smaller
    // area and feels less distracting while reading the hero text.
    const pointer = {
      x: -1000,
      y: -1000,
      radius: 100,
      targetX: -1000,
      targetY: -1000,
    };

    // Recent drag positions, used to leave a fading "trail" of lit-up bits
    const tracePath: { x: number; y: number; time: number }[] = [];

    // Respect the OS-level "reduce motion" accessibility setting
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Builds the grid of bit-modules (the little rectangles) for a given canvas size
    const initModules = (w: number, h: number) => {
      modules = [];

      // Bit sizing.
      // CHANGE: cellSize reduced 14 -> 11 and gap reduced 3 -> 2 so each
      // "bit" box renders smaller/denser. Adjust these two numbers to make
      // bits bigger/smaller again.
      const cellSize = 11;
      const gap = 2;

      const cols = Math.floor((w + gap) / (cellSize + gap));
      const rows = Math.floor((h + gap) / (cellSize + gap));

      // Tracks which grid cells are already filled by a placed module
      const occupied = Array.from({ length: rows }, () => Array(cols).fill(false));
      let idCounter = 0;

      // Possible module footprints (in grid cells) and how often each occurs
      const moduleSizes = [
        { w: 1, h: 1, weight: 0.55 }, // Single bit
        { w: 2, h: 1, weight: 0.25 }, // Dual bit horizontal
        { w: 1, h: 2, weight: 0.12 }, // Dual bit vertical
        { w: 2, h: 2, weight: 0.08 }, // Quad bit block
      ];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (occupied[r][c]) continue;

          // Leave ~35% of cells empty so the field doesn't look like a solid wall
          if (Math.random() < 0.35) continue;

          const size = moduleSizes[Math.floor(Math.random() * moduleSizes.length)];
          const mw = Math.min(size.w, cols - c);
          const mh = Math.min(size.h, rows - r);

          // Check every cell the module would occupy is actually free
          let canPlace = true;
          for (let dr = 0; dr < mh; dr++) {
            for (let dc = 0; dc < mw; dc++) {
              if (occupied[r + dr][c + dc]) {
                canPlace = false;
                break;
              }
            }
            if (!canPlace) break;
          }

          if (canPlace) {
            // Mark those cells as used
            for (let dr = 0; dr < mh; dr++) {
              for (let dc = 0; dc < mw; dc++) {
                occupied[r + dr][c + dc] = true;
              }
            }

            const posX = c * (cellSize + gap);
            const posY = r * (cellSize + gap);
            const modWidth = mw * cellSize + (mw - 1) * gap;
            const modHeight = mh * cellSize + (mh - 1) * gap;

            modules.push({
              id: idCounter++,
              x: posX,
              y: posY,
              w: modWidth,
              h: modHeight,
              neighbors: [],
              intensity: 0, // current lit-up amount (animates toward targetIntensity)
              targetIntensity: 0,
              hasMark: Math.random() < 0.08, // ~8% of bits get a tiny "b.XX" label when lit
            });
          }
        }
      }

      // Precompute which modules are close enough to each other to ever draw
      // a connecting "signal line" between them (done once, not every frame)
      modules.forEach((modA) => {
        modules.forEach((modB) => {
          if (modA.id === modB.id) return;
          const centerA = { x: modA.x + modA.w / 2, y: modA.y + modA.h / 2 };
          const centerB = { x: modB.x + modB.w / 2, y: modB.y + modB.h / 2 };
          const dist = Math.hypot(centerA.x - centerB.x, centerA.y - centerB.y);
          if (dist < cellSize * 2.0) {
            modA.neighbors.push(modB.id);
          }
        });
      });
    };

    // Re-measures the container and rebuilds the canvas + grid whenever size changes
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap device pixel ratio for perf
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initModules(width, height);
    };

    // Rebuild the grid any time the container's size changes (e.g. window resize)
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Pause the animation loop when the hero is scrolled out of view (saves CPU/battery)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Converts a raw mouse/touch client position into canvas-local coordinates
    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      // First-ever position: snap instantly instead of animating in from off-screen
      if (pointer.targetX < -500) {
        pointer.x = px;
        pointer.y = py;
      }
      pointer.targetX = px;
      pointer.targetY = py;
      isHovered = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
      if (isPointerDown) {
        // While dragging, record positions to build the fading trail
        tracePath.push({
          x: pointer.targetX,
          y: pointer.targetY,
          time: performance.now(),
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      updatePointerPos(e.clientX, e.clientY);
      tracePath.push({
        x: pointer.targetX,
        y: pointer.targetY,
        time: performance.now(),
      });
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      isPointerDown = false;
      // Move pointer far off-canvas so nothing stays lit after the cursor leaves
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Touch support (pointer events cover most cases, but this keeps mobile drag smooth)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTime = performance.now();

    // Main animation loop - runs every frame
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return; // skip work while off-screen

      const dt = Math.min((now - lastTime) / 1000, 0.05); // delta time, capped to avoid jumps
      lastTime = now;

      // Smoothly ease the visual pointer position toward the real (target) pointer position
      const lerpSpeed = isPointerDown ? 0.35 : 0.22;
      pointer.x += (pointer.targetX - pointer.x) * lerpSpeed;
      pointer.y += (pointer.targetY - pointer.y) * lerpSpeed;

      // Drop trace points older than 500ms so the drag trail fades out
      while (tracePath.length > 0 && now - tracePath[0].time > 500) {
        tracePath.shift();
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = themeRef.current === 'light';

      // Field accent color.
      // CHANGE: this used to reuse the same brand orange as the hero text/buttons
      // (#E85D00 / #FF6B00), which visually competed with the orange headline
      // and CTA. It's now a neutral slate/steel tone instead, so the orange in
      // the text and buttons stays the only orange on screen and actually pops.
      const activeHex = isLight ? '#475569' : '#94A3B8'; // slate-600 / slate-400
      const activeRgb = isLight ? '71, 85, 105' : '148, 163, 184';
      const markColor = isLight ? '#62666A' : '#9A9CA0';

      // 1. Soft glow that follows the cursor.
      // CHANGE: radius reduced (150/120 -> 100/78) to match the smaller pointer.radius above.
      if (isHovered && pointer.x > -200 && !reducedMotion) {
        const auraRadius = isPointerDown ? 100 : 78;
        const auraGradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          auraRadius
        );
        const auraAlpha = isPointerDown ? 0.12 : 0.07;
        auraGradient.addColorStop(0, `rgba(${activeRgb}, ${auraAlpha})`);
        auraGradient.addColorStop(0.5, `rgba(${activeRgb}, ${auraAlpha * 0.25})`);
        auraGradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw every bit module (background fill, border, optional label/lines)
      modules.forEach((mod) => {
        const cx = mod.x + mod.w / 2;
        const cy = mod.y + mod.h / 2;
        const dist = Math.hypot(cx - pointer.x, cy - pointer.y);

        // How lit-up this bit should be based on distance to the pointer
        let intensityFromPointer = 0;
        if (dist < pointer.radius && isHovered && !reducedMotion) {
          const t = Math.max(0, 1 - dist / pointer.radius);
          intensityFromPointer = t * t * (3 - 2 * t); // smoothstep easing
        }

        // How lit-up this bit should be based on the recent drag trail
        let intensityFromTrace = 0;
        if (tracePath.length > 0 && !reducedMotion) {
          for (const point of tracePath) {
            const dTrace = Math.hypot(cx - point.x, cy - point.y);
            if (dTrace < 45) {
              const age = (now - point.time) / 500;
              const val = (1 - dTrace / 45) * (1 - age);
              if (val > intensityFromTrace) intensityFromTrace = val;
            }
          }
        }

        // Take whichever effect is stronger, then smoothly animate toward it
        mod.targetIntensity = Math.max(intensityFromPointer, intensityFromTrace);
        mod.intensity += (mod.targetIntensity - mod.intensity) * (dt * 14);

        if (mod.intensity <= 0.005) return; // skip drawing fully-dark bits (perf)

        const currentIntensity = Math.min(mod.intensity, 1);

        // Bit background fill - opacity scales with how lit-up it is
        const bgAlpha = isLight
          ? 0.05 + currentIntensity * 0.25
          : 0.06 + currentIntensity * 0.35;
        ctx.fillStyle = `rgba(${activeRgb}, ${bgAlpha})`;
        ctx.fillRect(mod.x, mod.y, mod.w, mod.h);

        // Bit border - also scales with intensity, slightly stronger than the fill
        const borderAlpha = isLight
          ? 0.18 + currentIntensity * 0.7
          : 0.22 + currentIntensity * 0.8;
        ctx.strokeStyle = `rgba(${activeRgb}, ${borderAlpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(mod.x + 0.5, mod.y + 0.5, mod.w - 1, mod.h - 1);

        // Rare tiny "b.XX" code label, only on bigger bits once they're mostly lit
        if (mod.hasMark && mod.w >= 28 && mod.h >= 14 && currentIntensity > 0.4) {
          ctx.fillStyle = currentIntensity > 0.7 ? activeHex : markColor;
          ctx.font = '8px Geist Mono, monospace';
          ctx.fillText(
            `b.${mod.id.toString().slice(-2)}`,
            mod.x + 3,
            mod.y + mod.h - 3
          );
        }

        // Sparse "signal lines" only drawn between two neighboring bits that are both very lit
        if (currentIntensity > 0.65 && !reducedMotion) {
          mod.neighbors.forEach((nId) => {
            const nMod = modules[nId];
            if (nMod && nMod.intensity > 0.65) {
              const lineAlpha = isLight
                ? Math.min(currentIntensity, nMod.intensity) * 0.25
                : Math.min(currentIntensity, nMod.intensity) * 0.35;

              ctx.beginPath();
              ctx.strokeStyle = `rgba(${activeRgb}, ${lineAlpha})`;
              ctx.lineWidth = 1;

              ctx.moveTo(cx, cy);
              ctx.lineTo(nMod.x + nMod.w / 2, cy);
              ctx.lineTo(nMod.x + nMod.w / 2, nMod.y + nMod.h / 2);
              ctx.stroke();
            }
          });
        }
      });
    };

    render(performance.now());

    // Cleanup: cancel the animation frame and remove all listeners on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-crosshair overflow-hidden"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
    </div>
  );
};