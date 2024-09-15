import { validateEmail } from '$lib/utils/validator';
import type { Actions } from './$types';

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
