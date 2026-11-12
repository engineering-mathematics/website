<script lang="ts">
	let { code, lang = 'python', title = '' }: { code: string; lang?: string; title?: string } = $props();
	const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
	const TOK = /(#.*$)|("[^"\n]*"|'[^'\n]*')|\b(from|import|as|def|return|lambda|True|False|None|for|in|if|else)\b|(\b\d+\.?\d*(?:e-?\d+)?\b)/gm;
	function hl(src: string) {
		if (lang !== 'python') return esc(src);
		let out = '', last = 0;
		for (const m of src.matchAll(TOK)) {
			out += esc(src.slice(last, m.index));
			const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : 'n';
			out += `<i class="${cls}">${esc(m[0])}</i>`;
			last = m.index + m[0].length;
		}
		return out + esc(src.slice(last));
	}
	const html = $derived(hl(code));
	let copied = $state(false);
	async function copy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 1400);
	}
</script>

<figure>
	<figcaption>
		<span class="dots"><b></b><b></b><b></b></span>
		<span class="t">{title || lang}</span>
		<button onclick={copy} aria-label="Copy code">{copied ? 'copied' : 'copy'}</button>
	</figcaption>
	<pre><code>{@html html}</code></pre>
</figure>

<style>
	figure { margin: 0; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); overflow: hidden; }
	figcaption { display: flex; align-items: center; gap: 12px; padding: 8px 14px; border-bottom: 1px solid var(--line-soft); font: 500 0.72rem var(--mono); color: var(--dim); }
	.dots { display: flex; gap: 6px; } .dots b { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
	.t { flex: 1; letter-spacing: 0.08em; text-transform: uppercase; }
	button { all: unset; cursor: pointer; color: var(--gold); padding: 2px 8px; border-radius: 4px; } button:hover { background: var(--raise); }
	pre { margin: 0; padding: 16px 18px; overflow-x: auto; line-height: 1.7; color: var(--text); }
	pre :global(.k) { color: var(--gold); font-style: normal; }
	pre :global(.s) { color: #d8c690; font-style: normal; }
	pre :global(.n) { color: var(--gold-hi); font-style: normal; }
	pre :global(.c) { color: var(--dim); font-style: normal; }
</style>
