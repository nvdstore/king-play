import { getUserById, updatePassword, updateUser } from '$lib/models/user';
import { validateEmail, validatePassword } from '$lib/utils/validator';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const check = await getUserById(user?.idMember!);

	return {
		haspass: check?.password != ''
	};
};

export const actions = {
	user: async ({ locals, request }) => {
		const session = await locals.auth();
		const frmData = await request.formData();

		const name = frmData.get('user-name')?.toString() ?? '';
		const email = frmData.get('user-email')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = { name, email };

		if (!name) {
			errorBag.name = 'Nama harus diisi';
		}
		if (!email) {
			errorBag.email = 'Email harus diisi';
		} else if (!validateEmail(email)) {
			errorBag.email = 'Format email salah';
		}

		if (Object.keys(errorBag).length) {
			return { user: { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' } };
		}

		const { data, error } = await updateUser({
			idMember: session?.user?.id!,
			name,
			email
		});

		if (error) {
			errorBag.email = error;

			return {
				user: {
					errors: errorBag,
					values: valueBag,
					message: error ?? 'Terjadi kesalahan saat menyimpan data'
				}
			};
		}

		return { user: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
	},
	password: async ({ locals, request }) => {
		const session = await locals.auth();
		const check = await getUserById(session?.user?.id!);
		const hasspass = check?.password != '';

		const frmData = await request.formData();

		const currpas = frmData.get('user-password')?.toString() ?? '';
		const newpass = frmData.get('user-newpass')?.toString() ?? '';
		const confirmpass = frmData.get('user-confirmpass')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = { currpas, newpass, confirmpass };

		if (hasspass && !currpas) {
			errorBag.currpass = 'Masukkan password Anda.';
		} else if (hasspass && !validatePassword(currpas)) {
			errorBag.newpass = 'Format password salah';
		}
		if (!newpass) {
			errorBag.newpass = 'Masukkan password baru Anda';
		} else if (!validatePassword(newpass)) {
			errorBag.newpass = 'Format password salah';
		}
		if (!confirmpass) {
			errorBag.confirmpass = 'Masukkan konfirmasi password baru Anda';
		} else if (newpass != confirmpass) {
			errorBag.confirmpass = 'Konfirmasi password tidak sesuai';
		}

		if (Object.keys(errorBag).length) {
			return { password: { errors: errorBag, values: valueBag, message: 'Terjadi kesalahan' } };
		}

		const { data, error } = await updatePassword({
			idMember: session?.user?.id!,
			password: newpass
		});

		if (error) {
			return {
				password: {
					errors: errorBag,
					values: valueBag,
					message: error ?? 'Terjadi kesalahan saat menyimpan data'
				}
			};
		}

		return { password: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
	}
} satisfies Actions;
