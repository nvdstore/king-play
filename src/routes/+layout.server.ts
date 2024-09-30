import { error, redirect } from '@sveltejs/kit';

import { getStoreByMember } from '$lib/models/store';

import type { PageServerLoad } from './$types';
import { themes } from './themes';

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = await locals.auth();
	const pathname = url.pathname;
	const host = url.hostname;

	if (host == 'localhost' || host == 'kingplay.id') {
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
	}

	const getTheme = url.searchParams.get('theme');

	type ThemeType = typeof themes;
	let dataTheme: keyof ThemeType = (getTheme as 'light') ?? 'light';
	let dataColor = 'blue';
	const color = dataColor ?? '';
	const theme = themes[dataTheme ?? 'light'];

	return {
		color,
		theme
	};
};
