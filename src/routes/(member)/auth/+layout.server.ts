import { themes } from '$lib/themes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const color = 'blue';
	const theme = themes['light'];

	return {
		color,
		theme
	};
};
