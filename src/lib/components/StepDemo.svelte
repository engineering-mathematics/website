<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';
	// G(s) = wn^2 / (s^2 + 2 z wn s + wn^2), simulated with RK4 for the step response.
	const wn = 2.0;
	let z = $state(0.25);
	const T = 10, N = 400;
	const step = $derived.by(() => {
		const dt = T / N;
		let x = 0, v = 0;
		const f = (x: number, v: number) => [v, wn * wn * (1 - x) - 2 * z * wn * v];
		const out: [number, number][] = [[0, 0]];
		for (let i = 1; i <= N; i++) {
			const [k1x, k1v] = f(x, v);
			const [k2x, k2v] = f(x + (dt / 2) * k1x, v + (dt / 2) * k1v);
			const [k3x, k3v] = f(x + (dt / 2) * k2x, v + (dt / 2) * k2v);
			const [k4x, k4v] = f(x + dt * k3x, v + dt * k3v);
			x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
			v += (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
			out.push([i * dt, x]);
		}
		return out;
	});
	const bode = $derived.by(() => {
		const out: [number, number][] = [];
		for (let i = 0; i <= 120; i++) {
			const w = 10 ** (-1 + (i / 120) * 2);
			const re = wn * wn - w * w, im = 2 * z * wn * w;
			out.push([Math.log10(w), 20 * Math.log10((wn * wn) / Math.hypot(re, im))]);
		}
		return out;
	});
	const overshoot = $derived(z < 1 ? 100 * Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z)) : 0);
	const peak = $derived(Math.max(1.1, ...step.map((p) => p[1])));
	const path = (pts: [number, number][], x0: number, x1: number, y0: number, y1: number, W: number, H: number) =>
		'M' + pts.map(([x, y]) => `${(((x - x0) / (x1 - x0)) * W).toFixed(1)},${(H - ((y - y0) / (y1 - y0)) * H).toFixed(1)}`).join(' L');
	const code = $derived(`from engg_math.continuous_analysis import Domain, TransferFunction
from engg_math.dynamical_systems import pole_modes, step_response

g = TransferFunction([${(wn * wn).toFixed(1)}], [1.0, ${(2 * z * wn).toFixed(2)}, ${(wn * wn).toFixed(1)}])
step_response(g, Domain(0.0, ${T}.0, ${N + 1})).y.max()   # ≈ ${(1 + overshoot / 100).toFixed(3)}
pole_modes(g).damping_ratio                          # ${z.toFixed(2)}`);
</script>

<div class="demo">
	<div class="plots">
		<figure>
			<figcaption>Step response <span>overshoot {overshoot.toFixed(1)}%</span></figcaption>
			<svg viewBox="0 0 400 200" aria-label="Step response">
				<line x1="0" x2="400" y1={200 - 200 / peak} y2={200 - 200 / peak} class="ref" />
				<path d={path(step, 0, T, 0, peak, 400, 200)} class="curve" />
			</svg>
		</figure>
		<figure>
			<figcaption>Bode magnitude <span>dB vs log ω</span></figcaption>
			<svg viewBox="0 0 400 200" aria-label="Bode magnitude">
				<line x1="0" x2="400" y1="120" y2="120" class="ref" />
				<path d={path(bode, -1, 1, -40, 25, 400, 200)} class="curve" />
			</svg>
		</figure>
	</div>
	<label class="slider">
		<span>damping ratio ζ <b>{z.toFixed(2)}</b></span>
		<input type="range" min="0.05" max="2" step="0.01" bind:value={z} />
	</label>
	<CodeBlock {code} title="python · same system" />
</div>

<style>
	.demo { display: grid; gap: 20px; }
	.plots { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
	@media (max-width: 720px) { .plots { grid-template-columns: 1fr; } }
	figure { margin: 0; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); padding: 12px 14px 8px; }
	figcaption { display: flex; justify-content: space-between; font: 500 0.72rem var(--mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
	figcaption span { color: var(--dim); letter-spacing: 0.04em; text-transform: none; }
	svg { width: 100%; display: block; background: linear-gradient(var(--line-soft) 1px, transparent 1px) 0 0 / 100% 40px; }
	.curve { fill: none; stroke: var(--gold-hi); stroke-width: 2; vector-effect: non-scaling-stroke; }
	.ref { stroke: var(--gold-lo); stroke-dasharray: 4 4; opacity: 0.6; }
	.slider { display: grid; gap: 6px; font: 500 0.85rem var(--mono); color: var(--muted); }
	.slider b { color: var(--gold-hi); margin-left: 8px; }
	input[type='range'] { width: 100%; accent-color: var(--gold); }
</style>
