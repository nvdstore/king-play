import fs from 'fs';
import type { Actions, PageServerLoad } from './$types';

import { updateStore, updateStoreInfo } from '$lib/models/store';
import { validateEmail } from '$lib/utils/validator';
import { upload } from '$lib/upload';

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
		const logo = frmData.get('store-logo') as File;

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
		if (logo && !logo.type.match('image/')) {
			errorBag.logo = 'Format file salah';
		}

		if (Object.keys(errorBag).length) {
			return { store: { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' } };
		}

		const filename = await upload({ file: logo, dirname: session?.user?.id });
		const { data, error } = await updateStore({
			memberId: session?.user?.id!,
			name: name!,
			description: desc ?? '',
			email: email!,
			phone: phone!,
			theme: theme,
			color: color,
			logo: filename ?? undefined
		});

		if (error) {
			return {
				store: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
			};
		}

		return { store: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
	},
	social: async ({ locals, request }) => {
		const session = await locals.auth();
		const frmData = await request.formData();

		const tiktok = frmData.get('store-tiktok')?.toString() ?? '';
		const fb = frmData.get('store-fb')?.toString() ?? '';
		const ig = frmData.get('store-ig')?.toString() ?? '';
		const twitter = frmData.get('store-twitter')?.toString() ?? '';
		const telegram = frmData.get('store-telegram')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = {
			tiktok,
			fb,
			ig,
			twitter,
			telegram
		};

		const { data, error } = await updateStoreInfo({
			memberId: session?.user?.id!,
			tiktok,
			fb,
			ig,
			twitter,
			telegram
		});

		if (error) {
			return {
				social: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
			};
		}

		return { social: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
	}
} satisfies Actions;
