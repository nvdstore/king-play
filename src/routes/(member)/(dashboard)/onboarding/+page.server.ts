import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { checkDomain, validateEmail } from '$lib/utils/validator';
import { createStore, type CreateStoreParams } from '$lib/models/store';
import { db } from '$lib/db';

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth();
		const body = await request.formData();

		const name = body.get('name')?.toString();
		const desc = body.get('desc')?.toString();
		const email = body.get('email')?.toString();
		const phone = body.get('phone')?.toString();
		const domain = body.get('domain')?.toString();
		const domainType = body.get('domain-type')?.toString();

		let errorBag: Record<string, string> = {};
		let valueBag = {
			name,
			desc,
			email,
			phone,
			domain,
			domainType
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
			errorBag.phone = 'Nomor handphone harus diisi';
		}
		if (!domain || !domain) {
			errorBag.domain = 'Domain harus diisi';
		}
		const subdomain = `${domain}${domainType}`;
		if (!checkDomain(subdomain)) {
			errorBag.domain = 'Format Domain salah';
		}

		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag };
		}

		const storeData: CreateStoreParams = {
			memberId: session?.user?.id!,
			name: name!,
			description: desc ?? '',
			email: email!,
			phone: phone!,
			domain: subdomain
		};
		const { error, data } = await createStore(storeData);
		if (error) {
			errorBag.message = error ?? 'Terjadi kesalahan';
			return { errors: errorBag, values: valueBag };
		}

		if (data) {
			try {
				await db.query('insert into mt_fee (id_member, fee_member) values ($1, 300)', [
					session?.user?.id
				]);
			} catch (error) {
				console.log(error);
			}
		}

		return redirect(307, '/dashboard');
	}
} satisfies Actions;
