import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * PillarField3D — a circular plaza of graphite monolith pillars with lit caps,
 * echoing the brandmark's geometry.
 *
 * - Scroll tells the headline's story ("Stop renting templates. Own your software."):
 *   first a uniform grid of identical grey blocks rises (the template), then each
 *   block grows into its own custom height/footprint from the centre outward and
 *   the signature orange caps light up (your system).
 * - Pointer / finger: pillars near it lift and their caps warm to orange; an
 *   orange point light follows the pointer across the field.
 * - Drag (horizontal on touch): rotates the plaza with inertia.
 *
 * Two InstancedMeshes (bodies + caps), no shadows, capped DPR, loop runs only
 * while visible, everything disposed on unmount. Decorative: aria-hidden.
 */

interface Props {
  /** 0..1 scroll progress of the section entering the viewport. */
  getProgress: () => number;
}

const ORANGE = new THREE.Color('#FF6B00');
const TEMPLATE_H = 0.7; // every block identical before it is "owned"
const TEMPLATE_W = 0.86;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const PillarField3D: React.FC<Props> = ({ getProgress }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(getProgress);
  progressRef.current = getProgress;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      host.dataset.fallback = 'true';
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.className = 'own3d__canvas';
    host.appendChild(canvas);

    // ---- Scene ----
    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x080a0c, 20, 40);
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const target = new THREE.Vector3(0, 0.9, 0);

    const N = coarse ? 9 : 13;
    const half = (N - 1) / 2;
    const COUNT = N * N;
    const plazaR = half + 0.35;

    const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
    bodyGeo.translate(0, 0.5, 0);
    const capGeo = new THREE.BoxGeometry(1, 0.07, 1);
    capGeo.translate(0, 0.035, 0);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1b2129, roughness: 0.6, metalness: 0.1 });
    const capMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, COUNT);
    const caps = new THREE.InstancedMesh(capGeo, capMat, COUNT);
    bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    caps.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const group = new THREE.Group();
    group.add(bodies, caps);
    scene.add(group);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x080a0c, 0.9);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(5, 9, 6);
    // Side fill so pillar faces read as height against the dark background.
    const fill = new THREE.DirectionalLight(0xdfe6ee, 0.9);
    fill.position.set(9, 2.5, -2);
    const rim = new THREE.DirectionalLight(0xff8a1f, 1.1);
    rim.position.set(-7, 3, -5);
    const glow = new THREE.PointLight(0xff6b00, 0, 6, 1.4);
    scene.add(hemi, key, fill, rim, glow);

    // ---- Per-pillar data (allocated once) ----
    const px = new Float32Array(COUNT);
    const pz = new Float32Array(COUNT);
    const base = new Float32Array(COUNT);
    const delay = new Float32Array(COUNT);
    const lift = new Float32Array(COUNT);
    const heat = new Float32Array(COUNT);
    const lit = new Float32Array(COUNT); // a few caps glow at rest once customised
    const width = new Float32Array(COUNT); // custom footprint (template is uniform)
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    for (let gz = 0, i = 0; gz < N; gz++) {
      for (let gx = 0; gx < N; gx++, i++) {
        const x = gx - half;
        const z = gz - half;
        const d = Math.hypot(x, z);
        px[i] = x;
        pz[i] = z;
        if (d > plazaR) {
          base[i] = -1; // outside the circular plaza
          continue;
        }
        const dn = d / plazaR;
        const wave = 0.5 + 0.5 * Math.sin(gx * 1.7 + gz * 0.9) * Math.cos(gz * 1.3 - gx * 0.4);
        base[i] = 0.3 + wave * 1.05 + Math.pow(1 - dn, 3) * 2.9 + (rand() < 0.07 ? 1.3 : 0);
        delay[i] = dn * 0.6 + rand() * 0.15;
        width[i] = 0.62 + rand() * 0.26;
        lit[i] = rand() < 0.05 ? 1 : 0;
      }
    }

    // ---- Theme ----
    const capIdle = new THREE.Color();
    const readTheme = () => {
      const cs = getComputedStyle(host);
      const bg = cs.getPropertyValue('--own-scene-bg').trim() || '#080A0C';
      fog.color.set(bg);
      bodyMat.color.set(cs.getPropertyValue('--own-pillar').trim() || '#1B2129');
      capIdle.set(cs.getPropertyValue('--own-cap').trim() || '#2A313B');
      hemi.groundColor.set(bg);
    };
    readTheme();

    // ---- Interaction ----
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.9);
    const hit = new THREE.Vector3();
    const local = new THREE.Vector3();
    const UP = new THREE.Vector3(0, 1, 0);
    let pointerIn = false;
    let dragging = false;
    let lastX = 0;
    let rotY = -0.35;
    let rotVel = 0;
    let glowLevel = 0;

    const updatePointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      pointerIn = !!raycaster.ray.intersectPlane(plane, hit);
    };
    const onMove = (e: PointerEvent) => {
      updatePointer(e);
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        rotVel = dx * 0.006;
        rotY += rotVel;
      }
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      rotVel = 0;
      updatePointer(e);
      if (e.pointerType !== 'touch') canvas.setPointerCapture(e.pointerId);
      host.dataset.dragging = 'true';
    };
    const onUp = () => {
      dragging = false;
      delete host.dataset.dragging;
    };
    const onLeave = (e: PointerEvent) => {
      if (!dragging || e.pointerType === 'touch') pointerIn = false;
    };
    const onCancel = () => {
      onUp();
      pointerIn = false;
    };

    // ---- Frame ----
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    const clock = new THREE.Clock();

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const p = reduce ? 1 : clamp01(progressRef.current());

      if (!dragging) {
        rotVel *= Math.pow(0.9, dt * 60);
        rotY += rotVel + (reduce ? 0 : dt * 0.035);
      }
      group.rotation.y = rotY;

      // Camera settles closer and lower as the field rises.
      const dist = THREE.MathUtils.lerp(coarse ? 24 : 32, coarse ? 20 : 26, easeOut(p));
      const elev = THREE.MathUtils.lerp(0.8, 0.44, easeOut(p));
      fog.near = dist - 4;
      fog.far = dist + 14;
      camera.position.set(Math.sin(0.6) * Math.cos(elev) * dist, Math.sin(elev) * dist, Math.cos(0.6) * Math.cos(elev) * dist);
      camera.lookAt(target);

      // Pointer in plaza-local coordinates.
      let lx = 1e6;
      let lz = 1e6;
      if (pointerIn && !reduce) {
        local.copy(hit).applyAxisAngle(UP, -rotY);
        lx = local.x;
        lz = local.z;
      }
      const R = coarse ? 2.2 : 2.6;
      const kUp = Math.min(1, dt * 9);
      const kDown = Math.min(1, dt * 3);

      for (let i = 0; i < COUNT; i++) {
        if (base[i] < 0) {
          m.makeScale(0, 0, 0);
          bodies.setMatrixAt(i, m);
          caps.setMatrixAt(i, m);
          continue;
        }
        // Phase 1 (p 0→0.3): the uniform template grid rises as one.
        // Phase 2 (p 0.3→1): each block customises, centre first.
        const rise = easeOut(clamp01(p / 0.3));
        const own = reduce ? 1 : easeOut(clamp01((p - 0.3 - delay[i] * 0.55) / 0.3));
        const dx = px[i] - lx;
        const dz = pz[i] - lz;
        const d = Math.sqrt(dx * dx + dz * dz);
        const f = d < R ? (1 - d / R) * (1 - d / R) : 0;

        lift[i] += (f * 1.5 - lift[i]) * (f * 1.5 > lift[i] ? kUp : kDown);
        heat[i] += (f - heat[i]) * (f > heat[i] ? kUp : kDown);

        const h = Math.max(0.001, (TEMPLATE_H + (base[i] - TEMPLATE_H) * own + lift[i]) * rise);
        const w = TEMPLATE_W + (width[i] - TEMPLATE_W) * own;
        m.makeScale(w, h, w);
        m.setPosition(px[i], 0, pz[i]);
        bodies.setMatrixAt(i, m);
        m.makeScale(w, rise > 0.01 ? 1 : 0, w);
        m.setPosition(px[i], h, pz[i]);
        caps.setMatrixAt(i, m);

        col.copy(capIdle).lerp(ORANGE, Math.min(1, Math.max(heat[i] * 1.4, lit[i] * own)));
        caps.setColorAt(i, col);
      }
      bodies.instanceMatrix.needsUpdate = true;
      caps.instanceMatrix.needsUpdate = true;
      if (caps.instanceColor) caps.instanceColor.needsUpdate = true;

      glowLevel += ((pointerIn && !reduce ? 1 : 0) - glowLevel) * Math.min(1, dt * 6);
      glow.intensity = glowLevel * 9;
      if (pointerIn) glow.position.set(hit.x, 2.2, hit.z);

      renderer.render(scene, camera);
    };

    // ---- Lifecycle ----
    let visible = false;
    const sync = () => {
      const run = visible && !document.hidden;
      renderer.setAnimationLoop(run ? frame : null);
      if (run) clock.getDelta();
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (!visible || reduce) frame();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    const ro = new ResizeObserver(resize);
    const mo = new MutationObserver(() => {
      readTheme();
      frame();
    });

    resize();
    frame();
    io.observe(host);
    ro.observe(host);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', sync);
    if (!reduce) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('pointercancel', onCancel);
    }

    return () => {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', sync);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointercancel', onCancel);
      bodyGeo.dispose();
      capGeo.dispose();
      bodyMat.dispose();
      capMat.dispose();
      bodies.dispose();
      caps.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="own3d" aria-hidden="true" />;
};

export default PillarField3D;
