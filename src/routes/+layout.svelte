<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { ORG_URL } from '#lib/data/packages.ts';
	let { children } = $props();
	const links = [
		['Packages', '/packages/'],
		['Stack', '/stack/'],
		['CLI', '/cli/'],
		['Vision', '/vision/'],
		['Roadmap', '/roadmap/']
	];
	const here = (h: string) => page.url.pathname.startsWith(h);
</script>

<svelte:head><title>Engineering Mathematics</title></svelte:head>

<header>
	<div class="wrap bar">
		<a class="brand" href="/"><img src="/favicon.png" alt="" width="32" height="32" /><span>Engineering Mathematics</span></a>
		<nav aria-label="Main">
			{#each links as [t, h]}<a href="{h}" aria-current={here(h) ? 'page' : undefined}>{t}</a>{/each}
			<a class="gh" href={ORG_URL} rel="noopener">GitHub ↗</a>
		</nav>
	</div>
</header>

<main>{@render children()}</main>

<footer>
	<hr class="rule" />
	<div class="wrap foot">
		<div>
			<strong>Engineering Mathematics</strong>
			<p>Pre-release. APIs may change until 1.0. Nothing here is certified for safety-critical use.</p>
		</div>
		<div class="cols">
			<a href="/packages/">Packages</a><a href="/architecture/">Architecture</a><a href="{ORG_URL}">GitHub</a>
			<a href="{ORG_URL}/.github/blob/main/CONTRIBUTING.md">Contributing</a><a href="{ORG_URL}/website">Site source</a><span>Apache-2.0</span>
		</div>
	</div>
</footer>

<style>
	header { position: sticky; top: 0; z-index: 10; backdrop-filter: blur(14px); background: rgba(10, 10, 9, 0.78); border-bottom: 1px solid var(--line-soft); }
	.bar { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
	.brand { display: flex; align-items: center; gap: 12px; font: 500 1.05rem var(--display); color: var(--text); }
	.brand:hover { text-decoration: none; } .brand img { border-radius: 50%; }
	nav { display: flex; gap: 22px; align-items: center; font-size: 0.9rem; }
	nav a { color: var(--muted); } nav a:hover, nav a[aria-current] { color: var(--gold-hi); text-decoration: none; }
	.gh { border: 1px solid var(--line); border-radius: 999px; padding: 4px 12px; }
	@media (max-width: 760px) { .brand span { display: none; } nav { gap: 14px; font-size: 0.82rem; } }
	footer { margin-top: 40px; padding-bottom: 48px; color: var(--dim); font-size: 0.88rem; }
	.foot { display: flex; justify-content: space-between; gap: 32px; padding-top: 36px; flex-wrap: wrap; }
	.foot strong { color: var(--text); font-family: var(--display); font-weight: 500; font-size: 1.05rem; } .foot p { max-width: 38ch; margin-top: 8px; }
	.cols { display: grid; grid-template-columns: repeat(2, auto); gap: 8px 40px; align-content: start; } .cols a { color: var(--muted); }
</style>
