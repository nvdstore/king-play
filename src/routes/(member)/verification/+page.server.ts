import { addDays } from 'date-fns';

import { getEmailToken, updateEmailToken } from '$lib/models/email';
import type { PageServerLoad } from './$types';
import { updateEmailVerified } from '$lib/models/user';

export const load: PageServerLoad = async (events) => {
	const token = events.url.searchParams.get('token')?.toString() ?? '';

	let ok = false;
	if (!token) {
		ok = false;
	}

	const result = await getEmailToken(token);
	const idMember = result?.user_id;
	if (!idMember) {
		ok = false;
	} else {
		const expiredAt = addDays(result?.created_at, 1);
		if (expiredAt < new Date()) {
			ok = false;
		}

		await updateEmailToken(idMember, token);

		// TODO: update mt_member
		const resUpdate = await updateEmailVerified(idMember);
		if (resUpdate) {
			ok = true;
		}
	}

	return { ok };
};
