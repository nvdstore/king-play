import { error, redirect } from '@sveltejs/kit';

import { getStoreByMember } from '$lib/models/store';
import type { Store, UserInfo } from '$lib/type';

import type { LayoutServerLoad } from './$types';
import { getUserById } from '$lib/models/user';

export const load: LayoutServerLoad = async ({ url, locals, parent }) => {
	const { masterHost } = await parent();
	if (!masterHost) {
		error(404);
	}

	const session = await locals.auth();
	const pathname = url.pathname;
	let store: Store | null = null;

	if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
		if (!session?.user) {
			return redirect(307, '/auth/login');
		}

		const store = await getStoreByMember(session?.user?.id!);
		if (!pathname.startsWith('/onboarding') && !store) {
			return redirect(307, '/onboarding');
		} else if (pathname.startsWith('/onboarding') && store) {
			return redirect(307, '/dashboard');
		}
	}

	if (pathname.startsWith('/auth') && session?.user) {
		return redirect(307, '/dashboard');
	}

	const user = await getUserById(session?.user?.id!);
	if (user) {
		const userInfo: UserInfo = {
			idMember: user.id_member,
			username: user.username,
			name: user.name,
			email: user.email,
			image: user.image,
			balance: user.balance
		};

		return {
			user: userInfo
		};
	}

	redirect(307, '/auth/login');
};
