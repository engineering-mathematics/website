import { error } from '@sveltejs/kit';
import { bySlug, packages } from '#lib/data/packages.ts';

export const entries = () => packages.map((p) => ({ slug: p.slug }));
export const load = ({ params }) => {
	const pkg = bySlug(params.slug);
	if (!pkg) error(404, 'Unknown package');
	return { pkg };
};
