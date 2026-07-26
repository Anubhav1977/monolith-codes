# AGENTS.md — MONOLITH CODES

> Repository-wide instructions for every AI coding agent working on MONOLITH CODES.
> `AGENTS.md` governs engineering. `DESIGN.md` governs visual/design decisions.

## 1. Mission

Build MONOLITH CODES as a production-grade, conversion-focused **React** website for a premium software engineering studio.

The site must help a prospective client quickly understand what we build, see convincing visual proof, trust our quality, and send an inquiry / Start a Project request.

Do not produce a sparse developer-tool demo, generic agency template, Astro project, gaming/cyberpunk UI, or a collection of disconnected effects.

## 2. Mandatory preflight

Before meaningful implementation:

1. Read this complete `AGENTS.md`.
2. Read the complete repository `DESIGN.md`.
3. Inspect `package.json`, versions, routes, components, styles, configuration and assets.
4. Inspect and use relevant installed skills.
5. Confirm the official brandmark at `public/assets/brand/monolith-mark.png`.
6. Plan responsive, theme, accessibility, motion and performance behavior before coding.

Precedence:
1. Current explicit user/task requirement
2. `AGENTS.md`
3. `DESIGN.md`
4. Existing repository architecture/conventions
5. Installed skill documentation
6. Framework/library defaults

## 3. React only

This is a React website. Do not migrate to Astro or introduce Astro architecture.

Use modern patterns supported by the installed React version. Prefer functional components, composition, local state, derived values, semantic HTML and typed APIs when TypeScript exists.

Avoid giant components, unnecessary effects, redundant state, unnecessary global state, dependency-heavy solutions and client JavaScript for behavior CSS can handle.

## 4. Installed skills

Available skills:

- `canvas-design`
- `framer-motion-animator`
- `tailwind-4-docs`
- `tailwind-v4-shadcn`
- `threejs-animation`
- `threejs-fundamentals`
- `threejs-shaders`
- `threejs-webgl`
- `vercel-react-best-practices`
- `web-design-guidelines`

When a task falls inside a skill's domain, read/follow that skill instead of relying on memory.

### Skill routing

**vercel-react-best-practices** — primary React engineering reference. Apply to rendering, state/effects, component architecture, bundle efficiency, code splitting and runtime performance. Do not cargo-cult optimizations.

**tailwind-4-docs** — use for Tailwind CSS v4 syntax, theme configuration, responsive/state variants and current v4 practices. Do not apply obsolete v3 patterns unless the repository requires them.

**tailwind-v4-shadcn** — use for shadcn + Tailwind v4. shadcn is a foundation, not the MONOLITH aesthetic. Restyle it using `DESIGN.md`; do not inherit generic radii, palette or SaaS styling.

**web-design-guidelines** — use for responsive quality, accessibility, forms, navigation, hierarchy and final visual QA.

**framer-motion-animator** — use for coordinated transitions, viewport reveals, layout transitions and gestures when they genuinely need Framer Motion. Basic hover/color transitions belong in CSS.

**canvas-design** — use for dense custom 2D experiences such as the Monolith Field and proximity-reactive graphics.

**threejs-fundamentals** — use for justified real 3D scenes, cameras, geometry, materials, lights and renderer lifecycle.

**threejs-animation** — use for Three.js animation loops and object/camera animation.

**threejs-shaders** — use only when custom shaders provide meaningful visual/performance value.

**threejs-webgl** — use for Three.js/WebGL renderer performance, GPU resources, DPR, draw calls, instancing, cleanup and mobile GPU behavior.

Having a skill installed is not permission to over-engineer.

## 5. Technology escalation

Choose the lightest correct layer:

1. semantic HTML
2. CSS/Tailwind
3. CSS transitions/keyframes
4. small React interaction
5. Framer Motion
6. Canvas 2D
7. Three.js/WebGL
8. custom shaders

Examples: button hover → CSS; coordinated section sequence → Framer Motion; dense proximity field → Canvas; actual 3D scene → Three.js.

## 6. DESIGN.md is mandatory

`DESIGN.md` is the visual source of truth. Read it before UI work.

Follow its colors, typography, spacing, grids, shape language, borders, depth, imagery, navigation, buttons, cards, section grammar, motion, responsive rules, brand motifs and Monolith-specific behavior.

