import React, { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  MonolithPillars                                                     */
/*  Three architectural graphite pillars (inline SVG) echoing the      */
/*  MONOLITH CODES logo mark, with floating product UI cards.          */
/* ------------------------------------------------------------------ */

export const MonolithPillars: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) el.classList.add('mp-animated');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) el.classList.remove('mp-animated');
      else el.classList.add('mp-animated');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div ref={rootRef} className="mp-root" aria-hidden="true">
      <div className="mp-visual">

        {/* ── Pillar SVG ─────────────────────────────────────── */}
        <svg
          className="mp-svg"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Body gradient — dark top to darker bottom */}
            <linearGradient id="mpPillarGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#272C34" />
              <stop offset="40%"  stopColor="#1E2229" />
              <stop offset="100%" stopColor="#141820" />
            </linearGradient>

            {/* Left-edge highlight */}
            <linearGradient id="mpEdgeGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>

            {/* Orange cap gradient */}
            <linearGradient id="mpCapGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#FFA833" />
              <stop offset="50%"  stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#E84A00" />
            </linearGradient>

            {/* Vertical ribbing pattern */}
            <pattern id="mpRib" x="0" y="0" width="7" height="400" patternUnits="userSpaceOnUse">
              <rect width="6" height="400" fill="transparent" />
              <rect x="6" width="1" height="400" fill="rgba(255,255,255,0.022)" />
            </pattern>

            {/* Cap glow drop-shadow filter */}
            <filter id="mpCapGlow" x="-60%" y="-200%" width="220%" height="600%">
              <feDropShadow dx="0" dy="-5" stdDeviation="7"  floodColor="#FF6B00" floodOpacity="0.55" />
              <feDropShadow dx="0" dy="-2" stdDeviation="2"  floodColor="#FFAA33" floodOpacity="0.30" />
            </filter>
          </defs>

          {/* ────────────────────── LEFT PILLAR (tallest) ──────────────────── */}
          {/* Body */}
          <rect x="22"  y="116" width="72" height="278" rx="2" fill="url(#mpPillarGrad)" stroke="#2B323C" strokeWidth="1" />
          {/* Ribbing */}
          <rect x="22"  y="116" width="72" height="278" rx="2" fill="url(#mpRib)" />
          {/* Left edge highlight */}
          <rect x="22"  y="116" width="2"  height="278" rx="1" fill="url(#mpEdgeGrad)" />
          {/* Orange cap — with glow */}
          <rect x="17"  y="100" width="82" height="18"  rx="2" fill="url(#mpCapGrad)" filter="url(#mpCapGlow)" />
          {/* Animated glow overlay on cap */}
          <rect className="mp-cap-glow mp-cap-glow--left" x="17" y="100" width="82" height="18" rx="2" fill="rgba(255,190,80,0.2)" />
          {/* Cap rim shine */}
          <rect x="17"  y="100" width="82" height="3"   rx="1" fill="rgba(255,218,130,0.55)" />

          {/* ────────────────────── CENTER PILLAR (shortest) ───────────────── */}
          {/* Body */}
          <rect x="114" y="194" width="72" height="200" rx="2" fill="url(#mpPillarGrad)" stroke="#2B323C" strokeWidth="1" />
          <rect x="114" y="194" width="72" height="200" rx="2" fill="url(#mpRib)" />
          <rect x="114" y="194" width="2"  height="200" rx="1" fill="url(#mpEdgeGrad)" />
          {/* Orange cap */}
          <rect x="109" y="178" width="82" height="18"  rx="2" fill="url(#mpCapGrad)" filter="url(#mpCapGlow)" />
          <rect className="mp-cap-glow mp-cap-glow--center" x="109" y="178" width="82" height="18" rx="2" fill="rgba(255,190,80,0.2)" />
          <rect x="109" y="178" width="82" height="3"   rx="1" fill="rgba(255,218,130,0.55)" />

          {/* ────────────────────── RIGHT PILLAR (tall) ────────────────────── */}
          {/* Body */}
          <rect x="206" y="136" width="72" height="258" rx="2" fill="url(#mpPillarGrad)" stroke="#2B323C" strokeWidth="1" />
          <rect x="206" y="136" width="72" height="258" rx="2" fill="url(#mpRib)" />
          <rect x="206" y="136" width="2"  height="258" rx="1" fill="url(#mpEdgeGrad)" />
          {/* Orange cap */}
          <rect x="201" y="120" width="82" height="18"  rx="2" fill="url(#mpCapGrad)" filter="url(#mpCapGlow)" />
          <rect className="mp-cap-glow mp-cap-glow--right" x="201" y="120" width="82" height="18" rx="2" fill="rgba(255,190,80,0.2)" />
          <rect x="201" y="120" width="82" height="3"   rx="1" fill="rgba(255,218,130,0.55)" />

          {/* Base platform */}
          <rect x="10" y="397" width="280" height="2"   rx="1" fill="#20252D" />
          <rect x="30" y="396" width="240" height="1"   rx="0" fill="rgba(255,107,0,0.08)" />
        </svg>

        {/* ── Web mockup card — left side ─────────────────────────── */}
        <div className="mp-card mp-card--web">
          {/* Browser chrome */}
          <div className="mp-card__bar" />
          {/* Nav bar */}
          <div className="mp-card__nav">
            <span className="mp-card__nav-logo">MC</span>
            <span className="mp-card__nav-link" />
            <span className="mp-card__nav-link" />
            <span className="mp-card__nav-link" />
            <span className="mp-card__nav-cta" />
          </div>
          {/* Hero image area */}
          <div className="mp-card__hero-block">
            <div className="mp-card__hero-kicker">OPERATIONS</div>
            <div className="mp-card__hero-text">Made visible.</div>
            <div className="mp-card__hero-text mp-card__hero-text--short">Systems that move with the work.</div>
          </div>
          {/* Content body */}
          <div className="mp-card__line mp-card__line--long" />
          <div className="mp-card__line mp-card__line--med" />
          {/* Feature grid */}
          <div className="mp-card__row">
            <div className="mp-card__feature-card">PLAN</div>
            <div className="mp-card__feature-card mp-card__feature-card--accent">BUILD</div>
            <div className="mp-card__feature-card">RUN</div>
          </div>
          {/* CTA bar */}
          <div className="mp-card__cta-bar">VIEW SYSTEM <span>↗</span></div>
          <div className="mp-card__label">WEB · SITE</div>
        </div>

        {/* ── Mobile app card — bottom center ─────────────────────── */}
        <div className="mp-card mp-card--mobile">
          {/* Status bar */}
          <div className="mp-card__status-bar">
            <span className="mp-card__status-time">09:41</span>
            <span className="mp-card__status-icons" />
          </div>
          {/* App header */}
          <div className="mp-card__app-header">
            <span className="mp-card__app-back" />
            <span className="mp-card__app-title">Project pulse</span>
          </div>
          {/* Hero image */}
          <div className="mp-card__app-hero">
            <span>03</span>
            <small>ACTIVE BUILDS</small>
          </div>
          {/* Tab bar */}
          <div className="mp-card__app-row">
            <div className="mp-card__app-tab mp-card__app-tab--active" />
            <div className="mp-card__app-tab" />
            <div className="mp-card__app-tab" />
          </div>
          {/* Content list */}
          <div className="mp-card__app-list">
            <div className="mp-card__app-item">Scope locked</div>
            <div className="mp-card__app-item mp-card__app-item--active">Build in progress</div>
            <div className="mp-card__app-item">Launch review</div>
          </div>
          {/* Bottom nav */}
          <div className="mp-card__app-bottom-nav">
            <span className="mp-card__app-nav-dot" />
            <span className="mp-card__app-nav-dot mp-card__app-nav-dot--active" />
            <span className="mp-card__app-nav-dot" />
            <span className="mp-card__app-nav-dot" />
          </div>
          <div className="mp-card__label">MOBILE · APP</div>
        </div>


        {/* ── Dashboard card — right side ──────────────────────────── */}
        <div className="mp-card mp-card--dashboard">
          <div className="mp-card__dash-header">
            <span className="mp-card__dash-dot" />
            <span className="mp-card__dash-dot" />
            <span className="mp-card__dash-dot mp-card__dash-dot--active" />
          </div>
          <div className="mp-card__chart">
            <span className="mp-card__bar-item" style={{ height: '40%' }} />
            <span className="mp-card__bar-item" style={{ height: '65%' }} />
            <span className="mp-card__bar-item" style={{ height: '50%' }} />
            <span className="mp-card__bar-item mp-card__bar-item--active" style={{ height: '80%' }} />
            <span className="mp-card__bar-item" style={{ height: '60%' }} />
            <span className="mp-card__bar-item" style={{ height: '75%' }} />
          </div>
          <div className="mp-card__metrics">
            <div className="mp-card__metric">
              <span className="mp-card__metric-val">284</span>
              <span className="mp-card__metric-key">ORDERS</span>
            </div>
            <div className="mp-card__metric">
              <span className="mp-card__metric-val mp-card__metric-val--orange">↑12%</span>
              <span className="mp-card__metric-key">GROWTH</span>
            </div>
          </div>
          <div className="mp-card__label">DASHBOARD</div>
        </div>

      </div>
      <p className="mp-caption">MC / PRODUCT SYSTEMS</p>
    </div>
  );
};
