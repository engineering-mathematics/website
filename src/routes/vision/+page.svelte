<svelte:head><title>Vision · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<span class="eyebrow">Vision</span>
	<h1>A shared, rigorous foundation for engineering software.</h1>
	<div class="prose">
		<p class="lede">Engineering teams re-implement the same mathematics again and again: matrix factorisations, transfer functions, state-space models, probability, graph algorithms. Each copy carries its own numerical quirks, unit conventions and bugs.</p>
		<p>Engineering Mathematics is a set of small, independently versioned packages that are fast, strictly typed, unit-aware and verifiable, with a terminal experience good enough that engineers enjoy using it.</p>

		<h2>What “rigorous” means here</h2>
		<ul>
			<li><strong>Correct by construction.</strong> Unsafe numerical patterns (explicit inversion, silent unit mismatch, ill-conditioned solves) are blocked or loudly reported.</li>
			<li><strong>Verifiable.</strong> Numerical results are checked against reference solutions, and tolerances are documented, not implicit.</li>
			<li><strong>Reproducible.</strong> Locked dependencies, recorded BLAS/LAPACK backends, deterministic builds, signed releases with an SBOM.</li>
			<li><strong>Fast.</strong> Column-major data over BLAS/LAPACK, no hidden copies. Performance regressions fail CI.</li>
			<li><strong>Decoupled.</strong> Install only what you use.</li>
		</ul>

		<h2>Who it is for</h2>
		<p>Engineers and researchers in domains where numerical mistakes are expensive: aerospace, motorsport, power and electrical systems, robotics, biomedical. The project follows the verification habits of those industries, but <strong>makes no certification claims</strong> (DO-178C, ISO 26262 and similar) for any package. It is built so that a team could qualify it.</p>

		<h2>What it is not</h2>
		<ul>
			<li>Not a replacement for NumPy or SciPy. It adds disciplined, domain-aware layers on top of them.</li>
			<li>Not a monolith. Breadth comes from many focused packages.</li>
			<li>Not a closed system. Every package stays usable on its own, without the CLI.</li>
		</ul>

		<h2>Principles, in priority order</h2>
		<ol><li>Correctness</li><li>Clarity of the public API</li><li>Reproducibility</li><li>Performance</li><li>Terminal polish</li></ol>
		<p>Polish never overrides the first four, but it is a requirement, not a nice-to-have.</p>
	</div>
</div>
<style>h1 { margin-bottom: 36px; max-width: 18ch; }</style>
