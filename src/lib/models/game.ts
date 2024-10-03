import { db } from '$lib/db';

export async function getGroupById(idGroupProduk: string) {
	const res = await db.query('select * from mt_group_produk where id_group_produk = $1', [
		idGroupProduk
	]);
	return res?.rows[0] ?? null;
}

export async function getGameGroupBySlug(slug: string) {
	const res = await db.query('select * from mt_group_produk mgp where slug = $1 limit 1', [slug]);
	return res?.rows[0] ?? null;
}

export async function getGameField(groupId: string) {
	const res = await db.query(
		'select * from mt_fields mf where id_group_produk = $1 and is_active = true order by field_order asc',
		[groupId]
	);
	return res?.rows ?? [];
}

export async function getPaymentChannels() {
	const res = await db.query('select * from mt_channel_pembayaran', []);
	return res?.rows ?? [];
}
