import { Transaction } from '$lib/models/transactions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	const trxs = await Transaction.getTransactionMember({
		idMember: session?.user?.id?.toString()!,
		startDate: new Date(),
		endDate: new Date(),
		limit: 10,
		offset: 0
	});

	console.log(trxs);
};
