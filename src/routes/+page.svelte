<script lang="ts">
	import Signal from '#lib/components/Signal.svelte';
	import Glyph from '#lib/components/Glyph.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import StepDemo from '#lib/components/StepDemo.svelte';
	import StackDiagram from '#lib/components/StackDiagram.svelte';
	import { packages } from '#lib/data/packages.ts';
	const found = packages.filter((p) => p.tier === 1);
	const principles = [
		['Solve, never invert', 'Explicit inversion and determinants are banned in CI. Every solve goes through a factorisation.'],
		['Units raise', 'Physical quantities carry units. A mismatch is an exception, never a warning.'],
		['No silent failure', 'Non-convergence, infeasibility and rank deficiency are typed errors with the evidence attached.'],
		['Standalone packages', 'Install only what you use. Nothing pulls the ecosystem in behind your back.'],
		['Deterministic', 'Locked dependencies, documented tolerances, recorded BLAS/LAPACK backend.'],
		['Native speed', 'Column-major data over BLAS/LAPACK, no hidden copies. Regressions fail CI.']
	];
</script>

<svelte:head>
	<title>Engineering Mathematics · rigorous mathematics for engineering software</title>
	<meta name="description" content="Small, independently versioned Python packages for the mathematics behind engineering systems: fast, unit-aware, strictly typed and verifiable." />
</svelte:head>

<section class="hero">
	<div class="signal"><Signal /></div>
	<div class="wrap grid">
		<div>
			<span class="eyebrow">Pre-release · v0.1</span>
			<h1>The mathematics under <span class="gold">engineering software</span>, done carefully.</h1>
			<p class="lede">Small, independently versioned Python packages that are fast, unit-aware, strictly typed and verifiable, with a terminal experience good enough that engineers enjoy using it.</p>
			<div class="cta"><a class="btn solid" href="/packages/">Browse packages</a><a class="btn" href="/stack/">Explore the stack</a></div>
		</div>
		<img class="mark" src="/logo.png" alt="Engineering Mathematics logo: an integral sign beside a stack of tiers, with noise resolving into a clean signal" width="520" height="520" />
	</div>
</section>

<section class="section">
	<div class="wrap">
		<span class="eyebrow">Guarantees</span>
		<h2>Unsafe numerical patterns are blocked, not left to code review.</h2>
		<div class="cards">
			{#each principles as [t, d]}<article><h3>{t}</h3><p>{d}</p></article>{/each}
		</div>
	</div>
</section>

<hr class="rule" />
<section class="section">
	<div class="wrap">
		<span class="eyebrow">Foundations · Tier 1</span>
		<h2>Eight packages, each going deep on its own mathematics.</h2>
		<div class="pk">
			{#each found as p}
				<a class="card" href="/packages/{p.slug}/"><Glyph tex={p.glyph} size={52} /><div><strong>{p.slug}</strong><span>{p.tagline}</span></div></a>
			{/each}
		</div>
	</div>
</section>

<hr class="rule" />
<section class="section">
	<div class="wrap">
		<span class="eyebrow">A package, running</span>
		<h2>Second-order system, live.</h2>
		<p class="lede" style="margin-bottom:32px">Drag the damping ratio. The plots are computed in your browser; the Python is what you would write with <code>engg-math-dynamical-systems</code>.</p>
		<StepDemo />
	</div>
</section>

<hr class="rule" />
<section class="section">
	<div class="wrap">
		<span class="eyebrow">Architecture</span>
		<h2>Layers that only point down.</h2>
		<p class="lede" style="margin-bottom:32px">No cycles, ever. Import-linter enforces that a package touches another’s public <code>engg_math.&lt;pkg&gt;</code> namespace and nothing deeper.</p>
		<StackDiagram />
	</div>
</section>

<hr class="rule" />
<section class="section">
	<div class="wrap start">
		<div>
			<span class="eyebrow">Get started</span>
			<h2>One install per package.</h2>
			<p class="lede">Or let the <a href="/cli/">CLI</a> manage a whole workspace. Both resolve friendly names like <code>linear-systems</code>.</p>
		</div>
		<CodeBlock lang="bash" title="shell" code={'pip install engg-math-linear-systems\n# or\nuv add engg-math-linear-systems\n\nengg-math init my-lab && cd my-lab\nengg-math add dynamical-systems\nengg-math doctor'} />
	</div>
</section>

<style>
	.hero { position: relative; padding: 96px 0 72px; overflow: hidden; }
	.signal { position: absolute; left: 0; right: 0; top: 50%; height: 220px; transform: translateY(-50%); opacity: 0.45; pointer-events: none; }
	.grid { position: relative; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; }
	@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } .mark { order: -1; max-width: 300px; margin: 0 auto; } }
	h1 { margin-bottom: 24px; } .cta { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
	.mark { width: 100%; height: auto; border-radius: 50%; mask-image: radial-gradient(circle, #000 58%, transparent 72%); }
	.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; margin-top: 36px; }
	.cards article { background: var(--bg); padding: 26px 28px; } .cards h3 { margin-bottom: 8px; color: var(--gold-hi); } .cards p { margin: 0; color: var(--muted); font-size: 0.95rem; }
	.pk { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; margin-top: 36px; }
	.card { display: flex; gap: 16px; align-items: center; padding: 18px; border: 1px solid var(--line); border-radius: 12px; background: var(--surface); color: var(--text); transition: 0.2s; }
	.card:hover { border-color: var(--gold-lo); transform: translateY(-2px); text-decoration: none; }
	.card strong { display: block; font: 500 0.95rem var(--mono); } .card span { color: var(--muted); font-size: 0.9rem; }
	.start { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: center; } @media (max-width: 860px) { .start { grid-template-columns: 1fr; } }
</style>
