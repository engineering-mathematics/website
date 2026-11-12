<script lang="ts">
	// Noise on the left resolves into a clean signal on the right, as in the logo.
	const W = 1440, H = 220, N = 360;
	let seed = 7;
	const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
	const sstep = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
	const pts: string[] = [];
	for (let i = 0; i <= N; i++) {
		const u = i / N;
		const clean = Math.sin(u * Math.PI * 4.2 + 0.6) * 22 * (0.4 + 0.6 * sstep(0.3, 0.8, u));
		const noise = rnd() * 80 + Math.sin(u * 60) * 10;
		const k = 1 - sstep(0.22, 0.62, u);
		pts.push(`${(u * W).toFixed(1)},${(H / 2 + clean + noise * k).toFixed(1)}`);
	}
	const d = 'M' + pts.join(' L');
</script>

<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">
	<defs>
		<linearGradient id="sg" x1="0" x2="1">
			<stop offset="0" stop-color="#9a937f" stop-opacity="0" />
			<stop offset="0.2" stop-color="#9a937f" stop-opacity="0.55" />
			<stop offset="0.6" stop-color="#c9a24b" />
			<stop offset="1" stop-color="#f0dc9c" />
		</linearGradient>
	</defs>
	<path {d} pathLength="1" />
</svg>

<style>
	svg { width: 100%; height: 100%; display: block; }
	path { fill: none; stroke: url(#sg); stroke-width: 2.2; vector-effect: non-scaling-stroke; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 3.2s 0.2s cubic-bezier(0.3, 0.6, 0.2, 1) forwards; }
	@keyframes draw { to { stroke-dashoffset: 0; } }
</style>
