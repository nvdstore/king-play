import type { Actions, PageServerLoad } from './$types';

import { getStoreByMember, type Store } from '$lib/models/store';
import { validateEmail } from '$lib/utils/validator';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	const result = await getStoreByMember(session?.user?.id!);

	const store: Store = {
		id: result.id,
		idMember: result.id_member,
		name: result.name,
		description: result.description,
		phone: result.phone,
		email: result.email,
		domain: result.domain,
		info: {
			fb: result.fb,
			tiktok: result.tiktok,
			ig: result.ig,
			telegram: result.telegram,
			twitter: result.twitter
		}
	};

	return {
		store
	};
};

export const actions = {
	store: async ({ request }) => {
		const body = await request.formData();

		const name = body.get('store-name')?.toString();
		const desc = body.get('store-desc')?.toString();
		const email = body.get('store-email')?.toString();
		const phone = body.get('store-phone')?.toString();

		let errorBag: Record<string, string> = {};
		let valueBag = {
			name,
			email,
			phone
		};
		if (!name) {
			errorBag.name = 'Nama harus diisi';
		}
		if (!email) {
			errorBag.email = 'Email harus diisi';
		} else if (!validateEmail(email.toString())) {
			errorBag.email = 'Format email salah';
		}
		if (!phone) {
			errorBag.phone = 'Nomor harus diisi';
		}

		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag };
		}
	},
	social: async (event) => {},
	user: async (event) => {},
	password: async (event) => {}
} satisfies Actions;
