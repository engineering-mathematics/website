<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Glyph from '#lib/components/Glyph.svelte';
	const cmds = [
		['init NAME [--python SPEC] [--source git|pypi]', 'New workspace: engg-math.toml, pyproject.toml, README'],
		['add PACKAGE [--version SPEC] [--no-sync]', 'Add a package; uv installs it'],
		['remove PACKAGE [--no-sync]', 'Remove a package and prune its unused sources'],
		['update [--no-sync]', 'Re-pin sources to the revisions this CLI knows and upgrade the lock'],
		['list [--available]', 'Workspace packages, or every known package'],
		['info PACKAGE', 'Summary, requirements, dependents'],
		['graph', 'Dependency tree of the workspace'],
		['doctor [--audit]', 'Python, uv, manifest, versions, BLAS/LAPACK, advisories']
	];
	const codes = [['0', 'success'], ['1', 'failed check or other error'], ['2', 'invalid or missing manifest'], ['3', 'unknown package'], ['4', 'uv missing or failed']];
</script>

<svelte:head><title>CLI · Engineering Mathematics</title></svelte:head>
<div class="wrap section">
	<header><Glyph tex={'\\rangle\\!\\_'} size={84} /><div>
		<span class="eyebrow">engg-math-cli</span>
		<h1>One command for the whole workspace.</h1>
		<p class="lede">Create workspaces, add packages by friendly name, check the environment. The libraries work without it, and it imports none of them.</p>
	</div></header>

	<div class="two">
		<CodeBlock lang="bash" title="shell" code={'pip install engg-math-cli\nengg-math init my-lab && cd my-lab\nengg-math add dynamical-systems\nengg-math doctor'} />
		<div class="prose">
			<p>Names resolve from any spelling: <code>linear-systems</code>, <code>linear_systems</code>, <code>engg-math-linear-systems</code>, <code>engg_math.linear_systems</code>. Typos get suggestions.</p>
			<p>Output is for people and pipelines alike: <code>--json</code> prints a stable envelope, <code>NO_COLOR</code> is honoured, and styling drops when stdout is not a terminal. Nothing animates.</p>
		</div>
	</div>

	<h2>Commands</h2>
	<table><tbody>{#each cmds as [c, d]}<tr><td><code>{c}</code></td><td>{d}</td></tr>{/each}</tbody></table>

	<h2>Manifest and sources</h2>
	<div class="prose">
		<p><code>engg-math.toml</code> holds <code>project</code>, <code>python</code>, <code>source</code> and a <code>[modules]</code> table. It is validated: unknown keys and invalid specifiers are errors. <code>pyproject.toml</code> is derived from it.</p>
		<p>Until the first PyPI release, <code>source = "git"</code> pins every package to a commit and repeats the git source of each transitive dependency. <code>source = "pypi"</code> installs normally.</p>
	</div>

	<h2>Exit codes</h2>
	<table><tbody>{#each codes as [c, d]}<tr><td><code>{c}</code></td><td>{d}</td></tr>{/each}</tbody></table>
</div>

<style>
	header { display: flex; gap: 28px; align-items: center; margin-bottom: 48px; } h1 { margin-bottom: 14px; }
	.two { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: center; } @media (max-width: 820px) { .two { grid-template-columns: 1fr; } header { flex-direction: column; align-items: flex-start; } }
	h2 { margin: 64px 0 18px; } td code { white-space: normal; }
</style>
