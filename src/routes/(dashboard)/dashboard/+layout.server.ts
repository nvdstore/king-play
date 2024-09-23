import type { LayoutServerLoad } from './$types';
import { getStoreByMember } from '$lib/models/store';

export const load: LayoutServerLoad = async (events) => {
	const session = await events.locals.auth();
	const store = await getStoreByMember(session?.user?.id!);

	return {
		store,
		user: session?.user
	};
};
