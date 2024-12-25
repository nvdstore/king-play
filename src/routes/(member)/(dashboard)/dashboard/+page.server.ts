import { getResumeTrx, getTransactions } from '$lib/models/transactions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	const limit = 25;
	const page = 0;

	const { count, data: transactions } = await getTransactions({
		idMember: session?.user?.id?.toString()!,
		startDate: new Date(),
		endDate: new Date(),
		limit,
		offset: limit * page
	});

	const resume = await getResumeTrx(session?.user?.id!);

	return {
		transactions,
		total: count,
		limit,
		resume
	};
};
