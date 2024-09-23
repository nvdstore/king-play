import { db } from '$lib/db';

export async function getGroupById(idGroupProduk: string) {
	const res = await db.query('select * from mt_group_produk where id_group_produk = $1', [
		idGroupProduk
	]);
	return res.rows[0] ?? null;
}
