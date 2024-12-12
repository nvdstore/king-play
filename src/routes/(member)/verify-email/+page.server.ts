import type { Actions } from '@sveltejs/kit';
import { addMinutes } from 'date-fns';

import { getCurrentToken, createEmailToken, sendEmail } from '$lib/models/email';
import { themes } from '$lib/themes';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const session = await locals.auth();
	const { user } = await parent();

	const color = 'blue';
	const theme = themes['light'];

	let nextRetryAt: Date | null = null;
	const checkToken = await getCurrentToken(user?.idMember!);
	if (checkToken?.token) {
		const createdAt = checkToken?.created_at;
		if (createdAt > new Date()) {
			nextRetryAt = addMinutes(createdAt, 1);
		}
	}

	if (nextRetryAt == null) {
		requestSendEmail(session);
		nextRetryAt = addMinutes(new Date(), 1);
	}

	return {
		color,
		theme,
		user,
		nextRetryAt
	};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth();

		requestSendEmail(session);
	}
};

async function requestSendEmail(session: any) {
	const email = session?.user?.email;
	if (email) {
		const token = await createEmailToken(session.user?.id!);
		if (!token) {
			return null;
		}

		const body = `<p>Klik link dibawah untuk melakukan verifikasi.</p><br/><a>https://kingplay.id/verify?token=${token}</a>`;

		await sendEmail({
			name: session.user?.name!,
			from: 'no-reply@kingplay.id',
			to: email,
			subject: 'Verifikasi Email',
			body,
			modul: 'verif'
		});
	}
}
