import { db } from '$lib/db';

export type CreateStoreParams = {
	memberId: string;
	name: string;
	description: string;
	email: string;
	phone: string;
	domain: string;
};

export type UpdateStoreParams = {
	memberId: string;
	name: string;
	description?: string;
	email: string;
	phone: string;
	theme: string;
	color: string;
	logo?: string;
};

export type UpdateStoreInfoParams = {
	memberId: string;
	tiktok?: string;
	fb?: string;
	ig?: string;
	twitter?: string;
	telegram?: string;
};

export type SetFeeDefaultParams = {
	memberId: string;
	amount?: number;
};

export type SetFeeParams = {
	memberId: string;
	product?: string;
	amount?: number;
};

export async function getStoreByMember(memberId: string) {
	const res = await db.query(
		'select * from mt_store s left join mt_store_info msi on msi.id_store = s.id where id_member = $1',
		[memberId]
	);
	return res?.rows[0] ?? null;
}

export async function createStore(data: CreateStoreParams) {
	try {
		const res = await db.query(
			'insert into mt_store (id_member, name, description, email, phone, domain) values ($1, $2, $3, $4, $5, $6) returning id',
			[data.memberId, data.name, data.description, data.email, data.phone, data.domain]
		);

		if (res && res?.rows.length > 0) {
			await db.query('insert into mt_fee set id_member = $1, fee_member = 300', [data.memberId]);
		}

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);
		if (error.code == 23505) {
			return {
				error: 'Domain sudah terdaftar',
				data: null
			};
		}

		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function updateStore(params: UpdateStoreParams) {
	try {
		const queryParams = [
			params.memberId,
			params.name,
			params.description,
			params.email,
			params.phone,
			params.theme,
			params.color
		];

		let setLogo = '';
		if (params.logo) {
			setLogo = ', logo = $8';
			queryParams.push(params.logo);
		}

		const query = `update mt_store set name = $2, description = $3, email = $4, phone = $5, theme = $6, color = $7 ${setLogo} where id_member = $1 returning id`;
		const res = await db.query(query, queryParams);
		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error) {
		console.log(error);
		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function updateStoreInfo(params: UpdateStoreInfoParams) {
	try {
		const store = await db.query('select id from mt_store where id_member = $1', [params.memberId]);
		const storeId = store?.rows[0].id;

		let result;
		result = await db.query(
			`update mt_store_info set tiktok = $2, fb = $3, ig = $4, twitter = $5, telegram = $6 where id_store = $1 returning id;`,
			[storeId, params.tiktok, params.fb, params.ig, params.twitter, params.telegram]
		);
		if (!result?.rows || result?.rows.length <= 0) {
			result = await db.query(
				`insert into mt_store_info (id_store, tiktok, fb, ig, twitter, telegram) values ($1, $2, $3, $4, $5, $6);`,
				[storeId, params.tiktok, params.fb, params.ig, params.twitter, params.telegram]
			);
		}

		return {
			error: null,
			data: result?.rows[0] ?? null
		};
	} catch (error) {
		console.log(error);
		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function getStoreByDomain(host: string) {
	if (host == 'localhost') {
		host = 'www.kingplay.id';
	}

	const res = await db.query(
		'select * from mt_store ms left join mt_store_info msi on msi.id_store = ms.id where domain = $1 or custom_domain = $1 limit 1',
		[host]
	);
	return res?.rows[0] ?? null;
}

export async function getAllProduct() {
	const res = await db.query(
		'select mp.id_produk, mp.produk, mp.hpp, mgp.nama_group_produk from mt_produk mp left join mt_group_produk mgp on mgp.id_group_produk = mp.id_group_produk order by nama_group_produk asc, hpp asc, produk asc',
		[]
	);
	return res?.rows ?? [];
}

export async function getAllGroupProduct() {
	const res = await db.query(
		'select mgp.id_group_produk, mgp.nama_group_produk from mt_group_produk mgp order by nama_group_produk asc',
		[]
	);
	return res?.rows ?? [];
}

export async function getMemberFees(memberId: string) {
	const resFee = await db.query(`select mf.fee_member from mt_fee mf where mf.id_member = $1`, [
		memberId
	]);

	const resFeeCustom = await db.query(
		`select mfc.*, mp.produk, mgp.nama_group_produk from mt_fee_custom mfc 
			left join mt_produk mp on mp.id_produk = mfc.id_produk 
			left join mt_group_produk mgp on mgp.id_group_produk = mp.id_group_produk 
		where mfc.id_member = $1`,
		[memberId]
	);
	return {
		defaultFee: resFee?.rows[0]?.fee_member ?? 0,
		fees: resFeeCustom?.rows ?? []
	};
}

export async function setFeeDefault(params: SetFeeDefaultParams) {
	try {
		let result;
		result = await db.query(
			`update mt_fee set fee_member = $2 where id_member = $1 returning id_member;`,
			[params.memberId, params.amount]
		);
		if (!result?.rows || result?.rows.length <= 0) {
			result = await db.query(
				`insert into mt_fee (id_member, fee_member) values ($1, $2) returning id_member;`,
				[params.memberId, params.amount]
			);
		}

		return {
			error: null,
			data: result?.rows[0] ?? null
		};
	} catch (error) {
		console.log(error);
		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function setFee(params: SetFeeParams) {
	try {
		let result;
		result = await db.query(
			`update mt_fee_custom set fee_member = $3 where id_member = $1 and id_produk = $2 returning id_member;`,
			[params.memberId, params.product, params.amount]
		);
		if (!result?.rows || result?.rows.length <= 0) {
			result = await db.query(
				`insert into mt_fee_custom (id_member, id_produk, fee_member) values ($1, $2, $3) returning id_member;`,
				[params.memberId, params.product, params.amount]
			);
		}

		return {
			error: null,
			data: result?.rows[0] ?? null
		};
	} catch (error) {
		console.log(error);
		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function deleteFee(memberId: string, productId: string) {
	const res = await db.query('delete from mt_fee_custom where id_member = $1 and id_produk = $2', [
		memberId,
		productId
	]);
}
