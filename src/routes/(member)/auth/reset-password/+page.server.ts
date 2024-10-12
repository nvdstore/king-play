import { redirect, type Actions } from '@sveltejs/kit';
import { addDays } from 'date-fns';

import { getEmailToken, updateEmailToken } from '$lib/models/email';
import { updatePassword } from '$lib/models/user';
import { validatePassword } from '$lib/utils/validator';

export const actions: Actions = {
	default: async ({ url, request, cookies }) => {
		const token = url.searchParams.get('token') ?? '';
		if (!token) {
			redirect(301, '/');
		}

		const frmData = await request.formData();
		const password = frmData.get('password')?.toString() ?? '';
		const confirmPassword = frmData.get('confirm-password')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = { password, confirmPassword };

		if (!password) {
			errorBag.password = 'Password baru harus diisi';
		} else if (!validatePassword(password)) {
			errorBag.password = 'Format password salah';
		}

		if (!confirmPassword) {
			errorBag.confirmPassword = 'Konfirmasi password harus diisi';
		} else if (password != confirmPassword) {
			errorBag.confirmPassword = 'Konfirmasi password tidak sesuai';
		}

		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag, message: 'Input salah, periksa form!' };
		}

		const result = await getEmailToken(token);
		const idMember = result?.user_id;
		if (!result || !idMember) {
			return { errors: errorBag, values: valueBag, message: 'Invalid Token' };
		}

		const expiredAt = addDays(result?.created_at, 1);
		if (expiredAt < new Date()) {
			return { errors: errorBag, values: valueBag, message: 'Invalid Token' };
		}

		await updateEmailToken(idMember, token);

		const { data, error } = await updatePassword({
			idMember,
			password
		});

		if (error) {
			return {
				errors: errorBag,
				values: valueBag,
				message: error ?? 'Terjadi kesalahan'
			};
		}

		return {
			errors: errorBag,
			values: valueBag,
			ok: true,
			message: 'Password berhasil diubah'
		};
	}
};
