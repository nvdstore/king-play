import { addMinutes } from 'date-fns';
import { getStoreByMember } from '$lib/models/store';
import type { Store } from '$lib/type';

import type { LayoutServerLoad } from './$types';
import { getBalance } from '$lib/models/user';
import { request } from '$lib/request';

export const load: LayoutServerLoad = async (events) => {
	const { user } = await events.parent();

	const balance = await getBalance(user?.idMember!);

	const storeData = await getStoreByMember(user?.idMember!);
	// this is store for authenticated member for dashboard
	const store: Store = {
		idMember: storeData.id_member,
		name: storeData.name,
		description: storeData.description,
		phone: storeData.phone,
		email: storeData.email,
		domain: storeData.domain,
		customDomain: storeData.custom_domain,
		logo: storeData.logo,
		promo: [],
		theme: storeData.theme,
		color: storeData.color,
		balance,
		info: {
			fb: storeData.fb,
			tiktok: storeData.tiktok,
			ig: storeData.ig,
			telegram: storeData.telegram,
			twitter: storeData.twitter
		}
	};

	let showPopup = true;
	if (!events.cookies.get('popup')) {
		events.cookies.set('popup', '1', { path: '/', expires: addMinutes(new Date(), 15) });
	} else {
		events.cookies.set('popup', '0', { path: '/', expires: addMinutes(new Date(), 15) });
	}

	showPopup = events.cookies.get('popup') == '1';

	const { additional } = await request({
		method: 'GET',
		endpoint: `/api/qr/generate-qrurl/${store.customDomain ?? store.domain}`,
		payload: {},
		uuid: user?.idMember!
	});

	let qrShare = '';
	if (additional?.qr_code_url) {
		const qrData = await fetch(additional?.qr_code_url)
			.then((response) => response.arrayBuffer())
			.then((buffer) => Buffer.from(buffer).toString('base64'));

		qrShare = `data:image/png;base64, ${qrData}`;
	}

	return {
		store,
		showPopup,
		qrShare
	};
};
