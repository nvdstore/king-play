import { db } from '$lib/db';
import { format } from 'date-fns';

export type GetTransactionMemberType = {
	idMember: string;
	startDate: Date;
	endDate: Date;
	status: 'all' | 'waiting' | 'pending' | 'completed' | 'cancel' | 'fail';
	limit: number;
	offset: number;
};

export const Store = {
	getTransactionMember: async (params: GetTransactionMemberType) => {
		const startDate = format(params.startDate ?? new Date(), 'yyyy-MM-dd');
		const endDate = format(params.endDate ?? new Date(), 'yyyy-MM-dd');

		const whereStatus = params.status != 'all' ? '' : '';

		const query = `select t.id_transaksi, t.id_member, t.id_invoice, t.nominal, t.transaction_date, mgp.nama_group_produk, mp.produk 
    from transaksi t
    left join mt_produk mp on mp.id_produk = t.id_produk 
    left join mt_group_produk mgp on mgp.id_group_produk = mp.id_group_produk
    where id_member = $1 where transaction_date between $2 and $3  
    order by 1 desc limit $4 offset $5`;
		const result = await db.query({
			text: query,
			values: [params.idMember, startDate, endDate, params.limit, params.offset]
		});
	}
};
