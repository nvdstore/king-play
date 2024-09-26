import { format } from 'date-fns';
import { getTransactionMember } from '$lib/models/transactions';
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

	const { count, data: trxs } = await getTransactionMember({
		idMember: session?.user?.id?.toString()!,
		startDate,
		endDate,
		limit: limit,
		offset: page * limit,
		search,
		status: status as any
	});

	const transactions: Transcation[] = trxs.map((trx) => {
		const statusTrx = trx.response_code;
		const statusInvoice = trx.status;
		const flagInvoice = trx.flag;

		let status = 'waiting';
		if (statusInvoice == 2 && flagInvoice == 1) {
			if (statusTrx == '00') {
				status = 'success';
			} else {
				status = 'pending';
			}
		}

		return {
			idTransaksi: trx.id_transaksi,
			idMember: trx.id_member,
			idInvoice: trx.id_invoice,
			groupProduk: trx.nama_group_produk,
			produk: trx.produk,
			nominal: trx.nominal,
			tanggal: format(trx.transaction_date, 'yyyy-MM-dd'),
			status
		};
	});

	return {
		transactions,
		count,
		defaultLimit
	};
};
