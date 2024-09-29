import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getStoreByMember } from '$lib/models/store';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.auth();
	const pathname = url.pathname;
	const host = url.hostname;

	if (host != 'kingplay.id') {
		const store = await getStoreByMember(session?.user?.id!);
		if ((store.domain ?? store.custom_domain) != host) {
			redirect(307, '/');
		}
	}

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
