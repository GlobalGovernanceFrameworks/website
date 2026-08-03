<!-- src/lib/components/HeroConstellation.svelte -->
<!--
  Ambient, non-interactive backdrop for the home hero.

  Deliberately does NOT import the schema or frameworkNav: this renders above
  the fold, so it stays a self-contained decorative SVG with no data cost.
  It echoes the real constellation's tier palette and ring structure so the
  interactive version further down the page feels like the same object,
  brought into focus.

  Layout is generated from a fixed seed at module scope, so SSR and client
  markup are byte-identical and hydration stays quiet.
-->
<script>
  // mulberry32 — small deterministic PRNG
  function makeRng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const rng = makeRng(20260804);

  // Radii and colours mirror FrameworkConstellation's tier scale.
  const RINGS = [
    { r: 150, count: 8, color: '#60a5fa' },
    { r: 225, count: 12, color: '#34d399' },
    { r: 295, count: 10, color: '#a78bfa' },
    { r: 360, count: 8, color: '#f472b6' }
  ];

  // Horizontal stretch: the hero is much wider than it is tall, so circular
  // rings would leave the sides empty and crowd the text vertically.
  const STRETCH = 1.5;

  const nodes = [];

  RINGS.forEach((ring, ringIndex) => {
    const offset = rng() * Math.PI * 2;
    for (let i = 0; i < ring.count; i++) {
      const angle = offset + (i / ring.count) * Math.PI * 2 + (rng() - 0.5) * 0.22;
      const radius = ring.r + (rng() - 0.5) * 28;
      nodes.push({
        x: +(Math.cos(angle) * radius * STRETCH).toFixed(2),
        y: +(Math.sin(angle) * radius).toFixed(2),
        r: +(2.2 + rng() * 2.6).toFixed(2),
        color: ring.color,
        ring: ringIndex,
        delay: +(rng() * 8).toFixed(2)
      });
    }
  });

  // Each node links inward to its nearest neighbour on the ring inside it,
  // which produces a branching structure rather than a spoked wheel.
  const links = [];

  nodes.forEach((node) => {
    if (node.ring === 0) {
      links.push({ x1: node.x, y1: node.y, x2: 0, y2: 0 });
      return;
    }
    const inner = nodes.filter((m) => m.ring === node.ring - 1);
    let best = inner[0];
    let bestDist = Infinity;
    inner.forEach((m) => {
      const d = (m.x - node.x) ** 2 + (m.y - node.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = m;
      }
    });
    links.push({ x1: node.x, y1: node.y, x2: best.x, y2: best.y });
  });
</script>

<div class="hero-constellation" aria-hidden="true">
  <svg
    viewBox="0 0 1400 640"
    preserveAspectRatio="xMidYMid slice"
    role="presentation"
    focusable="false"
  >
    <defs>
      <radialGradient id="hc-core-glow">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.45" />
        <stop offset="60%" stop-color="#fbbf24" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
      </radialGradient>

      <!-- Darkens the centre so the headline always has a clean ground -->
      <radialGradient id="hc-veil">
        <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.88" />
        <stop offset="45%" stop-color="#1e1b4b" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
      </radialGradient>
    </defs>

    <g transform="translate(700 320)">
      <g class="hc-orbit">
        <!-- Faint orbit rings -->
        {#each RINGS as ring}
          <ellipse
            cx="0"
            cy="0"
            rx={ring.r * STRETCH}
            ry={ring.r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            stroke-width="1"
          />
        {/each}

        <!-- Connections -->
        {#each links as link}
          <line
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="rgba(199,210,254,0.16)"
            stroke-width="1"
          />
        {/each}

        <!-- Core -->
        <circle cx="0" cy="0" r="120" fill="url(#hc-core-glow)" />
        <circle cx="0" cy="0" r="7" fill="#fbbf24" opacity="0.9" />

        <!-- Nodes -->
        {#each nodes as node}
          <circle
            class="hc-node"
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.color}
            style="animation-delay: -{node.delay}s"
          />
        {/each}
      </g>
    </g>

    <rect x="0" y="0" width="1400" height="640" fill="url(#hc-veil)" />
  </svg>
</div>

<style>
  .hero-constellation {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.85;
  }

  .hero-constellation svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* transform-origin 0 0 resolves against this group's own coordinate
     system, which the parent translate has already moved to centre. */
  .hc-orbit {
    transform-origin: 0 0;
    animation: hc-drift 300s linear infinite;
  }

  .hc-node {
    opacity: 0.75;
    animation: hc-twinkle 9s ease-in-out infinite alternate;
  }

  @keyframes hc-drift {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes hc-twinkle {
    from {
      opacity: 0.35;
    }
    to {
      opacity: 0.95;
    }
  }

  @media (max-width: 768px) {
    .hero-constellation {
      opacity: 0.55;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hc-orbit,
    .hc-node {
      animation: none;
    }
    .hc-node {
      opacity: 0.7;
    }
  }
</style>
