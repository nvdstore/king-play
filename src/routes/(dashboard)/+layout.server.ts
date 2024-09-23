import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getStoreByMember } from '$lib/models/store';

export const load: LayoutServerLoad = async (events) => {
	const session = await events.locals.auth();
	const pathname = events.url.pathname;

	if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
		if (!session?.user) {
			return redirect(307, '/auth/login');
		}

		const store = await getStoreByMember(session.user.id!);

		if (!pathname.startsWith('/onboarding') && !store) {
			return redirect(307, '/onboarding');
		} else if (pathname.startsWith('/onboarding') && store) {
			return redirect(307, '/dashboard');
		}
	}

	if (pathname.startsWith('/auth') && session?.user) {
		return redirect(307, '/dashboard');
	}

	return {
		session
	};
};
