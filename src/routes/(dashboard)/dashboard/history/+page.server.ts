import { format } from 'date-fns';
import { Transaction, type Transcation } from '$lib/models/transactions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth();
	const startDate = url.searchParams.get('start')
		? new Date(url.searchParams.get('start')?.toString()!)
		: new Date();
	const endDate = url.searchParams.get('end')
		? new Date(url.searchParams.get('end')?.toString()!)
		: new Date();
	const status = url.searchParams.get('status') ?? 'all';
	const search = url.searchParams.get('search') ?? 'all';
	const limit = url.searchParams.get('limit') ?? '25';
	const page = url.searchParams.get('page') ?? '0';

	const { count, data: trxs } = await Transaction.getTransactionMember({
		idMember: session?.user?.id?.toString()!,
		startDate,
		endDate,
		limit: Number(limit),
		offset: Number(page)
	});

	const transactions: Transcation[] = trxs.map((trx) => ({
		idTransaksi: trx.id_transaksi,
		idMember: trx.id_member,
		idInvoice: trx.id_invoice,
		groupProduk: trx.nama_group_produk,
		produk: trx.produk,
		nominal: trx.nominal,
		tanggal: format(trx.transaction_date, 'yyyy-MM-dd')
	}));

	return {
		transactions,
		count
	};
};
