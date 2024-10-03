import { getStoreByMember } from '$lib/models/store';
import type { Store } from '$lib/type';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (events) => {
	const { user } = await events.parent();

	const storeData = await getStoreByMember(user?.idMember);
	// this is store for authenticated member for dashboard
	const store: Store = {
		idMember: storeData.id_member,
		name: storeData.name,
		description: storeData.description,
		phone: storeData.phone,
		email: storeData.email,
		domain: storeData.custom_domain ?? storeData.domain,
		logo: storeData.logo,
		promo: [],
		theme: storeData.theme,
		color: storeData.color,
		info: {
			fb: storeData.fb,
			tiktok: storeData.tiktok,
			ig: storeData.ig,
			telegram: storeData.telegram,
			twitter: storeData.twitter
		}
	};

	return {
		store
	};
};
