import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) {
		return redirect(301, '/login');
	}

	return {
		session
	};
};
