import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Store } from '$lib/models/store';

export const load: LayoutServerLoad = async (events) => {
	const session = await events.locals.auth();
	const pathname = events.url.pathname;

	if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
		if (!session?.user) {
			return redirect(307, '/auth/login');
		}

		if (!pathname.startsWith('/onboarding')) {
			const store = await Store.getStoreByMember(session.user.id!);
			if (!store) {
				return redirect(307, '/onboarding');
			}
		}
	}

	if (pathname.startsWith('/auth') && session?.user) {
		return redirect(307, '/dashboard');
	}

	return {
		session
	};
};
