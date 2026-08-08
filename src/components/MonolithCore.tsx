import React, { useEffect, useRef } from 'react';

type NodeId = 'customers' | 'intake' | 'auth' | 'ops' | 'core' | 'api' | 'orders' | 'insights' | 'reports';

interface NodeDef {
  id: NodeId;
  x: number;
  y: number;
  width: number;
  height: number;
  // Omit label to keep a module visually understandable without text.
  label?: string;
  kind: 'core' | 'labeled' | 'plain';
}

// Same 9-box layout/positions as before — only labels + roles changed.
// Labeled: CUSTOMERS, AUTH, API, ORDERS, ANALYTICS, REPORTS, CORE.
// Left unlabeled: intake, ops — pure connector steps, not stages a client
// needs to name, so leaving them blank keeps the diagram from feeling like
// a cluttered internal org chart.
const NODES: NodeDef[] = [
  { id: 'customers', x: 92, y: 82, width: 94, height: 54, label: 'CUSTOMERS', kind: 'labeled' },
  { id: 'intake', x: 204, y: 52, width: 106, height: 84, kind: 'plain' },
  { id: 'auth', x: 330, y: 82, width: 82, height: 54, label: 'AUTH', kind: 'labeled' },
  { id: 'ops', x: 120, y: 164, width: 68, height: 94, kind: 'plain' },
  { id: 'core', x: 208, y: 160, width: 148, height: 126, label: 'CORE', kind: 'core' },
  { id: 'api', x: 376, y: 164, width: 70, height: 94, label: 'API', kind: 'labeled' },
  { id: 'orders', x: 92, y: 306, width: 96, height: 56, label: 'ORDERS', kind: 'labeled' },
  { id: 'insights', x: 208, y: 306, width: 104, height: 56, label: 'ANALYTICS', kind: 'labeled' },
  { id: 'reports', x: 332, y: 306, width: 114, height: 56, label: 'REPORTS', kind: 'labeled' },
];

interface EdgeDef {
  id: string;
  from: NodeId;
  to: NodeId;
  d: string; // path for just this one connector segment
}

// Physical wiring — unchanged geometry from the original diagram, broken
// into named segments so the sequencer can address each one directly.
const EDGES: EdgeDef[] = [
  { id: 'customers-intake', from: 'customers', to: 'intake', d: 'M186 109H204' },
  { id: 'intake-auth', from: 'intake', to: 'auth', d: 'M310 109H330' },
  { id: 'auth-api', from: 'auth', to: 'api', d: 'M371 136V164' },
  { id: 'api-core', from: 'api', to: 'core', d: 'M376 223H356' },
  { id: 'ops-core', from: 'ops', to: 'core', d: 'M188 211H208' },
  { id: 'core-insights', from: 'core', to: 'insights', d: 'M282 286V306' },
  { id: 'ops-orders', from: 'ops', to: 'orders', d: 'M120 258V306' },
  { id: 'orders-insights', from: 'orders', to: 'insights', d: 'M188 334H208' },
  { id: 'insights-reports', from: 'insights', to: 'reports', d: 'M312 334H332' },
];
const EDGE_MAP = new Map(EDGES.map((e) => [e.id, e]));

interface CircuitStep {
  edgeId: string;
  reverse?: boolean; // true = travel from `to` towards `from`
}

// One continuous path through every module:
// CUSTOMERS -> intake -> AUTH -> API -> CORE -> ops -> ORDERS -> ANALYTICS -> REPORTS
const FULL_TOUR: CircuitStep[] = [
  { edgeId: 'customers-intake' },
  { edgeId: 'intake-auth' },
  { edgeId: 'auth-api' },
  { edgeId: 'api-core' },
  { edgeId: 'ops-core', reverse: true }, // core -> ops
  { edgeId: 'ops-orders' },
  { edgeId: 'orders-insights' },
  { edgeId: 'insights-reports' },
];

// ---------------------------------------------------------------------------
// Timing — deliberately quick and restrained, not a flashy tech-demo loop
// ---------------------------------------------------------------------------

