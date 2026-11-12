<script lang="ts">
	type S = 'done' | 'now' | 'next';
	const phases: [string, S, string][] = [
		['Phase 0 · Hygiene', 'done', 'Shared repo config, a strict package template, reusable CI with a 3-OS × 3-Python matrix, audit, CodeQL, SBOM and provenance.'],
		['Phase 1 · Conventions', 'done', 'Naming, architecture, dependency rules, style guide, three accepted RFCs (naming, Infrastructure monorepo, Apache-2.0).'],
		['Phase 2 · Org setup', 'now', 'Teams, rulesets, repository security settings, PyPI name reservations.'],
		['Phase 3 · Infrastructure', 'done', 'core, units, viz and devtools in one uv workspace.'],
		['Phase 4 · Foundations', 'done', 'Eight Foundations libraries on the new layout, each with coverage ≥ 90% and reference-solution tests. First tagged releases in progress.'],
		['Phase 5 · CLI', 'done', 'Real add/remove/update via uv, validated manifest, typed errors, --json, doctor.'],
		['Phase 6 · Publish', 'next', 'Trusted Publishers, TestPyPI dry runs, PyPI 0.1.0 of Tier 0–1; then Tier 2.']
	];
	const label = { done: 'Done', now: 'In progress', next: 'Planned' };
	const planned = ['state-space', 'transfer-functions', 'graph-models', 'physical-systems', 'constraint-models', 'control', 'robotics', 'cfd', 'fem', 'signal-processing', 'power-systems', 'biomedical', 'communications', 'navigation', 'machine-learning'];
</script>

<svelte:head><title>Roadmap · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<span class="eyebrow">Roadmap</span>
	<h1>Where things stand.</h1>
	<p class="lede">No dates until there is velocity data to back them.</p>
	<ol class="tl">
		{#each phases as [t, s, d]}
			<li class={s}><span class="badge">{label[s]}</span><h3>{t}</h3><p>{d}</p></li>
		{/each}
	</ol>

	<h2>Planned packages</h2>
	<p class="lede" style="margin-bottom:20px">Tiers 2 and 3. Names are settled; nothing here exists yet.</p>
	<ul class="chips">{#each planned as p}<li>{p}</li>{/each}</ul>
</div>

<style>
	h1 { margin-bottom: 16px; } h2 { margin: 72px 0 12px; }
	.tl { list-style: none; padding: 0 0 0 28px; margin: 48px 0 0; border-left: 1px solid var(--line); max-width: 760px; }
	li { position: relative; padding-bottom: 34px; } li::before { content: ''; position: absolute; left: -35px; top: 8px; width: 13px; height: 13px; border-radius: 50%; background: var(--bg); border: 2px solid var(--dim); }
	li.done::before { background: var(--gold); border-color: var(--gold); } li.now::before { border-color: var(--gold-hi); box-shadow: 0 0 0 4px rgba(201, 162, 75, 0.2); }
	li p { margin: 6px 0 0; color: var(--muted); } li h3 { font-size: 1.15rem; }
	.badge { font: 500 0.68rem var(--mono); letter-spacing: 0.14em; text-transform: uppercase; color: var(--dim); } li.done .badge { color: var(--gold); } li.now .badge { color: var(--gold-hi); }
	.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; }
	.chips li { padding: 4px 12px; border: 1px dashed var(--line); border-radius: 999px; font: 0.82rem var(--mono); color: var(--dim); } .chips li::before { display: none; }
</style>
