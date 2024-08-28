import { db } from '$lib/db';

export type CreateStoreParams = {
	memberId: string;
	name: string;
	description: string;
	email: string;
	phone: string;
};

export const Store = {
	getStoreByMember: async (memberId: string) => {
		const res = await db.query('select * from mt_store where id_member = $1', [memberId]);
		return res.rows[0] ?? null;
	},
	createStore: async (data: CreateStoreParams) => {
		const res = await db.query(
			'insert into mt_store (id_member, name, description, email, phone) values ($1, $2, $3, $4, $5) returning id',
			[data.memberId, data.name, data.description, data.email, data.phone]
		);
		return res.rows[0] ?? null;
	}
};
