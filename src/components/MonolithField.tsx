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
  lastActiveTime: number;
  hasMark?: boolean;
}

export const MonolithField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  // Keep theme ref updated without re-triggering canvas rebuilds
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
    let modules: Module[] = [];
    let isPointerDown = false;
    let isVisible = true;

    // Pointer state stored outside React state
    const pointer = {
      x: -1000,
      y: -1000,
      radius: 220,
      targetX: -1000,
      targetY: -1000,
    };

    // Trace path mode state
    const tracePath: { x: number; y: number; time: number }[] = [];

    // Check reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize modules grid
    const initModules = (w: number, h: number) => {
      modules = [];
      const cellSize = 24;
      const gap = 5;
      const cols = Math.floor((w + gap) / (cellSize + gap));
      const rows = Math.floor((h + gap) / (cellSize + gap));

      // Grid occupancy tracker
      const occupied = Array.from({ length: rows }, () => Array(cols).fill(false));
      let idCounter = 0;

      const moduleSizes = [
        { w: 1, h: 1, weight: 0.35 },
        { w: 2, h: 1, weight: 0.25 },
        { w: 1, h: 2, weight: 0.2 },
        { w: 2, h: 2, weight: 0.15 },
        { w: 3, h: 1, weight: 0.05 },
      ];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (occupied[r][c]) continue;
          
          // Intentional structural voids (~30-40% empty space)
          if (Math.random() < 0.35) continue;

          // Pick size
          const size = moduleSizes[Math.floor(Math.random() * moduleSizes.length)];
          const mw = Math.min(size.w, cols - c);
          const mh = Math.min(size.h, rows - r);

          // Check if space is clear
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
            // Mark occupied
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
              intensity: 0,
              targetIntensity: 0,
              lastActiveTime: 0,
              hasMark: Math.random() < 0.12, // 12% tiny code mark
            });
          }
        }
      }

      // Compute sparse precomputed adjacency graph
      modules.forEach((modA) => {
        modules.forEach((modB) => {
          if (modA.id === modB.id) return;
          const centerA = { x: modA.x + modA.w / 2, y: modA.y + modA.h / 2 };
          const centerB = { x: modB.x + modB.w / 2, y: modB.y + modB.h / 2 };
          const dist = Math.hypot(centerA.x - centerB.x, centerA.y - centerB.y);
          if (dist < cellSize * 3) {
            modA.neighbors.push(modB.id);
          }
        });
      });
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initModules(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // IntersectionObserver to pause offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Pointer events
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;

      if (isPointerDown) {
        tracePath.push({
          x: pointer.targetX,
          y: pointer.targetY,
          time: performance.now(),
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      handlePointerMove(e);
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    const handlePointerLeave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      isPointerDown = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Main render loop
    let lastTime = performance.now();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth pointer position ease
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;

      // Prune trace path older than 800ms
      while (tracePath.length > 0 && now - tracePath[0].time > 800) {
        tracePath.shift();
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = themeRef.current === 'light';

      // Colors based on theme
      const idleFill = isLight ? '#EEEDE7' : '#11151A';
      const idleBorder = isLight ? 'rgba(8,10,12,0.07)' : 'rgba(244,243,238,0.055)';
      const orangeHex = isLight ? '#E85D00' : '#FF6B00';
      const markColor = isLight ? '#7D8185' : '#70747A';

      // Update and draw modules
      modules.forEach((mod) => {
        const cx = mod.x + mod.w / 2;
        const cy = mod.y + mod.h / 2;
        const dist = Math.hypot(cx - pointer.x, cy - pointer.y);

        let intensityFromPointer = 0;
        if (dist < pointer.radius && !reducedMotion) {
          const t = Math.max(0, 1 - dist / pointer.radius);
          intensityFromPointer = t * t; // Continuous quadratic falloff
        }

        // Trace path intensity
        let intensityFromTrace = 0;
        if (tracePath.length > 0 && !reducedMotion) {
          for (const point of tracePath) {
            const dTrace = Math.hypot(cx - point.x, cy - point.y);
            if (dTrace < 70) {
              const age = (now - point.time) / 800;
              const val = (1 - dTrace / 70) * (1 - age);
              if (val > intensityFromTrace) intensityFromTrace = val;
            }
          }
        }

        mod.targetIntensity = Math.max(intensityFromPointer, intensityFromTrace);

        // Smooth transition toward target intensity
        mod.intensity += (mod.targetIntensity - mod.intensity) * (dt * 8);

        // Draw module background
        ctx.fillStyle = idleFill;
        ctx.fillRect(mod.x, mod.y, mod.w, mod.h);

        // Orange surface lift when active
        if (mod.intensity > 0.02) {
          ctx.fillStyle = isLight
            ? `rgba(232, 93, 0, ${mod.intensity * 0.28})`
            : `rgba(255, 107, 0, ${mod.intensity * 0.35})`;
          ctx.fillRect(mod.x, mod.y, mod.w, mod.h);
        }

        // Module border
        if (mod.intensity > 0.1) {
          ctx.strokeStyle = isLight
            ? `rgba(232, 93, 0, ${0.15 + mod.intensity * 0.7})`
            : `rgba(255, 107, 0, ${0.2 + mod.intensity * 0.8})`;
          ctx.lineWidth = mod.intensity > 0.6 ? 1.5 : 1;
        } else {
          ctx.strokeStyle = idleBorder;
          ctx.lineWidth = 1;
        }
        ctx.strokeRect(mod.x + 0.5, mod.y + 0.5, mod.w - 1, mod.h - 1);

        // Optional tiny code mark
        if (mod.hasMark && mod.w >= 40 && mod.h >= 24) {
          ctx.fillStyle = mod.intensity > 0.4 ? orangeHex : markColor;
          ctx.font = '9px Geist Mono, monospace';
          ctx.fillText(
            `SYS.${mod.id.toString().padStart(2, '0')}`,
            mod.x + 6,
            mod.y + mod.h - 8
          );
        }

        // Draw orthogonal connection lines to active neighbors
        if (mod.intensity > 0.3 && !reducedMotion) {
          mod.neighbors.forEach((nId) => {
            const nMod = modules[nId];
            if (nMod && nMod.intensity > 0.2) {
              ctx.beginPath();
              ctx.strokeStyle = isLight ? 'rgba(232, 93, 0, 0.4)' : 'rgba(255, 107, 0, 0.5)';
              ctx.lineWidth = 1;

              // Orthogonal stepped route
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

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] lg:min-h-[560px] overflow-hidden select-none cursor-crosshair rounded-lg border border-mc-border-soft bg-mc-surface-deep/60"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
      {/* Decorative coordinate watermark */}
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-mc-text-tertiary pointer-events-none uppercase tracking-widest">
        FIELD / 24 • PROXIMITY ACTIVE
      </div>
    </div>
  );
};
