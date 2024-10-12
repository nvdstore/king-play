import { env } from '$env/dynamic/private';
import { createEmailToken, sendEmail } from '$lib/models/email';
import { getUserByEmail } from '$lib/models/user';
import { validateEmail } from '$lib/utils/validator';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request, cookies }) => {
		const frmData = await request.formData();

		const email = frmData.get('email')?.toString() ?? '';
		const confirmEmail = frmData.get('confirm-email')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = { email };

		if (!email) {
			errorBag.email = 'Email harus diisi';
		} else if (!validateEmail(email)) {
			errorBag.email = 'Format email salah';
		}

		if (!confirmEmail) {
			errorBag.confirmEmail = 'Konfirmasi Email harus diisi';
		} else if (email != confirmEmail) {
			errorBag.confirmEmail = 'Konfirmasi Email tidak sesuai';
		}

		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag, message: 'Input salah, periksa form!' };
		}

		const user = await getUserByEmail(email);
		if (!user) {
			return { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' };
		}

		const token = await createEmailToken(user.id_member!);
		if (!token) {
			return { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' };
		}

		const send = await sendEmail({
			name: user.name,
			from: 'no-reply@kingplay.id',
			to: email,
			subject: 'Reset Password',
			body: `<p>Klik link dibawah untuk merubah kata sandi Anda<p><br/><a href="${env.BASE_URL}/auth/reset-password?token=${token}">Ubah Kata Sandi</a>`
		});
		if (!send) {
			return { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' };
		}

		return {
			errors: errorBag,
			values: valueBag,
			ok: true,
			message: 'Link reset password akan dikirimkan ke Email'
		};
	}
};