Do not invent a second design system in components. Reference-site influences are principles, not designs to clone.

## 7. Official logo

Canonical brandmark:

`public/assets/brand/monolith-mark.png`

Use the exact asset. Never regenerate, redraw, approximate, stretch, crop important geometry, arbitrarily recolor, or apply arbitrary filters.

Create textual wordmarks/lockups with real HTML/CSS typography when appropriate. A reusable `BrandLockup` may support mark-only, horizontal, stacked, wordmark and tagline variants.

If the PNG background causes a theme problem, do not destructively edit it without instruction; flag the need for a transparent/vector asset if necessary.

## 8. Theme: Light + Dark + System

Support all three modes:
- Light
- Dark
- System

**System is the default.**

With no stored explicit preference, follow `prefers-color-scheme`. An explicit Light/Dark choice persists locally. Selecting System resumes following OS changes.

Requirements:
- prevent/minimize initial theme flash;
- apply the root class/data attribute before meaningful paint where architecture permits;
- set `color-scheme`;
- make native controls compatible;
- design both themes intentionally;
- do not merely invert dark mode;
- maintain WCAG contrast;
- use semantic theme tokens instead of theme-specific hardcoded component values;
- theme control must be keyboard accessible, labelled and communicate state.

If `DESIGN.md` lacks light tokens, derive one coherent light palette centrally. Never scatter guessed light colors.

## 9. CSS quality

CSS must be complete, responsive and deliberate.

Use shared design tokens, CSS variables, Tailwind v4 theme primitives, reusable layout primitives and consistent vertical rhythm.

Avoid repeated arbitrary hex/spacing values, random z-indexes, routine `!important`, static inline styles, duplicated CSS, desktop-only fixed dimensions and accidental overflow.

For every section verify background/surface, width, max-width, horizontal/vertical padding, typography, alignment, media sizing, responsive behavior and transition into neighboring sections.

## 10. No accidental blank space

Premium whitespace is welcome. Empty/broken layout is not.

Never leave:
- empty 100vh sections;
- giant gaps caused by min/fixed heights;
- oversized margins between short sections;
- unused half-screen columns with no visual purpose;
- broken media containers;
- placeholder blocks with no information;
- excessive mobile hero height.

Whitespace must create hierarchy, focus, pacing or deliberate drama. If it resembles missing content, fix it.

Review the entire page vertically at common viewport sizes.

## 11. Conversion first

This is a client-facing business website, not a developer playground.

Major page sequences should answer:
- What does MONOLITH CODES do?
- What can you build for me?
- What does the work look like?
- Why should I trust you?
- How do you work?
- What should I do next?

Primary conversion action: **Start a Project / Send an Inquiry**.

Make inquiry paths visible at sensible decision points and low-friction. Technical aesthetics support communication; they never replace it.

## 12. Complete sections

A major marketing section should intentionally combine appropriate elements such as:
- label/index;
- clear headline;
- concise copy;
- visual proof/artifact;
- meaningful detail;
- optional CTA;
- deliberate handoff to the next section.

Do not ship heading + two sentences + empty background. Avoid endless text-only sections and generic icon grids. Vary composition/density while preserving the design system.

## 13. Visual proof

Demonstrate capability visually using appropriate:
- product mockups;
- website compositions;
- mobile screens;
- dashboard/ERP/CRM surfaces;
- architecture/workflow diagrams;
- integrations;
- meaningful code;
- problem/solution visualizations;
- real screenshots when supplied.

Do not fabricate clients, screenshots, metrics, testimonials or outcomes.

When portfolio assets are unavailable, conceptual UI demonstrations may be created, but never present them as real client work.

## 14. Scroll transitions

Scrolling should feel polished and connected.

Use restrained techniques where appropriate:
- reveal-on-entry;
- staggered child reveals;
- mask/clip media reveals;
- subtle justified parallax;
- sticky storytelling;
- progress/signal lines;
- surface/background transitions;
- visual handoffs between sections.

Prefer optimized viewport/IntersectionObserver mechanisms. Do not use raw high-frequency scroll handlers unnecessarily.

Never scroll-jack. Do not animate every paragraph or make sections fly from random directions. Essential content must not wait for animation. Respect `prefers-reduced-motion`; reduced-motion mode remains visually complete.

## 15. Motion character

Motion communicates hierarchy, causality, state, spatial relationship or progression.

