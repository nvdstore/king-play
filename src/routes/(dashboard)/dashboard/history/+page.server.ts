import { format } from 'date-fns';
import { getTransactions } from '$lib/models/transactions';
import type { Transcation } from '$lib/type';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth();

	const defaultLimit = 10;
	const startDate = url.searchParams.get('start')
		? new Date(url.searchParams.get('start')?.toString()!)
		: new Date();
	const endDate = url.searchParams.get('end')
		? new Date(url.searchParams.get('end')?.toString()!)
		: new Date();
	const status = url.searchParams.get('status') ?? 'all';
	const search = url.searchParams.get('search') ?? '';
	const limit = url.searchParams.get('limit')
		? Number(url.searchParams.get('limit'))
		: defaultLimit;
	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;

	const { count, data: transactions } = await getTransactions({
		idMember: session?.user?.id?.toString()!,
		startDate,
		endDate,
		limit: limit,
		offset: page * limit,
		search,
		status: status as any
	});

	return {
		transactions,
		count,
		defaultLimit
	};
};
