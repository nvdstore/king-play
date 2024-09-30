import type { Actions, PageServerLoad } from './$types';

import { getStoreByMember, updateStore } from '$lib/models/store';
import { validateEmail } from '$lib/utils/validator';
import type { Store } from '$lib/type';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	const result = await getStoreByMember(session?.user?.id!);
	if (!result) {
		error(404);
	}

	const store: Store = {
		idMember: result.id_member,
		name: result.name,
		description: result.description,
		phone: result.phone,
		email: result.email,
		domain: result.domain,
		logo: result.logo,
		color: result.color,
		theme: result.theme,
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
	store: async ({ request, locals }) => {
		const session = await locals.auth();
		const frmData = await request.formData();

		const name = frmData.get('store-name')?.toString();
		const desc = frmData.get('store-desc')?.toString();
		const email = frmData.get('store-email')?.toString();
		const phone = frmData.get('store-phone')?.toString();
		const theme = frmData.get('store-theme')?.toString() ?? 'light';
		const color = frmData.get('store-color')?.toString() ?? 'blue';

		let errorBag: Record<string, string> = {};
		let valueBag = {
			name,
			desc,
			email,
			phone,
			theme,
			color
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
			return { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' };
		}

		const updateId = await updateStore({
			memberId: session?.user?.id!,
			name: name!,
			description: desc ?? '',
			email: email!,
			phone: phone!,
			theme: theme,
			color: color
		});

		if (!updateId) {
			return { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' };
		}

		return { errors: {}, values: valueBag, message: 'Berhasil merubah data' };
	},
	social: async (event) => {},
	user: async (event) => {},
	password: async (event) => {}
} satisfies Actions;
