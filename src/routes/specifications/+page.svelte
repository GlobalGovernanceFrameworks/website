<!-- src/routes/specifications/+page.svelte -->
<script>
  export let data;
</script>

<svelte:head>
  <title>Specifications — Global Governance Frameworks</title>
  <meta
    name="description"
    content="The controlling interface layer: shared constitutional and lifecycle rules that GGF frameworks conform to."
  />
</svelte:head>

<div class="wrap">
  <header>
    <h1>Specifications</h1>
    <p class="lede">
      Frameworks describe what a domain should do. Specifications describe the rules every
      framework has to follow when it touches another one — who may decide, on what authority,
      with what duty to respond, and what happens when an arrangement ends. Frameworks pin these
      documents by version and hash, so a change here propagates through the ecosystem rather
      than staying local.
    </p>
  </header>

  <ul class="grid">
    {#each data.specifications as spec (spec.slug)}
      <li>
        <a href={spec.path}>
          <span class="emoji" aria-hidden="true">{spec.emoji}</span>
          <h2>{spec.title}</h2>
          <p class="meta">{spec.version} · updated {spec.updated}</p>
          <p class="standfirst">{spec.standfirst || spec.subtitle}</p>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .wrap {
    margin: 0 auto;
    max-width: 62rem;
    padding: 2.5rem 1.25rem 4rem;
  }

  h1 {
    font-size: 2rem;
    margin: 0 0 0.75rem;
  }

  .lede {
    color: #4b5563;
    line-height: 1.65;
    margin: 0 0 2.5rem;
    max-width: 46rem;
  }

  .grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .grid a {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    color: inherit;
    display: block;
    height: 100%;
    padding: 1.25rem;
    text-decoration: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .grid a:hover {
    border-color: #c7cdd6;
    box-shadow: 0 1px 6px rgb(0 0 0 / 6%);
  }

  .emoji {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .grid h2 {
    font-size: 1.125rem;
    margin: 0 0 0.35rem;
  }

  .meta {
    color: #6b7280;
    font-size: 0.8125rem;
    margin: 0 0 0.75rem;
  }

  .standfirst {
    color: #374151;
    font-size: 0.9375rem;
    line-height: 1.55;
    margin: 0;
  }
</style>
