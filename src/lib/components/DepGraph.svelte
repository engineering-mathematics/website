<script lang="ts">
	import { packages } from '#lib/data/packages.ts';
	const nodes = packages.filter((p) => p.slug !== 'cli');
	const depth: Record<string, number> = {};
	const d = (s: string): number => (depth[s] ??= Math.max(-1, ...(nodes.find((n) => n.slug === s)?.deps ?? []).map(d)) + 1);
	nodes.forEach((n) => d(n.slug));
	// Column order chosen so that each package sits near what it depends on.
	const order = ['core', 'continuous-analysis', 'units', 'discrete-structures', 'transform-analysis', 'viz', 'devtools', 'linear-systems', 'stochastic-systems', 'dynamical-systems', 'numerical-computation', 'optimization'];
	const cols: string[][] = [];
	[...nodes].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)).forEach((n) => (cols[depth[n.slug]] ??= []).push(n.slug));
	const W = 980, H = 440, nw = 172, nh = 34;
	const pos: Record<string, { x: number; y: number }> = {};
	cols.forEach((c, i) => c.forEach((s, j) => (pos[s] = { x: 20 + i * ((W - 40 - nw) / (cols.length - 1)), y: 40 + (j + 0.5) * ((H - 60) / c.length) - nh / 2 })));
	const depsOf = (s: string) => nodes.find((n) => n.slug === s)?.deps ?? [];
	const reaches = (from: string, to: string): boolean => depsOf(from).some((x) => x === to || reaches(x, to));
	// Transitive reduction: drop an edge when a longer path already implies it.
	const edges = nodes.flatMap((n) => n.deps.filter((to) => !n.deps.some((via) => via !== to && reaches(via, to))).map((to) => ({ from: n.slug, to })));
	let hover = $state<string | null>(null);
	// The hovered node's transitive dependencies and dependents.
	const rel = $derived.by(() => {
		if (!hover) return null;
		const s = new Set([hover]);
		const walk = (x: string, key: 'from' | 'to', other: 'from' | 'to') =>
			edges.filter((e) => e[key] === x).forEach((e) => { if (!s.has(e[other])) { s.add(e[other]); walk(e[other], key, other); } });
		walk(hover, 'from', 'to');
		walk(hover, 'to', 'from');
		return s;
	});
	const on = (a: string, b?: string) => !rel || (rel.has(a) && (!b || rel.has(b)));
</script>

<div class="wrap-g">
	<svg viewBox="0 0 {W} {H}" role="img" aria-label="Runtime dependency graph of the ecosystem packages">
		<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,1 L10,5 L0,9 z" fill="#8a6a2c" /></marker></defs>
		{#each cols as _, i}<text x={20 + i * ((W - 40 - nw) / (cols.length - 1)) + nw / 2} y="16" text-anchor="middle" class="col">LAYER {i}</text>{/each}
		{#each edges as e}
			{@const a = pos[e.from]}{@const b = pos[e.to]}
			<path class="edge" class:dim={!on(e.from, e.to)} d="M{a.x},{a.y + nh / 2} C{(a.x + b.x + nw) / 2},{a.y + nh / 2} {(a.x + b.x + nw) / 2},{b.y + nh / 2} {b.x + nw + 5},{b.y + nh / 2}" marker-end="url(#arr)" />
		{/each}
		{#each nodes as n}
			{@const p = pos[n.slug]}
			<a href="/packages/{n.slug}/" onmouseenter={() => (hover = n.slug)} onmouseleave={() => (hover = null)} onfocus={() => (hover = n.slug)} onblur={() => (hover = null)}>
				<g class="node" class:dim={!on(n.slug)} class:t0={n.tier === 0} class:tool={n.tier === 'tool'}>
					<rect x={p.x} y={p.y} width={nw} height={nh} rx="6" />
					<text x={p.x + nw / 2} y={p.y + nh / 2 + 4} text-anchor="middle">{n.slug}</text>
				</g>
			</a>
		{/each}
	</svg>
	<p class="cap">Arrows read “depends on” and point left, towards the foundations. Only runtime dependencies are drawn, and an edge is left out when a longer path already implies it (everything depends on core). Hover a package to trace its chain.</p>
</div>

<style>
	svg { width: 100%; height: auto; }
	.col { font: 500 9.5px var(--mono); letter-spacing: 0.18em; fill: var(--dim); }
	.edge { fill: none; stroke: var(--gold-lo); stroke-width: 1.2; opacity: 0.7; transition: 0.2s; }
	.edge.dim { opacity: 0.08; }
	.node rect { fill: var(--surface); stroke: var(--gold-lo); transition: 0.2s; }
	.node.t0 rect { fill: #1b1710; stroke: var(--gold); }
	.node.tool rect { stroke-dasharray: 4 3; }
	.node text { font: 500 11.5px var(--mono); fill: var(--text); pointer-events: none; }
	.node:hover rect { stroke: var(--gold-hi); fill: #241e10; }
	.node.dim { opacity: 0.25; }
	a:focus-visible { outline: none; } a:focus-visible .node rect { stroke: var(--gold-hi); stroke-width: 2; }
	.cap { font-size: 0.85rem; color: var(--dim); margin-top: 8px; }
</style>
