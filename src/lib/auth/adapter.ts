import type { Adapter, AdapterSession } from '@auth/core/adapters';
import type { Pool } from 'pg';

import { User, type CreateUserParams } from '$lib/models/user';

export function CustomAdapter(db: Pool): Adapter {
	return {
		createUser: async ({ id: _id, ...data }) => {
			const payload: CreateUserParams = {
				name: data.name!,
				email: data.email,
				emailVerified: data.emailVerified,
				image: data.image!
			};
			const { data: userData } = await User.createUser(payload);

			return {
				id: userData.id_member,
				email: data.email,
				name: data.name,
				image: data.image,
				emailVerified: data.emailVerified
			};
		},
		getUser: async (id) => {
			const row = await User.getUserById(id);
			if (row) {
				return {
					id: row.id_member,
					name: row.name,
					email: row.email,
					emailVerified: row.email_verified,
					image: row.image
				};
			}

			return null;
		},
		getUserByEmail: async (email) => {
			const user = await User.getUserByEmail(email);
			if (user) {
				return {
					id: user.id_member,
					name: user.name,
					email: user.email,
					emailVerified: user.email_verified,
					image: user.image
				};
			}

			return null;
		},
		getUserByAccount: async ({ providerAccountId, provider }) => {
			const user = await User.getAccountByProvider(providerAccountId, provider);
			if (user) {
				return {
					id: user.id_member,
					name: user.name,
					email: user.email,
					emailVerified: user.email_verified,
					image: user.image
				};
			}

			return null;
		},
		updateUser: async ({ id, ...data }) => {
			const res = await db.query('update mt_member set email = $1, name = $2, image = $3', [
				data.email,
				data.name,
				data.image
			]);
			const row = res.rows[0];
			return {
				id: row.id_member,
				name: row.name,
				email: row.email,
				emailVerified: row.email_verified,
				image: row.image
			};
		},
		deleteUser: async (id) => {
			await db.query('delete mt_member where id_member = $1', [id]);
		},
		linkAccount: async (data) => {
			await db.query(
				`insert into accounts 
        (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, id_token, scope, token_type)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
				[
					data.userId,
					data.type,
					data.provider,
					data.providerAccountId,
					data.refresh_token,
					data.access_token,
					data.expires_at,
					data.id_token,
					data.scope,
					data.token_type
				]
			);
		},
		unlinkAccount: async (providerAccountId) => {
			await db.query('delete from accounts where provider_account_id = $1', [providerAccountId]);
		},
		getSessionAndUser: async (sessionToken) => {
			const res = await db.query(
				'select * from sessions s left join mt_member mm on mm.id_member = s.user_id where session_token = $1',
				[sessionToken]
			);
			const row = res.rows[0];
			if (!row) return null;

			return {
				user: {
					id: row.id_member,
					name: row.name,
					email: row.email,
					emailVerified: row.email_verified,
					image: row.image
				},
				session: {
					sessionToken: row.session_token,
					expires: row.expires,
					userId: row.user_id
				}
			};
		},
		createSession: async (data) => {
			await User.createSession(data);

			return {
				userId: data.userId,
				expires: data.expires,
				sessionToken: data.sessionToken
			};
		},
		updateSession: async (data) => {
			await db.query('update sessions set user_id expires = $3 where session_token = $1', [
				data.sessionToken,
				data.userId,
				data.expires
			]);

			return {
				userId: data.userId,
				expires: data.expires,
				sessionToken: data.sessionToken
			} as AdapterSession;
		},
		deleteSession: async (sessionToken) => {
			await db.query('delete from sessions where session_token = $1', [sessionToken]);
		},
		createVerificationToken: async (data) => {
			const res = await db.query(
				'insert into verification_token (identifier, expires, token) values ($1, $2, $3)',
				[data.identifier, data.expires, data.token]
			);

			return {
				identifier: data.identifier,
				expires: data.expires,
				token: data.token
			};
		},
		useVerificationToken: async (identifier_token) => {
			await db.query('delete from verification_token where token = $1', [identifier_token]);
			return null;
		},
		getAccount: async (providerAccountId, provider) => {
			const res = await db.query(
				'select * from accounts where provider_account_id = $1 and provider = $3',
				[providerAccountId, provider]
			);
			const row = res.rows[0];

			return {
				provider: row.provider,
				providerAccountId: row.provider_account_id,
				type: row.type,
				userId: row.user_id,
				access_token: row.access_token,
				expires_at: row.expires_at,
				expires_in: row.expires_in,
				id_token: row.id_token,
				refresh_token: row.refresh_token,
				scope: row.scope,
				token_type: row.token_type
			};
		}
	};
}
