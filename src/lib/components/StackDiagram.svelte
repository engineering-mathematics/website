<script lang="ts">
	import { tiers, packages } from '#lib/data/packages.ts';
	// Isometric slabs, widest at the bottom, as in the logo.
	const slabs = [...tiers].reverse(); // tier 0 first (bottom)
	const cx = 340, h0 = 66, step = 62, t = 22;
	let active = $state(1);
	const members = (id: number) => packages.filter((p) => p.tier === id);
	const info = $derived(tiers.find((x) => x.id === active)!);
	const tools = packages.filter((p) => p.tier === 'tool');
	function geom(i: number) {
		const w = 210 - i * 28;
		const y = 330 - i * step;
		return { w, y, pts: `${cx - w},${y} ${cx},${y - w / 2.4} ${cx + w},${y} ${cx},${y + w / 2.4}`, l: `${cx - w},${y} ${cx},${y + w / 2.4} ${cx},${y + w / 2.4 + t} ${cx - w},${y + t}`, r: `${cx + w},${y} ${cx},${y + w / 2.4} ${cx},${y + w / 2.4 + t} ${cx + w},${y + t}` };
	}
</script>

<div class="grid">
	<svg viewBox="0 0 600 400" role="img" aria-label="Five-tier dependency stack">
		{#each slabs as s, i}
			{@const g = geom(i)}
			<g class="slab" class:on={active === s.id} class:planned={s.planned} onclick={() => (active = s.id)} onkeydown={(e) => e.key === 'Enter' && (active = s.id)} role="button" tabindex="0" aria-label="Tier {s.id}: {s.name}">
				<polygon points={g.l} class="side" /><polygon points={g.r} class="side r" /><polygon points={g.pts} class="top" />
				<text x={cx - g.w - 14} y={g.y + 4} text-anchor="end">TIER {s.id}</text>
			</g>
		{/each}
		<text x="590" y="30" text-anchor="end" class="arrow">depends on ↓</text>
	</svg>
	<div class="panel">
		<span class="eyebrow">Tier {active}{info.planned ? ' · planned' : ''}</span>
		<h3>{info.name}</h3>
		<p>{info.blurb}</p>
		{#if info.planned}
			<ul class="chips">{#each info.examples as e}<li class="ghost">{e}</li>{/each}</ul>
		{:else}
			<ul class="chips">{#each members(active) as p}<li><a href="/packages/{p.slug}/">{p.slug}</a></li>{/each}</ul>
		{/if}
		<hr class="rule" />
		<p class="small">Beside the stack: {#each tools as p, i}<a href="/packages/{p.slug}/">{p.slug}</a>{i < tools.length - 1 ? ', ' : ''}{/each}. Neither is imported by libraries.</p>
	</div>
</div>

<style>
	.grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 40px; align-items: center; }
	@media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
	svg { width: 100%; height: auto; overflow: visible; }
	.slab { cursor: pointer; outline: none; }
	.top { fill: #1b1913; stroke: var(--gold-lo); stroke-width: 1.4; transition: 0.25s; }
	.side { fill: #0d0c0a; stroke: var(--line); } .side.r { fill: #131210; }
	.slab:hover .top, .slab:focus-visible .top { stroke: var(--gold); }
	.slab.on .top { fill: #2c2412; stroke: var(--gold-hi); filter: drop-shadow(0 0 12px rgba(201, 162, 75, 0.35)); }
	.slab.planned .top { stroke-dasharray: 5 4; }
	.slab text { font: 500 11px var(--mono); letter-spacing: 0.16em; fill: var(--muted); pointer-events: none; }
	.slab.on text { fill: var(--gold-hi); }
	.arrow { font: 500 10px var(--mono); letter-spacing: 0.12em; fill: var(--dim); text-transform: uppercase; }
	.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 18px 0; }
	.chips li { border: 1px solid var(--gold-lo); border-radius: 999px; padding: 4px 12px; font: 0.82rem var(--mono); }
	.chips li.ghost { border-style: dashed; border-color: var(--line); color: var(--dim); }
	.small { font-size: 0.88rem; color: var(--dim); }
</style>
