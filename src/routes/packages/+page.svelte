<script lang="ts">
	import Glyph from '#lib/components/Glyph.svelte';
	import { packages, tierOf } from '#lib/data/packages.ts';
	const groups = [
		['Tier 1 · Foundations', packages.filter((p) => p.tier === 1)],
		['Tier 0 · Infrastructure', packages.filter((p) => p.tier === 0)],
		['Tooling', packages.filter((p) => p.tier === 'tool')]
	] as const;
</script>

<svelte:head><title>Packages · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<span class="eyebrow">Packages</span>
	<h1>Thirteen packages. Install only what you use.</h1>
	<p class="lede">Tiers 2–4 (System Modelling, Domain Frameworks, Reference Systems) are planned; see the <a href="/roadmap/">roadmap</a>.</p>
	{#each groups as [name, list]}
		<h2>{name}</h2>
		<div class="list">
			{#each list as p}
				<a href="/packages/{p.slug}/" class="row">
					<Glyph tex={p.glyph} size={48} />
					<div><strong>{p.dist}</strong><span>{p.tagline}</span></div>
					<em>{p.module ?? 'command line'}</em>
				</a>
			{/each}
		</div>
	{/each}
</div>

<style>
	h1 { margin-bottom: 18px; } h2 { margin: 56px 0 18px; font-size: 1.3rem; color: var(--gold); }
	.list { border-top: 1px solid var(--line); }
	.row { display: grid; grid-template-columns: auto 1fr auto; gap: 18px; align-items: center; padding: 16px 8px; border-bottom: 1px solid var(--line); color: var(--text); transition: background 0.2s; }
	.row:hover { background: var(--surface); text-decoration: none; }
	strong { display: block; font: 500 0.98rem var(--mono); } span { color: var(--muted); font-size: 0.92rem; } em { font: 0.8rem var(--mono); color: var(--dim); font-style: normal; }
	@media (max-width: 700px) { em { display: none; } .row { grid-template-columns: auto 1fr; } }
</style>
