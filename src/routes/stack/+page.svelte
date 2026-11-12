<script lang="ts">
	import StackDiagram from '#lib/components/StackDiagram.svelte';
	import DepGraph from '#lib/components/DepGraph.svelte';
</script>

<svelte:head><title>Stack · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<span class="eyebrow">Stack</span>
	<h1>Five tiers. Dependencies point down.</h1>
	<p class="lede" style="margin-bottom:48px">Infrastructure sits below everything. Foundations hold the core mathematics. Higher tiers add structure and domain knowledge, and are planned.</p>
	<StackDiagram />
	<h2>Runtime dependency graph</h2>
	<p class="lede" style="margin-bottom:24px">Built from each package’s declared dependencies. <code>cli</code> is omitted: it installs packages and imports none of them.</p>
	<DepGraph />
</div>
<style>h1 { margin-bottom: 18px; } h2 { margin: 88px 0 12px; }</style>
