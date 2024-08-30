import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

import { User, type CreateUserParams } from '$lib/models/user';
import { validateEmail } from '$lib/utils/email';
import { Store, type CreateStoreParams } from '$lib/models/store';

export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		const name = body.get('name')?.toString();
		const storeName = body.get('store-name')?.toString();
		const email = body.get('email')?.toString();
		const phone = body.get('phone')?.toString();
		const password = body.get('password')?.toString();
		const confirmPassword = body.get('confirm-password')?.toString();
		const terms = body.get('terms')?.toString();

		let errorBag: Record<string, string> = {};
		let valueBag = {
			name,
			storeName,
			email,
			phone,
			password,
			confirmPassword,
			terms: terms ? true : false
		};
		if (!name) {
			errorBag.name = 'Nama harus diisi';
		}
		if (!storeName) {
			errorBag.storeName = 'Nama toko harus diisi';
		}
		if (!email) {
			errorBag.email = 'Email harus diisi';
		} else if (!validateEmail(email.toString())) {
			errorBag.email = 'Format email salah';
		}
		if (!phone) {
			errorBag.phone = 'Nomor handphone harus diisi';
		}
		if (!password) {
			errorBag.password = 'Password harus diisi';
		}
		if (!confirmPassword) {
			errorBag.confirmPassword = 'Konfirmasi password harus diisi';
		} else if (password != confirmPassword) {
			errorBag.confirmPassword = 'Konfirmasi password tidak cocok';
		}
		if (!terms) {
			errorBag.terms = 'Untuk melanjutkan, Anda harus menyetujui kebijakan kami';
		}

		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag };
		}

		const hashPassword = bcrypt.hashSync(password!, 10);

		const payload: CreateUserParams = {
			name: name!,
			email: email!,
			password: hashPassword,
			emailVerified: null
		};
		const { data, error } = await User.createUser(payload);
		if (error || !data) {
			errorBag.message = error ?? 'Terjadi kesalahan saat melakukan registrasi';
			return { errors: errorBag, values: valueBag };
		}

		const storeData: CreateStoreParams = {
			memberId: data.id_member,
			description: '',
			email: email!,
			name: storeName!,
			phone: phone!
		};
		await Store.createStore(storeData);

		return redirect(307, '/auth/login');
	}
} satisfies Actions;
