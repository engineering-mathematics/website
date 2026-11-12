export const ORG_URL = 'https://github.com/engineering-mathematics';

export type Tier = 0 | 1 | 'tool';

export interface Pkg {
	slug: string;
	repo: string;
	dist: string;
	module: string | null;
	tier: Tier;
	/** TeX for the package glyph (rendered with KaTeX). */
	glyph: string;
	tagline: string;
	summary: string;
	/** Runtime dependencies on other ecosystem packages (slugs). */
	deps: string[];
	example: string;
	guarantees: [string, string][];
	api: [string, string][];
	notes: string[];
}

export const tiers = [
	{ id: 4, name: 'Reference Systems', blurb: 'Applications and worked examples. Not published to PyPI.', planned: true, examples: ['ref-autopilot', 'ref-robot-arm', 'ref-smart-grid'] },
	{ id: 3, name: 'Domain Frameworks', blurb: 'Engineering domains built on the layers below.', planned: true, examples: ['control', 'robotics', 'cfd', 'fem', 'signal-processing', 'power-systems'] },
	{ id: 2, name: 'System Modelling', blurb: 'Behaviour on top of Foundations data classes: realisations, conversions, composition.', planned: true, examples: ['state-space', 'transfer-functions', 'graph-models', 'physical-systems', 'constraint-models'] },
	{ id: 1, name: 'Foundations', blurb: 'The core mathematics. Eight packages at 0.1.', planned: false, examples: [] },
	{ id: 0, name: 'Infrastructure', blurb: 'Runtime foundations shared by everything above.', planned: false, examples: [] }
] as const;