It should be precise, controlled, premium and low-amplitude.

Avoid bounce/jelly effects, random spinning, perpetual movement everywhere, huge card tilts and global cursor trails.

Prefer transforms and opacity over continuously animating expensive layout properties.

## 16. React performance

Follow `vercel-react-best-practices`.

Avoid unnecessary rerenders and Effects. Keep state close to use. Do not mirror props into state without reason. Lazy-load genuinely heavy experiences. Split Canvas/3D from initial content. Avoid huge dependencies for tiny features. Avoid expensive work on every render and premature memoization.

The page must be useful before optional visual enhancements finish loading.

## 17. Core Web Vitals

Protect LCP, INP and CLS.

Reserve media dimensions/aspect ratios. Optimize critical hero media. Lazy-load below-the-fold media and heavy code. Avoid unnecessary render-blocking scripts and font weights. Prevent image/font layout movement. Pause animation offscreen and when the document is hidden.

Do not preload everything.

## 18. Canvas / Three.js / WebGL

Canvas:
- account for DPR but cap excessive resolution;
- precompute geometry;
- use `requestAnimationFrame`;
- avoid React state updates per pointer frame;
- avoid per-frame allocations where practical;
- pause offscreen;
- reduce density on mobile;
- provide static/reduced-motion fallback.

Three.js/WebGL:
- cap renderer DPR;
- reuse materials/geometries;
- minimize draw calls;
- use instancing when useful;
- dispose GPU resources;
- do not allocate scene objects every frame;
- pause when invisible;
- asynchronously load heavy assets;
- test mobile/integrated GPUs;
- provide graceful fallback.

Shaders must justify their GPU cost. No effect is worth making the website a benchmark.

## 19. Responsive design

Intentionally design for narrow mobile, common mobile, tablet, laptop, desktop and wide desktop.

Do not shrink desktop blindly. Stack when needed, reduce decoration before readability, preserve CTA visibility, maintain touch targets, simplify heavy effects and prevent horizontal overflow.

Test awkward intermediate widths too. No section is complete until mobile and desktop work.

## 20. Accessibility

Target WCAG 2.2 AA.

Require semantic HTML, landmarks, logical headings, visible focus, skip-to-content, keyboard-operable menus/dialogs, explicit form labels, useful errors, correct alt text, hidden decorative graphics, sufficient contrast in both themes, non-color-only communication, practical 44×44px touch targets, logical focus order, no traps and reduced-motion support.

Never use a clickable div when a semantic button/link is correct.

## 21. Navigation

Navigation must be understandable, responsive, accessible and conversion-aware. Use the official brandmark.

Mobile gets a fully designed menu state, not merely hidden desktop links. Sticky behavior is allowed when useful. If blur/transparency is used, preserve legibility/performance in both themes.

Keep Start a Project easy to locate.

## 22. Inquiry forms

Inquiry is a core business action.

Forms need clear labels, sensible field count, grouping, accessible errors, loading/submitting, success/failure states, keyboard and mobile usability.

Never fake successful submission. If no backend exists, implement the UI boundary honestly and identify what remains to connect.

## 23. Content integrity

Never invent clients, testimonials, outcomes, revenue, conversion rates, awards, years of experience, team size, office locations, partner badges, certifications or case-study statistics.

Use clearly replaceable development content/TODOs when facts are unavailable. Do not present conceptual visuals as real work.

## 24. Copy

Sound like engineers who understand business: concise, specific, confident, understandable and outcome-oriented.

Avoid empty phrases such as "innovative solutions", "cutting-edge technology", "unlock your potential", "seamless experiences" and "revolutionize your business".

Do not force business visitors to decode developer jargon.

## 25. Media and fonts

Optimize media, reserve dimensions, lazy-load below fold and provide correct alt/decorative handling. Never stretch screenshots or put low-resolution images into huge showcase panels.

Follow `DESIGN.md` font roles. Load only needed families/weights/styles and avoid font-induced layout shift.

## 26. SEO

For public routes use meaningful titles/descriptions, semantic headings, crawlable navigation/text, canonical handling where relevant, Open Graph metadata, social imagery, sitemap/robots where supported, and truthful structured data only.

Critical marketing content must not exist solely in Canvas/WebGL.

## 27. Security

Never expose secrets/API keys, inject unsanitized HTML, or weaken security for convenience.

