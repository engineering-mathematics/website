<script lang="ts">
	import katex from 'katex';
	let { tex, size = 56 }: { tex: string; size?: number } = $props();
	const html = $derived(katex.renderToString(tex, { throwOnError: false, output: 'html' }));
</script>

<span class="glyph" style="--s:{size}px" aria-hidden="true">
	<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /><circle cx="50" cy="50" r="43" class="in" /></svg>
	<span class="tex">{@html html}</span>
</span>

<style>
	.glyph { position: relative; display: inline-grid; place-items: center; width: var(--s); height: var(--s); flex: none; }
	svg { position: absolute; inset: 0; }
	circle { fill: #14120d; stroke: var(--gold-lo); stroke-width: 2; }
	.in { fill: none; stroke: var(--line); stroke-width: 1; }
	.tex { position: relative; font-size: calc(var(--s) * 0.42); color: var(--gold-hi); line-height: 1; }
	.tex :global(.katex) { font-size: 1em; }
</style>
