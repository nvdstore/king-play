import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const host = url.hostname;
	const masterHost = host == 'localhost' || host == 'kingplay.id' || host == 'www.kingplay.id';

	return {
		masterHost
	};
};