const WAKE_MS = 220; // gateway "wakes" before the first route draws in
const EDGE_TRAVEL_MS = 260; // time for a route to draw in + signal to cross it
const EDGE_GAP_MS = 90; // small pause between hops
const TRANSIT_HOLD_MS = 260; // how long an intermediate stop stays lit
const TRANSIT_FADE_MS = 320;
const FINAL_HOLD_MS = 2600; // last route + destination stay visible ~2-3s
const FINAL_FADE_MS = 550;
const CORE_SETTLE_MS = 1400; // CORE's afterglow once touched

export const MonolithCore: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef(new Map<NodeId, SVGGElement>());
  const edgeRefs = useRef(new Map<string, SVGPathElement>());
  const dotRef = useRef<SVGCircleElement | null>(null);
  const dotMotionRef = useRef<SVGAnimateMotionElement | null>(null);
  const timers = useRef<number[]>([]);
  const hasAutoPlayed = useRef(false);

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  // Instantly snap every node/edge back to idle. Used right before starting
  // a run so a fast re-hover never overlaps a previous animation.
  const resetAll = () => {
    nodeRefs.current.forEach((el) =>
      el.classList.remove('is-waking', 'is-transit', 'is-active', 'is-core-active', 'is-core-settled')
    );
    edgeRefs.current.forEach((el) => el.classList.remove('is-live', 'is-fading'));
    rootRef.current?.classList.remove('is-sequencing');
  };

  const activateNode = (id: NodeId, opts: { final: boolean }) => {
    const el = nodeRefs.current.get(id);
    if (!el) return;

    if (id === 'core') {
      el.classList.add('is-core-active');
      const settleAfter = opts.final ? FINAL_HOLD_MS : TRANSIT_HOLD_MS;
      schedule(() => {
        el.classList.remove('is-core-active');
        el.classList.add('is-core-settled'); // restrained afterglow, not a hard reset
        schedule(() => el.classList.remove('is-core-settled'), CORE_SETTLE_MS);
      }, settleAfter);
      return;
    }

    el.classList.add(opts.final ? 'is-active' : 'is-transit');
    const holdMs = opts.final ? FINAL_HOLD_MS : TRANSIT_HOLD_MS;
    const fadeMs = opts.final ? FINAL_FADE_MS : TRANSIT_FADE_MS;
    schedule(() => {
      el.classList.remove('is-transit', 'is-active');
    }, holdMs + fadeMs);
  };

  const drawEdge = (edgeId: string, reverse: boolean, final: boolean) => {
    const edgeEl = edgeRefs.current.get(edgeId);
    const edge = EDGE_MAP.get(edgeId);
    if (!edgeEl || !edge) return;

    edgeEl.classList.add('is-live');
    const holdMs = final ? FINAL_HOLD_MS : TRANSIT_HOLD_MS;
    const fadeMs = final ? FINAL_FADE_MS : TRANSIT_FADE_MS;
    schedule(() => {
      edgeEl.classList.add('is-fading');
      schedule(() => edgeEl.classList.remove('is-live', 'is-fading'), fadeMs);
    }, EDGE_TRAVEL_MS + holdMs);

    // Send the single shared "signal" dot along this edge's path.
    const motion = dotMotionRef.current;
    const dot = dotRef.current;
    if (motion && dot) {
      motion.setAttribute('path', edge.d);
      motion.setAttribute('keyPoints', reverse ? '1;0' : '0;1');
      motion.setAttribute('keyTimes', '0;1');
      dot.style.opacity = '1';
      // Restart the SMIL animation with the new path/direction.
      motion.beginElement?.();
      schedule(() => {
        dot.style.opacity = '0';
      }, EDGE_TRAVEL_MS);
    }
  };

  const runFullTour = () => {
    clearAllTimers();
    resetAll();
    rootRef.current?.classList.add('is-sequencing');

    const firstEdge = EDGE_MAP.get(FULL_TOUR[0].edgeId);
    if (!firstEdge) return;
    const gatewayId = FULL_TOUR[0].reverse ? firstEdge.to : firstEdge.from;

    // 1. Gateway wakes
    const gatewayEl = nodeRefs.current.get(gatewayId);
    gatewayEl?.classList.add('is-waking');
    schedule(() => gatewayEl?.classList.remove('is-waking'), WAKE_MS + 150);

    // 2. Walk the full tour: route appears -> signal travels -> destination activates
    let t = WAKE_MS;
    FULL_TOUR.forEach((step, i) => {
      const edge = EDGE_MAP.get(step.edgeId);
      if (!edge) return;
      const destination = step.reverse ? edge.from : edge.to;
      const isFinal = i === FULL_TOUR.length - 1;

      schedule(() => drawEdge(step.edgeId, !!step.reverse, isFinal), t);
      schedule(() => activateNode(destination, { final: isFinal }), t + EDGE_TRAVEL_MS);

      t += EDGE_TRAVEL_MS + EDGE_GAP_MS;
    });

    // 3. System settles
    schedule(() => {
      rootRef.current?.classList.remove('is-sequencing');
    }, t + FINAL_HOLD_MS + FINAL_FADE_MS);
  };

  const activate = () => runFullTour();

  // Auto-play once, the first time the diagram actually scrolls into view —
  // covers visitors (especially on mobile) who never hover or tap at all.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true;
          runFullTour();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerNode = (id: NodeId) => (el: SVGGElement | null) => {
    if (el) nodeRefs.current.set(id, el);
  };
  const registerEdge = (id: string) => (el: SVGPathElement | null) => {
    if (el) edgeRefs.current.set(id, el);
  };

  return (
    <div ref={rootRef} className="monolith-core" aria-hidden="true" onPointerEnter={activate} onPointerDown={activate}>
      <div className="monolith-core__caption">
        <span>MC / 01</span>
        <span>MONOLITH CORE</span>
      </div>
      <svg className="monolith-core__diagram" viewBox="0 0 540 420" fill="none" focusable="false">
        <path className="monolith-core__frame" d="M64 28H476V388H64V28Z" />
        <path className="monolith-core__frame monolith-core__frame--soft" d="M42 50H64M476 50H498M42 370H64M476 370H498" />

        {/* Base wiring — always faintly visible so the system reads as
            already built. Dims slightly while the tour is running so the
            active route stands out (see .is-sequencing in the stylesheet). */}
        <g className="monolith-core__routes">
          {EDGES.map((edge) => (
            <path key={edge.id} d={edge.d} />
          ))}
          {/* decorative exit wire toward the READY marker, not part of the graph */}
          <path d="M446 334H464" />
        </g>

        {/* Per-edge overlay paths the sequencer lights up one at a time */}
        <g className="monolith-core__signal-routes">
          {EDGES.map((edge) => (
            <path key={edge.id} ref={registerEdge(edge.id)} pathLength="1" d={edge.d} />
          ))}
        </g>

        {/* The single traveling signal, re-aimed at whichever edge is active */}
        <circle ref={dotRef} className="monolith-core__signal-dot" r="4" style={{ opacity: 0 }}>
          <animateMotion ref={dotMotionRef} dur={`${EDGE_TRAVEL_MS}ms`} begin="indefinite" fill="freeze" />
        </circle>

        {NODES.map((node) => (
          <g
            key={node.id}
            ref={registerNode(node.id)}
            className={`monolith-core__module monolith-core__module--${node.kind}`}
          >
            <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="2" />
            {node.kind === 'core' ? (
              <>
                {/* Inner ring + crosshair — makes CORE read as "the brain" even at rest */}
                <rect
                  className="monolith-core__core-ring"
                  x={node.x + 12}
                  y={node.y + 12}
                  width={node.width - 24}
                  height={node.height - 24}
                  rx="2"
                />
                <path
                  className="monolith-core__core-cross"
                  d={`M${node.x + node.width / 2} ${node.y + 20}V${node.y + node.height - 20}M${node.x + 20} ${node.y + node.height / 2
                    }H${node.x + node.width - 20}`}
                />
              </>
            ) : (
              <path d={`M${node.x + 12} ${node.y + 15}H${node.x + 28}`} />
            )}
            {node.label && (
              <text x={node.x + 12} y={node.y + node.height - 13}>
                {node.label}
              </text>
            )}
          </g>
        ))}

        <circle className="monolith-core__output-node" cx="464" cy="334" r="5" />
        <text className="monolith-core__coordinate" x="80" y="405">
          SYSTEM / BUSINESS FLOW
        </text>
        <text className="monolith-core__coordinate" x="402" y="405">
          READY
        </text>
      </svg>
      <p className="monolith-core__hint">PROXIMITY ACTIVATION</p>
    </div>
  );
};