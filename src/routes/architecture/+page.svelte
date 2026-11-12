<script lang="ts">
</script>

<svelte:head><title>Architecture · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<span class="eyebrow">Architecture</span>
	<h1>How the pieces fit.</h1>
	<div class="prose">
		<p class="lede">Dependencies point down only. No cycles. See the <a href="/stack/">interactive stack</a> for the tiers and the live dependency graph.</p>

		<h2>Hard rules</h2>
		<ol>
			<li><strong>Standalone.</strong> Every library works with <code>pip install engg-math-&lt;name&gt;</code> and its declared upstream dependencies. No library depends on the CLI or locates another by path.</li>
			<li><strong>Minimal surface.</strong> <code>[project].dependencies</code> lists only what the core API needs; the rest are extras. A downstream package depends on the core of an upstream one, not its extras.</li>
			<li><strong>Public API only.</strong> A package imports another’s top-level <code>engg_math.&lt;pkg&gt;</code> namespace and nothing deeper. What is exported is exactly <code>__all__</code>, enforced by import-linter in CI.</li>
			<li><strong>Native-speed contract.</strong> Dense numerics use column-major arrays and call BLAS/LAPACK through NumPy and SciPy. Explicit inversion, determinants and <code>np.matrix</code> are banned (ruff <code>TID251</code>). Solve with a factorisation.</li>
			<li><strong>Units are a safety feature.</strong> Quantities carry units through <code>engg-math-units</code>; mismatches raise, never warn.</li>
			<li><strong>No silent failure.</strong> Typed exceptions, non-zero exit codes, no bare <code>except Exception</code>.</li>
			<li><strong>Deterministic.</strong> Locked dependencies, documented tolerances, a recorded BLAS/LAPACK backend.</li>
			<li><strong>Terminal-first, machine-readable too.</strong> Rich output for humans; <code>--json</code>, <code>NO_COLOR</code> and non-TTY fallbacks for pipelines.</li>
		</ol>

		<h2>Naming</h2>
		<p>Repositories are kebab-case (<code>linear-systems</code>), distributions add an <code>engg-math-</code> prefix, and imports live in the shared PEP 420 namespace <code>engg_math</code> (<code>engg_math.linear_systems</code>). The namespace is implicit: no repository may contain <code>src/engg_math/__init__.py</code>, and CI rejects any wheel that does.</p>

		<h2>Releases</h2>
		<p>One repository, one distribution, one version. The Infrastructure monorepo is the exception: <code>core</code>, <code>units</code>, <code>viz</code> and <code>devtools</code> are versioned separately with tags like <code>core-v0.1.0</code>. A release is a tag, a CI gate, a build with SBOM and provenance attestation, a manual approval, then PyPI Trusted Publishing.</p>

		<h2>Beside the stack</h2>
		<p><code>devtools</code> consumes the libraries to check them, so it sits above them and is never imported by them. <code>engg-math</code> (the CLI) manages the stack and imports none of it at runtime. This is why Infrastructure cannot ship as a single installable package.</p>
	</div>
</div>
<style>h1 { margin-bottom: 36px; }</style>
