import { startOfMonth } from 'date-fns';

import { getAllGroupProduct } from '$lib/models/store';
import { getReportTransactions } from '$lib/models/transactions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
	const { user } = await parent();

	const defaultLimit = 10;
	const startDate = url.searchParams.get('start')
		? new Date(url.searchParams.get('start')?.toString()!)
		: startOfMonth(new Date());
	const endDate = url.searchParams.get('end')
		? new Date(url.searchParams.get('end')?.toString()!)
		: new Date();
	const product = url.searchParams.get('product') ?? 'all';
	const limit = url.searchParams.get('limit')
		? Number(url.searchParams.get('limit'))
		: defaultLimit;
	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;

	const { data } = await getReportTransactions({
		idMember: user?.idMember.toString()!,
		startDate,
		endDate,
		product,
		limit: limit,
		offset: (page - 1) * limit
	});

	const products = await getAllGroupProduct();

	return {
		report: data,
		products,
		defaultLimit
	};
};
