<!-- src/routes/tools/tim-visualizer/+page.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Follow from '$lib/components/Follow.svelte';

  // --- RNG ---
  class RNG {
    constructor(s) { this.s = s | 0 || 1; }
    next() { this.s ^= this.s << 13; this.s ^= this.s >> 17; this.s ^= this.s << 5; return (this.s >>> 0) / 4294967296; }
    int(m) { return Math.floor(this.next() * m); }
    shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = this.int(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  }

  // --- Graph generation ---
  function genGraph(model, n, deg, rng) {
    const adj = Array.from({ length: n }, () => new Set());
    if (model === 'er') {
      const p = deg / (n - 1);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        if (rng.next() < p) { adj[i].add(j); adj[j].add(i); }
      }
    } else if (model === 'ba') {
      const m = Math.max(2, Math.floor(deg / 2));
      const t = [];
      for (let i = 0; i < m && i < n; i++) {
        for (let j = i + 1; j < m && j < n; j++) { adj[i].add(j); adj[j].add(i); }
        t.push(i, i);
      }
      for (let i = m; i < n; i++) {
        const c = new Set();
        while (c.size < m && c.size < i) { const x = t[rng.int(t.length)]; if (x !== i) c.add(x); }
        for (const x of c) { adj[i].add(x); adj[x].add(i); t.push(i, x); }
      }
    } else {
      const k = deg;
      for (let i = 0; i < n; i++) for (let s = 1; s <= Math.floor(k / 2); s++) {
        const j = (i + s) % n;
        adj[i].add(j); adj[j].add(i);
      }
      for (let i = 0; i < n; i++) for (let s = 1; s <= Math.floor(k / 2); s++) {
        if (rng.next() < 0.1) {
          const j = (i + s) % n;
          adj[i].delete(j); adj[j].delete(i);
          let r = rng.int(n);
          while (r === i || adj[i].has(r)) r = rng.int(n);
          adj[i].add(r); adj[r].add(i);
        }
      }
    }
    return adj;
  }

  // --- Sybil injection ---
  function injectSybils(adj, nH, S, theta, rng) {
    const total = nH + S + 1;
    while (adj.length < total) adj.push(new Set());
    const tid = nH + S;
    const honest = [...Array(nH).keys()];
    const nc = Math.min(8, nH);
    const ns = Math.max(1, Math.round(theta * nc));
    const nu = nc - ns;
    const sh = rng.shuffle([...honest]);
    const shared = sh.slice(0, ns);
    const avail = sh.slice(ns);
    const sids = [];
    const snbrs = [];
    for (let i = 0; i < S; i++) {
      const sid = nH + i;
      sids.push(sid);
      const nb = new Set(shared);
      if (nu > 0 && avail.length >= nu) {
        const p = rng.shuffle([...avail]).slice(0, nu);
        for (const x of p) nb.add(x);
      }
      for (const x of nb) { adj[sid].add(x); adj[x].add(sid); }
      adj[sid].add(tid); adj[tid].add(sid);
      snbrs.push(nb);
    }
    return { sids, tid, snbrs, shared };
  }

  // --- Jaccard ---
  function jaccard(a, b) {
    if (!a.size && !b.size) return 1;
    if (!a.size || !b.size) return 0;
    let n = 0;
    for (const x of a) if (b.has(x)) n++;
    return n / (a.size + b.size - n);
  }

  // --- TIM ---
  function computeTIM(nbrs, alpha) {
    const k = nbrs.length;
    if (k <= 1) return 1;
    const m = Math.min(k, 50);
    let ts = 0, np = 0;
    for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) {
      ts += alpha * jaccard(nbrs[i], nbrs[j]) + (1 - alpha) * 1;
      np++;
    }
    return Math.max(0, Math.min(1, 1 - ts / np));
  }

  // --- EigenTrust ---
  function computeEigenTrust(adj, nH, sids, tid, seeds, iters) {
    const n = adj.length;
    const trust = new Float64Array(n);
    for (const s of seeds) trust[s] = 1 / seeds.length;
    for (let it = 0; it < iters; it++) {
      const next = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        if (adj[i].size === 0) continue;
        const share = trust[i] / adj[i].size;
        for (const j of adj[i]) next[j] += share;
      }
      for (const s of seeds) next[s] += 0.15 / seeds.length;
      let sum = 0;
      for (let i = 0; i < n; i++) sum += next[i];
      if (sum > 0) for (let i = 0; i < n; i++) next[i] /= sum;
      for (let i = 0; i < n; i++) trust[i] = next[i];
    }
    let sybilW = 0;
    for (const s of sids) sybilW += trust[s];
    let honestAvg = 0;
    for (let i = 0; i < nH; i++) honestAvg += trust[i];
    honestAvg /= nH;
    return honestAvg > 0 ? sybilW / honestAvg : sids.length;
  }

  // --- SybilRank ---
  function computeSybilRank(adj, nH, sids, tid, seeds, iters) {
    const n = adj.length;
    const trust = new Float64Array(n);
    const totalDeg = seeds.reduce((s, x) => s + adj[x].size, 0) || 1;
    for (const s of seeds) trust[s] = adj[s].size / totalDeg;
    for (let it = 0; it < iters; it++) {
      const next = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        if (adj[i].size === 0) continue;
        const share = trust[i] / adj[i].size;
        for (const j of adj[i]) next[j] += share;
      }
      let sum = 0;
      for (let i = 0; i < n; i++) sum += next[i];
      if (sum > 0) for (let i = 0; i < n; i++) next[i] /= sum;
      for (let i = 0; i < n; i++) trust[i] = next[i];
    }
    const sybilT = sids.reduce((s, x) => s + trust[x], 0);
    let honestAvg = 0;
    for (let i = 0; i < nH; i++) honestAvg += trust[i];
    honestAvg /= nH;
    return honestAvg > 0 ? sybilT / honestAvg : sids.length;
  }

  function pickSeeds(adj, nH, count) {
    const degs = [...Array(nH).keys()].map(i => ({ i, d: adj[i].size })).sort((a, b) => b.d - a.d);
    return degs.slice(0, count).map(x => x.i);
  }

  // --- State ---
  let graphModel = 'er';
  let nHonest = 120;
  let sybilSize = 40;
  let overlap = 0.8;

  let timResult = { eff: 0, tau: 1 };
  let etResult = { eff: 0 };
  let srResult = { eff: 0 };
  let bestModel = 'TIM';

  let canvas;
  let resizeObserver;

  $: if (browser && canvas) compute(graphModel, nHonest, sybilSize, overlap);

  function compute(model, nH, S, theta) {
    const rng = new RNG(42);
    const adj = genGraph(model, nH, 10, rng);
    let sids = [], tid = nH, snbrs = [];

    if (S > 0) {
      const r = injectSybils(adj, nH, S, theta, new RNG(123));
      sids = r.sids; tid = r.tid; snbrs = r.snbrs;
    }

    const seeds = pickSeeds(adj, nH, 5);
    const tau = S > 0 ? computeTIM(snbrs, 0.7) : 1;
    const timEff = tau * S;
    const etEff = S > 0 ? Math.min(computeEigenTrust(adj, nH, sids, tid, seeds, 20), S) : 0;
    const srEff = S > 0 ? Math.min(computeSybilRank(adj, nH, sids, tid, seeds, Math.floor(Math.log2(nH + S + 1))), S) : 0;

    timResult = { eff: timEff, tau };
    etResult = { eff: etEff };
    srResult = { eff: srEff };

    const minEff = Math.min(timEff, etEff, srEff);
    bestModel = timEff <= minEff ? 'TIM' : etEff <= minEff ? 'EigenTrust' : 'SybilRank';

    drawGraph(adj, nH, sids, tid, seeds, tau);
  }

  function drawGraph(adj, nH, sids, tid, seeds, tau) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const pos = [];
    const hr = Math.min(w, h) * 0.38;

    for (let i = 0; i < nH; i++) {
      const a = 2 * Math.PI * i / nH;
      const j = 0.85 + Math.sin(i * 7.3) * 0.15;
      pos[i] = { x: cx + Math.cos(a) * hr * j, y: cy + Math.sin(a) * hr * j };
    }

    const sr = hr * 0.45;
    for (let i = 0; i < sids.length; i++) {
      const a = 2 * Math.PI * i / sids.length;
      const r = sr * (0.3 + 0.7 * (i % 3) / 3);
      pos[sids[i]] = { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    }
    pos[tid] = { x: cx, y: cy };

    const ss = new Set(sids);
    const seedSet = new Set(seeds);

    // Edges
    for (let i = 0; i < adj.length; i++) {
      if (!pos[i]) continue;
      for (const j of adj[i]) {
        if (j <= i || !pos[j]) continue;
        ctx.strokeStyle = (ss.has(i) || ss.has(j)) ? 'rgba(226,75,74,0.08)' : 'rgba(133,183,235,0.08)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(pos[i].x, pos[i].y);
        ctx.lineTo(pos[j].x, pos[j].y);
        ctx.stroke();
      }
    }

    // Honest nodes
    for (let i = 0; i < nH; i++) {
      if (!pos[i]) continue;
      ctx.fillStyle = seedSet.has(i) ? '#1D9E75' : '#85B7EB';
      ctx.globalAlpha = seedSet.has(i) ? 1 : 0.6;
      ctx.beginPath();
      ctx.arc(pos[i].x, pos[i].y, seedSet.has(i) ? 4.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sybil nodes
    ctx.globalAlpha = 0.3 + 0.7 * (1 - tau);
    for (const s of sids) {
      if (!pos[s]) continue;
      ctx.fillStyle = '#E24B4A';
      ctx.beginPath();
      ctx.arc(pos[s].x, pos[s].y, 3 + 2 * (1 - tau), 0, Math.PI * 2);
      ctx.fill();
    }

    // Target
    ctx.globalAlpha = 1;
    if (pos[tid]) {
      ctx.fillStyle = '#EF9F27';
      ctx.beginPath();
      ctx.arc(pos[tid].x, pos[tid].y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Label
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'center';
    if (sids.length > 0) {
      const label = tau < 0.01 ? 'Sybil ring fully collapsed' : `Sybil ring: tau = ${tau.toFixed(2)}`;
      ctx.fillText(label, pos[tid]?.x || w / 2, h - 12);
    }
  }

  // Helpers for template
  $: collapsePercent = (m) => sybilSize > 0 ? Math.round((1 - m.eff / sybilSize) * 100) : 0;
  $: barPercent = (eff) => sybilSize > 0 ? Math.min(100, (eff / sybilSize) * 100) : 0;
  $: retainedPercent = (eff) => sybilSize > 0 ? (eff / sybilSize * 100).toFixed(0) : '—';

  onMount(() => {
    if (!canvas) return;
    resizeObserver = new ResizeObserver(() => {
      compute(graphModel, nHonest, sybilSize, overlap);
    });
    resizeObserver.observe(canvas.parentElement);
  });

  onDestroy(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });
</script>

<svelte:head>
  <title>TIM Sybil Collapse Visualizer | Global Governance Frameworks</title>
  <meta name="description" content="Interactive demonstration of the Trust Independence Metric — watch Sybil rings collapse in real-time and compare against EigenTrust and SybilRank." />
</svelte:head>

<div class="page">
  <div class="page-header">
    <div class="header-inner">
      <a href="/resources/whitepapers/immanent-trust-protocol" class="back-link">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        ITP Whitepaper
      </a>

      <div class="title-badge">Interactive tool</div>
      <h1>TIM Sybil collapse visualizer</h1>
      <p class="subtitle">
        Watch the Trust Independence Metric collapse Sybil rings in real-time, and compare against EigenTrust and SybilRank.
      </p>
    </div>
  </div>

  <div class="content">
    <!-- Controls -->
    <section class="controls">
      <div class="control-row">
        <label for="model">Graph model</label>
        <select id="model" bind:value={graphModel}>
          <option value="er">Erdos-Renyi</option>
          <option value="ba">Barabasi-Albert</option>
          <option value="ws">Watts-Strogatz</option>
        </select>
      </div>

      <div class="control-row">
        <label for="nHonest">Honest nodes</label>
        <input type="range" id="nHonest" min="40" max="250" step="10" bind:value={nHonest} />
        <span class="val">{nHonest}</span>
      </div>

      <div class="control-row">
        <label for="sybilSize">Sybil ring size (S)</label>
        <input type="range" id="sybilSize" min="0" max="200" step="1" bind:value={sybilSize} />
        <span class="val">{sybilSize}</span>
      </div>

      <div class="control-row">
        <label for="overlap">Overlap (theta)</label>
        <input type="range" id="overlap" min="0" max="1" step="0.05" bind:value={overlap} />
        <span class="val">{overlap.toFixed(2)}</span>
      </div>
    </section>

    <!-- Tau gauge -->
    <div class="gauge-row">
      <span class="gauge-label">TIM discount (tau)</span>
      <div class="gauge-track">
        <div
          class="gauge-fill"
          style="width: {timResult.tau * 100}%; background: {timResult.tau < 0.1 ? '#E24B4A' : timResult.tau < 0.4 ? '#EF9F27' : '#1D9E75'}"
        ></div>
      </div>
      <span class="gauge-val">{timResult.tau.toFixed(3)}</span>
    </div>

    <!-- Model comparison cards -->
    <div class="cards">
      <div class="card" class:winner={bestModel === 'TIM' && sybilSize > 0}>
        <div class="card-name" style="color: #1D9E75;">TIM</div>
        <div class="card-label">Effective weight</div>
        <div class="card-big">{timResult.eff.toFixed(1)}</div>
        <div class="card-sub">{sybilSize > 0 ? collapsePercent(timResult) + '% collapsed' : 'no Sybils'}</div>
        <div class="card-note">No seeds needed</div>
        {#if bestModel === 'TIM' && sybilSize > 0}
          <span class="card-tag">Best defense</span>
        {/if}
      </div>

      <div class="card" class:winner={bestModel === 'EigenTrust' && sybilSize > 0}>
        <div class="card-name" style="color: #7F77DD;">EigenTrust</div>
        <div class="card-label">Effective weight</div>
        <div class="card-big">{etResult.eff.toFixed(1)}</div>
        <div class="card-sub">{sybilSize > 0 ? collapsePercent(etResult) + '% collapsed' : 'no Sybils'}</div>
        <div class="card-note">Needs pre-trusted seeds</div>
        {#if bestModel === 'EigenTrust' && sybilSize > 0}
          <span class="card-tag">Best defense</span>
        {/if}
      </div>

      <div class="card" class:winner={bestModel === 'SybilRank' && sybilSize > 0}>
        <div class="card-name" style="color: #85B7EB;">SybilRank</div>
        <div class="card-label">Effective weight</div>
        <div class="card-big">{srResult.eff.toFixed(1)}</div>
        <div class="card-sub">{sybilSize > 0 ? collapsePercent(srResult) + '% collapsed' : 'no Sybils'}</div>
        <div class="card-note">Needs seeds + global graph</div>
        {#if bestModel === 'SybilRank' && sybilSize > 0}
          <span class="card-tag">Best defense</span>
        {/if}
      </div>
    </div>

    <!-- Bar comparison -->
    <section class="bars-section">
      <div class="bars-label">Effective Sybil influence (lower = better defense)</div>

      {#each [
        { name: 'TIM', eff: timResult.eff, color: '#1D9E75' },
        { name: 'EigenTrust', eff: etResult.eff, color: '#7F77DD' },
        { name: 'SybilRank', eff: srResult.eff, color: '#85B7EB' }
      ] as m}
        <div class="bar-row">
          <span class="bar-name">{m.name}</span>
          <div class="bar-track">
            <div class="bar-ghost" style="width: {barPercent(sybilSize)}%; background: {m.color};"></div>
            <div class="bar-fill" style="width: {barPercent(m.eff)}%; background: {m.color};">
              <span>{m.eff.toFixed(1)}</span>
            </div>
          </div>
          <span class="bar-val">{retainedPercent(m.eff)}%</span>
        </div>
      {/each}

      <div class="bars-hint">Ghost bar = raw weight without defense. Percentage = influence retained.</div>
    </section>

    <!-- Graph canvas -->
    <div class="graph-area">
      <canvas bind:this={canvas}></canvas>
    </div>
    <div class="legend">
      <div class="legend-item"><span class="dot" style="background: #85B7EB;"></span> Honest</div>
      <div class="legend-item"><span class="dot" style="background: #E24B4A;"></span> Sybil</div>
      <div class="legend-item"><span class="dot" style="background: #EF9F27;"></span> Target</div>
      <div class="legend-item"><span class="dot" style="background: #1D9E75;"></span> Seed (EigenTrust/SybilRank)</div>
    </div>

    <!-- Notes -->
    <div class="notes">
      <p><strong>TIM</strong> analyzes neighborhood overlap of endorsers. No seeds, no global state. Collapses rings with high overlap to near-zero.</p>
      <p><strong>EigenTrust</strong> uses iterative propagation from pre-trusted seeds. Sybils connected to honest nodes inherit residual trust.</p>
      <p><strong>SybilRank</strong> uses random walks from seeds. Trust decays with graph distance. Sybils near honest nodes get partial trust leakage.</p>
      <p class="tradeoff">TIM excels against cheap Sybil attacks (high overlap). Seed-based methods can outperform when the adversary invests in diverse connections — but require pre-trusted seeds and global graph access that ITP deliberately avoids.</p>
    </div>
  </div>

  <div class="follow-section">
    <div class="follow-inner">
      <Follow />
    </div>
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .page-header {
    border-bottom: 1px solid #334155;
  }

  .header-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 2.5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.8125rem;
    margin-bottom: 1.5rem;
    transition: color 0.2s;
  }
  .back-link:hover { color: white; }

  .title-badge {
    display: inline-block;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #2dd4bf;
    background: rgba(45, 212, 191, 0.1);
    border: 1px solid rgba(45, 212, 191, 0.2);
    padding: 0.1875rem 0.625rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem;
  }

  .subtitle {
    font-size: 0.9375rem;
    color: #94a3b8;
    line-height: 1.5;
    max-width: 40rem;
  }

  .content {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }

  /* Controls */
  .controls {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .control-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .control-row label {
    font-size: 0.8125rem;
    color: #94a3b8;
    min-width: 120px;
  }

  .control-row input[type=range] {
    flex: 1;
    accent-color: #2dd4bf;
  }

  .control-row select {
    flex: 1;
    background: #1e293b;
    color: #e2e8f0;
    border: 1px solid #475569;
    border-radius: 0.375rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
  }

  .val {
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 48px;
    text-align: right;
    color: #e2e8f0;
  }

  /* Gauge */
  .gauge-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.5rem;
  }

  .gauge-label {
    font-size: 0.8125rem;
    color: #94a3b8;
    min-width: 140px;
  }

  .gauge-track {
    flex: 1;
    height: 8px;
    background: #334155;
    border-radius: 4px;
    overflow: hidden;
  }

  .gauge-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s, background 0.3s;
  }

  .gauge-val {
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 50px;
    text-align: right;
    color: #e2e8f0;
  }

  /* Cards */
  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 1.5rem;
  }

  .card {
    border-radius: 0.75rem;
    padding: 1rem;
    border: 1px solid #334155;
    background: rgba(30, 41, 59, 0.5);
  }

  .card.winner {
    border: 2px solid #378ADD;
  }

  .card-name {
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .card-label {
    font-size: 0.6875rem;
    color: #64748b;
  }

  .card-big {
    font-size: 1.375rem;
    font-weight: 500;
    color: #e2e8f0;
    margin: 0.25rem 0;
  }

  .card-sub {
    font-size: 0.6875rem;
    color: #64748b;
  }

  .card-note {
    font-size: 0.6875rem;
    color: #64748b;
    margin-top: 0.375rem;
  }

  .card-tag {
    display: inline-block;
    font-size: 0.625rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: 0.5rem;
    background: rgba(59, 130, 246, 0.15);
    color: #93c5fd;
  }

  /* Bars */
  .bars-section {
    margin-bottom: 1.5rem;
  }

  .bars-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .bar-name {
    font-size: 0.75rem;
    color: #94a3b8;
    min-width: 90px;
  }

  .bar-track {
    flex: 1;
    height: 20px;
    background: #1e293b;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .bar-ghost {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    opacity: 0.12;
  }

  .bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 6px;
  }

  .bar-fill span {
    font-size: 0.625rem;
    font-weight: 500;
    color: white;
  }

  .bar-val {
    font-size: 0.75rem;
    font-weight: 500;
    min-width: 44px;
    text-align: right;
    color: #e2e8f0;
  }

  .bars-hint {
    font-size: 0.6875rem;
    color: #475569;
    margin-top: 4px;
  }

  /* Graph */
  .graph-area {
    position: relative;
    height: 300px;
    border: 1px solid #334155;
    border-radius: 0.75rem;
    overflow: hidden;
    background: #0f172a;
    margin-bottom: 8px;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .legend {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.6875rem;
    color: #64748b;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
  }

  /* Notes */
  .notes {
    padding: 1rem 1.25rem;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid #334155;
    border-radius: 0.5rem;
  }

  .notes p {
    font-size: 0.8125rem;
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 0.375rem;
  }

  .notes p:last-child { margin-bottom: 0; }

  .notes p :global(strong) {
    color: #cbd5e1;
    font-weight: 600;
  }

  .notes .tradeoff {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #334155;
    font-style: italic;
    color: #64748b;
  }

  /* Follow */
  .follow-section {
    border-top: 1px solid #334155;
  }

  .follow-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  @media (max-width: 640px) {
    .cards {
      grid-template-columns: 1fr;
    }

    .header-inner, .content, .follow-inner {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .control-row label, .gauge-label {
      min-width: 90px;
      font-size: 0.75rem;
    }

    .bar-name { min-width: 70px; }
  }
</style>
