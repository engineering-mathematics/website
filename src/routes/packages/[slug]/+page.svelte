<script lang="ts">
	import Glyph from '#lib/components/Glyph.svelte';
	import Inline from '#lib/components/Inline.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import { bySlug, tierOf, ORG_URL } from '#lib/data/packages.ts';
	let { data } = $props();
	const p = $derived(data.pkg);
	const install = $derived(p.slug === 'cli' ? `pip install ${p.dist}` : `pip install ${p.dist}\n# or: uv add ${p.dist}\n# or: engg-math add ${p.slug}`);
</script>

<svelte:head><title>{p.dist} · Engineering Mathematics</title><meta name="description" content={p.tagline} /></svelte:head>

<div class="wrap section">
	<a class="back" href="/packages/">← Packages</a>
	<header>
		<Glyph tex={p.glyph} size={92} />
		<div>
			<span class="eyebrow">{tierOf(p)} · v0.1.0 · pre-release</span>
			<h1>{p.dist}</h1>
			<p class="lede"><Inline text={p.summary} /></p>
		</div>
	</header>

	<div class="two">
		<CodeBlock lang="bash" title="install" code={install} />
		<div class="meta">
			{#if p.module}<div><span>import</span><code>{p.module}</code></div>{/if}
			<div><span>source</span><a href="{ORG_URL}/{p.repo}">engineering-mathematics/{p.repo} ↗</a></div>
			<div><span>requires</span>{#if p.deps.length}{#each p.deps as d, i}<a href="/packages/{d}/">{d}</a>{i < p.deps.length - 1 ? ', ' : ''}{/each}{:else}no ecosystem packages{/if}</div>
			<div><span>licence</span>Apache-2.0</div>
		</div>
	</div>
	<p class="note">PyPI publication is pending (roadmap Phase 6). Until then the CLI pins packages to git revisions.</p>

	<h2>Example</h2>
	<CodeBlock code={p.example} />

	<h2>Guarantees</h2>
	<table><tbody>{#each p.guarantees as [k, v]}<tr><td>{k}</td><td><Inline text={v} /></td></tr>{/each}</tbody></table>

	{#if p.api.length}
		<h2>{p.slug === 'cli' ? 'Commands' : 'API'}</h2>
		<table><tbody>{#each p.api as [k, v]}<tr><td>{k}</td><td><code>{v}</code></td></tr>{/each}</tbody></table>
	{/if}

	{#if p.notes.length}
		<h2>Notes</h2>
		<ul class="prose">{#each p.notes as n}<li><Inline text={n} /></li>{/each}</ul>
	{/if}
</div>

<style>
	.back { font: 0.85rem var(--mono); color: var(--muted); }
	header { display: flex; gap: 28px; align-items: center; margin: 28px 0 40px; } header h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 12px; font-family: var(--mono); font-weight: 500; letter-spacing: -0.02em; overflow-wrap: anywhere; }
	.two { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: start; } @media (max-width: 820px) { .two { grid-template-columns: 1fr; } header { flex-direction: column; align-items: flex-start; } }
	.meta { display: grid; gap: 10px; font-size: 0.92rem; color: var(--muted); } .meta span { display: inline-block; width: 78px; font: 500 0.7rem var(--mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); }
	.note { font-size: 0.85rem; color: var(--dim); margin-top: 14px; }
	h2 { margin: 56px 0 18px; }
	ul { padding-left: 1.2em; }
	td code { white-space: normal; }
</style>
