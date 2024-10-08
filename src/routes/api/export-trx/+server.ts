import { getTransactions } from '$lib/models/transactions';
import { xslsxBuffer } from '$lib/excel';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth();

	const startDate = url.searchParams.get('start')
		? new Date(url.searchParams.get('start')?.toString()!)
		: new Date();
	const endDate = url.searchParams.get('end')
		? new Date(url.searchParams.get('end')?.toString()!)
		: new Date();

	const { data: transactions } = await getTransactions({
		idMember: session?.user?.id!,
		startDate,
		endDate,
		limit: 100
	});

	const xlsxBuff = xslsxBuffer(transactions);

	return new Response(xlsxBuff, {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename="example.xslsx"'
		}
	});
};