export const packages: Pkg[] = [
	{
		slug: 'linear-systems',
		repo: 'linear-systems',
		dist: 'engg-math-linear-systems',
		module: 'engg_math.linear_systems',
		tier: 1,
		glyph: '\\mathbf{A}',
		tagline: 'Labelled, unit-aware linear algebra.',
		summary:
			'Column-major, labelled, unit-aware dense and sparse matrices with factorisation-based solvers. Unknowns carry the labels and units of the matrix columns.',
		deps: ['core', 'units'],
		example: `from engg_math.linear_systems import DenseMatrix, RobustSolver

a = DenseMatrix([[4.0, 2.0], [2.0, 3.0]], col_labels=["x", "y"], col_units=["m", "m"])
x = RobustSolver(a).solve([8.0, 7.0])
x.row_labels  # ('x', 'y'): unknowns carry A's column labels and units`,
		guarantees: [
			['Column-major storage', '`DenseMatrix` stores `order="F"`; I/O readers produce it directly.'],
			['Solve, never invert', 'No `inv`/`pinv`/`det` in the code base (ruff `TID251`); `invert()` raises.'],
			['Condition numbers are policy', '`RobustSolver` applies `kappa_warning` / `kappa_error` from `engg_math.core`.'],
			['Units are a safety feature', '`matmul`, `add`, `subtract` and solves raise `DimensionalError` on mismatch.'],
			['Validated labels', 'Duplicate or mismatched labels raise `LabelError` / `ShapeError`.'],
			['Strict mode', '`ENGG_MATH_STRICT=1` forbids allocating operators.']
		],
		api: [
			['Matrices', 'DenseMatrix, Hermitian, SparseMatrix, EngineeringDataFrame'],
			['Memory', 'Scratchpad, Arena (out= for allocation-free add/subtract/matmul)'],
			['Factorisations', 'factorize_lu / _cholesky / _qr / _svd'],
			['Solvers', 'DirectSolver, PseudoinverseSolver, RobustSolver'],
			['Analysis', 'condition_number, rank, nullity, trace, log_determinant'],
			['Spectral', 'EigenPair, JordanCanonicalForm'],
			['I/O', 'read_csv, read_json, read_binary']
		],
		notes: ['Optional `cli` extra adds an interactive session and rich output.']
	},
	{
		slug: 'continuous-analysis',
		repo: 'continuous-analysis',
		dist: 'engg-math-continuous-analysis',
		module: 'engg_math.continuous_analysis',
		tier: 1,
		glyph: '\\int',
		tagline: 'Polynomials, transfer functions, state-space, linear ODEs.',
		summary:
			'Validated inputs, read-only coefficient and matrix storage, typed errors, no printing.',
		deps: ['core'],
		example: `from engg_math.continuous_analysis import TransferFunction, LinearODE, Domain

g = TransferFunction([2.0], [1.0, 4.0])  # 2 / (s + 4)
g.poles(), g.dc_gain(), g.is_stable()    # [-4.], 0.5, True
ss = g.to_state_space()                  # controllable canonical form

ode = LinearODE([[-1.0]], [[1.0]])
ode.solve([0.0], Domain(0.0, 5.0, 101), u=[1.0]).x`,
		guarantees: [
			['Descending powers of s', 'Denominators are normalised to monic; common factors are not cancelled.'],
			['Explicit stability', 'Every pole strictly below `-margin` (default 0).'],
			['Exact when it can be', 'No-input solves use the matrix exponential; forced solves use adaptive DOP853 (`rtol=1e-9`).'],
			['Read-only storage', 'State-space matrices are stored read-only in Fortran order.']
		],
		api: [
			['Sampling', 'Domain'],
			['Polynomials', 'Polynomial (evaluate, derivative, roots, from_roots)'],
			['Models', 'TransferFunction, StateSpace'],
			['ODEs', 'LinearODE, Trajectory'],
			['Errors', 'DomainError, IntegrationError']
		],
		notes: ['Time and frequency responses live in `dynamical-systems`.']
	},
	{
		slug: 'dynamical-systems',
		repo: 'dynamical-systems',
		dist: 'engg-math-dynamical-systems',
		module: 'engg_math.dynamical_systems',
		tier: 1,
		glyph: '\\dot{x}',
		tagline: 'Time and frequency response, poles, controllability.',
		summary:
			'Time response, frequency response, pole analysis, controllability and observability of LTI systems. Accepts `StateSpace` or `TransferFunction`.',
		deps: ['core', 'linear-systems', 'continuous-analysis'],
		example: `from engg_math.continuous_analysis import Domain, TransferFunction
from engg_math.dynamical_systems import bode, is_controllable, step_response

g = TransferFunction([1.0], [1.0, 2.0, 1.0])  # 1 / (s + 1)^2
step_response(g, Domain(0.0, 10.0, 201)).y[-1]  # ~1.0
bode(g, [0.1, 1.0, 10.0]).magnitude_db
is_controllable(g)  # True`,
		guarantees: [
			['Solve, never invert', '`H(jw)` and `dc_gain` use linear solves. A frequency on a pole raises `DomainError`.'],
			['Indexed [time, channel]', '`Response.y` is `(N, outputs)`, `Response.x` is `(N, states)`.'],
			['Honest rank tests', 'SVD rank from `linear-systems`; pass `tol` explicitly for high orders.']
		],
		api: [
			['Time domain', 'simulate, step_response, impulse_response, dc_gain'],
			['Frequency domain', 'frequency_response, bode'],
			['Poles', 'pole_modes (natural frequency, damping ratio)'],
			['Structure', 'controllability_matrix, observability_matrix, is_controllable, is_observable']
		],
		notes: ['Plotting returns with `engg-math-viz`.']
	},
	{
		slug: 'discrete-structures',
		repo: 'discrete-structures',
		dist: 'engg-math-discrete-structures',
		module: 'engg_math.discrete_structures',
		tier: 1,
		glyph: '\\varnothing',
		tagline: 'Sets, counting, Boolean logic, directed graphs.',
		summary: 'Validated inputs, typed errors, no printing.',
		deps: ['core'],
		example: `from engg_math.discrete_structures import MathSet, DirectedGraph, combination_count, truth_table, xor

MathSet([1, 2]) | MathSet([2, 3])   # MathSet({1, 2, 3})
combination_count(52, 5)            # 2598960
g = DirectedGraph([("a", "b"), ("b", "c")])
g.topological_order()               # ('a', 'b', 'c')`,
		guarantees: [
			['Typed errors', '`DomainError`, `GraphError`, `CycleError` all subclass `EnggMathError`.'],
			['Lazy enumeration', '`permutations` and `combinations` are generators.']
		],
		api: [
			['Sets', 'MathSet (union, intersection, power set, Cartesian product)'],
			['Counting', 'factorial, permutation_count, combination_count, multiset_count, catalan'],
			['Logic', 'and_, or_, xor, implies, truth_table, is_tautology, is_satisfiable'],
			['Graphs', 'DirectedGraph (degrees, reachability, topological order, Dijkstra)']
		],
		notes: ['Parallel edges are not supported in 0.1.']
	},
	{
		slug: 'stochastic-systems',
		repo: 'stochastic-systems',
		dist: 'engg-math-stochastic-systems',
		module: 'engg_math.stochastic_systems',
		tier: 1,
		glyph: '\\mathbb{E}',
		tagline: 'Probability axioms, distributions, Bayesian networks.',
		summary: 'Every probability is validated to lie in [0, 1]; invalid input raises, it is never clipped.',
		deps: ['core', 'discrete-structures'],
		example: `from engg_math.stochastic_systems import Binomial, BayesianNetwork

Binomial(10, 0.3).cdf(4)  # P(X <= 4)

net = BayesianNetwork()
net.add_variable("rain", {(): 0.2})
net.add_variable("wet", {(False,): 0.1, (True,): 0.9}, parents=["rain"])
net.probability({"rain": True}, {"wet": True})`,
		guarantees: [
			['Never clipped', 'Probabilities outside [0, 1] raise.'],
			['No overflow', 'PMFs use log-gamma terms, so large n and k are safe.'],
			['Reproducible sampling', 'Sampling takes a seeded `numpy.random.Generator`.']
		],
		api: [
			['Axioms', 'complement, union, conditional, bayes, total_probability, posterior'],
			['Distributions', 'Normal, Binomial, Poisson'],
			['Networks', 'BayesianNetwork']
		],
		notes: ['Network variables are binary; inference is exact enumeration (limit 20), not scalable.']
	},
	{
		slug: 'numerical-computation',
		repo: 'numerical-computation',
		dist: 'engg-math-numerical-computation',
		module: 'engg_math.numerical_computation',
		tier: 1,
		glyph: '\\approx',
		tagline: 'Roots, differentiation, quadrature, interpolation.',
		summary:
			'Thin, typed layers over SciPy with explicit tolerances, typed errors and result objects that say how an iteration stopped.',
		deps: ['core', 'linear-systems'],
		example: `from engg_math.numerical_computation import brent, integrate_function

brent(lambda x: x**3 - 2, 0, 2).root          # 1.2599...
integrate_function(lambda x: x**2, 0, 3).value  # 9.0`,
		guarantees: [
			['No silent non-convergence', 'Raises `ConvergenceError`; results carry `converged`, `iterations`, `residual`.'],
			['Solve, don’t invert', 'Newton steps use the condition-checked `RobustSolver`.'],
			['Explicit tolerances', 'Every tolerance is a keyword argument with a documented default.'],
			['Principled step sizes', 'eps^(1/3) central, eps^(1/2) forward, scaled to |x|.'],
			['No hidden extrapolation', '`Interpolant` raises outside its range unless `extrapolate=True`.']
		],
		api: [
			['Roots', 'bisect, brent, newton, solve_system'],
			['Differentiation', 'derivative, gradient, jacobian'],
			['Quadrature', 'integrate_function, trapezoid, simpson'],
			['Interpolation', 'Interpolant (linear, cubic, pchip)']
		],
		notes: ['Units are not tracked in 0.1.']
	},
	{
		slug: 'optimization',
		repo: 'optimization',
		dist: 'engg-math-optimization',
		module: 'engg_math.optimization',
		tier: 1,
		glyph: '\\nabla',
		tagline: 'Minimisation, least squares, linear programming.',
		summary: 'Explicit tolerances, typed errors, and results that say how the optimiser stopped.',
		deps: ['core', 'linear-systems', 'numerical-computation'],
		example: `from engg_math.optimization import minimize, linprog

minimize(lambda v: (v[0] - 1) ** 2 + (v[1] + 2) ** 2, [0.0, 0.0]).x  # [1, -2]
linprog([-1, -2], A_ub=[[1, 1], [1, 0]], b_ub=[4, 3]).x             # [0, 4]`,
		guarantees: [
			['No silent failure', 'Non-convergence raises; `raise_on_failure=False` returns `converged=False`.'],
			['Infeasible is an error', '`InfeasibleError`, `UnboundedError`.'],
			['Honest uncertainty', '`least_squares` returns (J^T J)^-1 from the Jacobian SVD, or `None` if rank deficient.']
		],
		api: [
			['Scalar', 'minimize_scalar'],
			['Multivariate', 'minimize (bfgs, lbfgs, nelder-mead)'],
			['Fitting', 'least_squares'],
			['Programming', 'linprog']
		],
		notes: ['Constrained nonlinear programming and units are not part of 0.1.']
	},
	{
		slug: 'transform-analysis',
		repo: 'transform-analysis',
		dist: 'engg-math-transform-analysis',
		module: 'engg_math.transform_analysis',
		tier: 1,
		glyph: '\\mathcal{F}',
		tagline: 'FFT, spectral estimation, z-domain analysis.',
		summary: 'Typed layers over SciPy with explicit conventions, validated inputs and results that carry their own frequency axis.',
		deps: ['core'],
		example: `from engg_math.transform_analysis import periodogram, dominant_frequency

spectrum = periodogram(signal, sample_rate=1000.0)  # PSD in signal^2/Hz
dominant_frequency(spectrum)                        # Hz, parabolic-refined`,
		guarantees: [
			['Explicit FFT scaling', '`backward`, `ortho` or `forward`; never implicit.'],
			['Calibrated PSD', 'One-sided, signal^2/Hz; integrates to the mean square.'],
			['Clean inputs', 'NaN and infinity raise `DomainError`.']
		],
		api: [
			['Transforms', 'fft, ifft, rfft, irfft, fftfreq'],
			['Spectral', 'window, periodogram, welch, dominant_frequency'],
			['z-domain', 'z_transform, frequency_response, poles, is_stable']
		],
		notes: ['Laplace transforms, spectrograms and units are not part of 0.1.']
	},
	{
		slug: 'core',
		repo: 'infrastructure',
		dist: 'engg-math-core',
		module: 'engg_math.core',
		tier: 0,
		glyph: '\\Omega',
		tagline: 'Settings, errors, array contracts, conditioning policy.',
		summary: 'The runtime floor. Depends only on NumPy.',
		deps: [],
		example: `# every ecosystem error derives from one base
from engg_math.core import EnggMathError`,
		guarantees: [['One error root', 'All ecosystem exceptions derive from `EnggMathError`.']],
		api: [['Role', 'Settings, errors, array contracts, conditioning policy']],
		notes: ['Lives in the `infrastructure` uv workspace, versioned independently (tag `core-vX.Y.Z`).']
	},
	{
		slug: 'units',
		repo: 'infrastructure',
		dist: 'engg-math-units',
		module: 'engg_math.units',
		tier: 0,
		glyph: '[\\,]',
		tagline: 'Shared pint registry, dimensional tracking.',
		summary: 'One unit registry for the whole ecosystem. Mismatches raise, never warn.',
		deps: ['core'],
		example: `# one shared registry, so quantities from different packages interoperate
from engg_math.units import ...`,
		guarantees: [['Units are a safety feature', 'Dimensional mismatches raise.']],
		api: [['Role', 'Shared pint registry, dimensional tracking']],
		notes: ['Depends on core and pint.']
	},
	{
		slug: 'viz',
		repo: 'infrastructure',
		dist: 'engg-math-viz',
		module: 'engg_math.viz',
		tier: 0,
		glyph: '\\sim',
		tagline: 'Console, theme, JSON output, LaTeX in the terminal.',
		summary: 'Rich terminal output for humans, stable JSON and `NO_COLOR` for pipelines.',
		deps: ['core'],
		example: `# humans get Rich panels and LaTeX; pipelines get --json
from engg_math.viz import ...`,
		guarantees: [['Terminal-first, machine-readable too', 'Rich output, `--json`, `NO_COLOR`, non-TTY fallbacks.']],
		api: [['Role', 'Console, theme, JSON output, txm LaTeX']],
		notes: ['Depends on core and rich.']
	},
	{
		slug: 'devtools',
		repo: 'infrastructure',
		dist: 'engg-math-devtools',
		module: 'engg_math.devtools',
		tier: 'tool',
		glyph: '\\checkmark',
		tagline: 'Validation, benchmarks, dependency-graph check.',
		summary: 'Sits beside the stack: depends on the libraries to check them, and is never imported by them.',
		deps: ['core'],
		example: `# tolerance-explicit validation, benchmark regression, graph check
from engg_math.devtools import ...`,
		guarantees: [['Never imported by libraries', 'Enforced by import-linter: `devtools > viz | units > core`.']],
		api: [['Role', 'Tolerance-explicit validation, benchmark regression, dependency-graph check']],
		notes: ['Performance regressions fail CI.']
	},
	{
		slug: 'cli',
		repo: 'CLI',
		dist: 'engg-math-cli',
		module: null,
		tier: 'tool',
		glyph: '\\rangle\\!\\_',
		tagline: 'Workspace manager and health checker.',
		summary: 'Creates workspaces, adds packages by friendly name, checks the environment. Imports none of the libraries.',
		deps: [],
		example: `engg-math init my-lab && cd my-lab
engg-math add dynamical-systems
engg-math doctor`,
		guarantees: [['Never imported', 'The libraries work without it, and it imports none of them.']],
		api: [['Commands', 'init, add, remove, update, list, info, graph, doctor']],
		notes: []
	}
];

export const bySlug = (s: string) => packages.find((p) => p.slug === s);
export const tierOf = (p: Pkg) => (p.tier === 'tool' ? 'Tooling' : `Tier ${p.tier}`);