Real inquiry endpoints require server validation, appropriate sanitization, abuse/spam protection and safe error handling.

## 28. Dependencies

Before installing anything:
1. check browser/CSS/React primitives;
2. check existing dependencies;
3. inspect relevant skills;
4. add only when it clearly improves correctness/maintainability.

Do not make unrelated upgrades during focused tasks. Use APIs supported by installed versions.

## 29. Components

Create reusable primitives when they represent real reusable semantics. Possible examples:

`BrandLockup`, `Container`, `Section`, `SectionHeader`, `Grid`, `Stack`, `Button`, `TextLink`, `Surface`, `Card`, `ArtifactFrame`, `CodeWindow`, `Metric`, `Tag`, `Status`, `ThemeToggle`, `SignalLine`, `MonolithField`, `InquiryForm`, `Footer`.

Do not create component-per-div architecture, giant page components, prop explosion or abstractions without a real use.

## 30. Page rhythm

Do not make every section the same width/background/card count/alignment/animation.

Use controlled variation: contained vs full-width visuals, split composition, asymmetric artifacts, theme/surface shifts, justified sticky storytelling, editorial interruption, large media, structural dividers, dense vs quiet sections.

Variation must remain MONOLITH.

## 31. Theme QA

Check every meaningful change in Dark, Light and System.

Verify logo, text, borders, cards, nav, dropdowns, buttons, hover/focus, forms, diagrams, code surfaces, images, shadows, Canvas/WebGL integration, footer and selection colors.

Do not ship dark-only components.

## 32. Full-page visual QA

Review the whole page at representative sizes for:
- accidental blank areas;
- abrupt surface changes;
- edge collisions;
- oversized gaps;
- orphan headings;
- stretched media;
- overflow;
- sticky overlap;
- late animations;
- unresolved visual sections;
- footer gaps;
- excessive mobile hero height.

Components looking good individually is not enough.

## 33. Professional workflow

### Audit
Read `AGENTS.md`, relevant `DESIGN.md`, relevant skills, package versions and nearby code.

### Plan
For meaningful changes decide components, content/data, CSS, responsive behavior, motion, themes, accessibility and performance.

### Implement
Make coherent changes, preserve conventions, centralize tokens, use relevant skills, avoid unrelated refactors.

### Validate
Run the repository's actual formatter/lint/typecheck/tests/build. Fix failures introduced by the work. Never claim a command passed unless run.

### Visual QA
Review Dark, Light, System, mobile, tablet, desktop, wide, keyboard, focus, reduced motion, states and full-page scroll rhythm.

### Optimize
Review bundle impact, client code, images, fonts, animation loops, rerenders, offscreen work and layout shift.

### Polish
Ask whether the page helps a client understand/trust MONOLITH, whether sections feel complete, whether visual proof exists, whether empty space is intentional, and whether motion/performance/accessibility are appropriate.

## 34. Definition of Done

A task is complete only when relevant requirements are satisfied:

- requested behavior works;
- React architecture is preserved;
- `DESIGN.md` is followed;
- relevant installed skills were consulted;
- official logo is used correctly;
- Dark/Light work and System is default;
- explicit theme choice persists;
- CSS is complete;
- no accidental dead/blank sections;
- responsive behavior is intentional;
- media is optimized;
- scroll transitions are polished and restrained;
- reduced motion works;
- keyboard/focus/accessibility work;
- no unnecessary dependency or React work was introduced;
- heavy visuals are isolated/lazy/paused appropriately;
- no new runtime/console errors;
- available lint/type/build/test checks pass or pre-existing failures are identified;
- no fake business proof;
- result is conversion-focused;
- result is recognizably MONOLITH CODES.

## 35. Final decision rules

When spectacle conflicts with usability, choose usability.
When animation conflicts with performance/accessibility, simplify it.
When clever interaction obscures the client's next step, remove it.
When whitespace improves hierarchy, keep it; when it resembles missing content, fix it.
When shadcn defaults conflict with `DESIGN.md`, adapt them.
When CSS solves it cleanly, do not use JavaScript.
When React solves it cleanly, do not use WebGL.
When structure, typography, imagery and proof communicate the brand, do not compensate with excessive effects.

The finished website should make a prospective client think:

**“They understand serious software, their work looks excellent, and I want to talk to them.”**
