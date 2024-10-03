import { db } from '$lib/db';
import bcrypt from 'bcrypt';

export type CreateUserParams = {
	name: string;
	email: string;
	emailVerified: Date | null;
	password?: string;
	image?: string;
};

export type UpdateUserParams = {
	idMember: string;
	name: string;
	email: string;
};

export type UpdatePasswordParams = {
	idMember: string;
	password: string;
};

export type CreateSessionParams = {
	userId: string;
	expires: Date;
	sessionToken: string;
	type?: string;
	host?: string;
	ip?: string;
	deviceInfo?: string;
};

export async function getUserById(id: string) {
	const res = await db.query('select * from mt_member where id_member = $1', [id]);
	return res?.rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
	const res = await db.query('select * from mt_member where email = $1', [email]);
	return res?.rows[0] ?? null;
}

export async function createUser(params: CreateUserParams) {
	try {
		const res = await db.query(
			'insert into mt_member (email, email_verified, password, name, image) values ($1, $2, $3, $4, $5) returning id_member',
			[params.email, params.emailVerified, params.password ?? '', params.name, params.image]
		);

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);
		if (error.code == 23505) {
			return {
				error: 'Email sudah terdaftar',
				data: null
			};
		}

		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		let needVerify = false;
		const user = await db.query('select email from mt_member where id_member = $1', [
			params.idMember
		]);
		if (!user) throw new Error('User tidak ditemukan');

		if (user.rows[0]?.email != params.email) {
			needVerify = true;
		}

		const res = await db.query(
			`update mt_member set name = $2, email = $3 ${needVerify ? ', email_verified = null' : ''} where id_member = $1 returning id_member`,
			[params.idMember, params.name, params.email]
		);

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);
		if (error.code == 23505) {
			return {
				error: 'Email sudah terdaftar',
				data: null
			};
		}

		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function updatePassword(params: UpdatePasswordParams) {
	try {
		const hashPassword = bcrypt.hashSync(params.password, 10);

		const res = await db.query(
			`update mt_member set password = $2 where id_member = $1 returning id_member`,
			[params.idMember, hashPassword]
		);

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);

		return {
			error: error?.message,
			data: null
		};
	}
}

export async function createSession(params: CreateSessionParams) {
	try {
		const res = await db.query(
			'insert into sessions (user_id, expires, session_token, type, ip, device_info, host) values ($1, $2, $3, $4, $5, $6, $7)',
			[
				params.userId,
				params.expires,
				params.sessionToken,
				params.type,
				params.ip,
				params.deviceInfo,
				params.host
			]
		);

		return {
			error: null,
			data: res?.rows[0] ?? null
		};
	} catch (error: any) {
		console.log(error);
		return {
			error: 'Terjadi kesalahan',
			data: null
		};
	}
}

export async function getAccountByProvider(providerAccountId: string, provider: string) {
	const res = await db.query(
		'select * from accounts a left join mt_member mm on mm.id_member = a.user_id where provider_account_id = $1 and provider = $2',
		[providerAccountId, provider]
	);
	return res?.rows[0] ?? null;
}
