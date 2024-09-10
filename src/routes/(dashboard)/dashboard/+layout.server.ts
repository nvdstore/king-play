import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Store } from '$lib/models/store';

export const load: LayoutServerLoad = async (events) => {
	const session = await events.locals.auth();
	const store = await Store.getStoreByMember(session?.user?.id!);

	return {
		store,
		user: session?.user
	};
};
