import { CredentialsSignin, SvelteKitAuth } from '@auth/sveltekit';
import { encode, decode } from '@auth/core/jwt';
import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';

import { db } from '$lib/db';
import { CustomAdapter } from '$lib/auth/adapter';
import { createSession, getUserByEmail } from '$lib/models/user';

class InvalidInput extends CredentialsSignin {
	code = 'bad-request';
}

class InvalidCredentials extends CredentialsSignin {
	code = 'credentials';
}

const SESSION_CONFIG = {
	maxAge: 30 * 24 * 60 * 60, // 30 days
	updateAge: 24 * 60 * 60 // 24 hours
};

export const { handle, signIn } = SvelteKitAuth(async ({ request, cookies }) => ({
	adapter: CustomAdapter(db),
	providers: [
		Google({ allowDangerousEmailAccountLinking: true }),
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Kata sandi', type: 'password' }
			},
			authorize: async (credentials) => {
				if (
					credentials.email == 'undefined' ||
					credentials.email == '' ||
					credentials.password == 'undefined' ||
					credentials.password == ''
				) {
					throw new InvalidInput();
				}

				console.log(credentials);

				const user = await getUserByEmail(credentials.email as string);

				if (!user || !bcrypt.compareSync(`${credentials.password}`, user.password)) {
					throw new InvalidCredentials();
				}

				return {
					id: user.id_member,
					name: user.name,
					email: user.email,
					image: user.image
				};
			}
		})
	],
	pages: { signIn: '/auth/login', error: '/auth/login' },
	session: { strategy: 'database', ...SESSION_CONFIG },
	callbacks: {
		async signIn({ user }) {
			if (
				request.url?.includes('callback') &&
				request.url?.includes('credentials') &&
				request.method === 'POST'
			) {
				if (user && 'id' in user) {
					const sessionToken = crypto.randomUUID();
					const sessionExpiry = new Date(Date.now() + SESSION_CONFIG.maxAge * 1000);
					await createSession({
						sessionToken: sessionToken,
						userId: user.id!,
						expires: sessionExpiry
					});
					cookies.set('auth.session-token', sessionToken, {
						path: '/',
						expires: sessionExpiry
					});
				}
			}
			return true;
		},
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token, user }) {
			return session;
		}
	},
	jwt: {
		encode(params) {
			if (
				request.url?.includes('callback') &&
				request.url?.includes('credentials') &&
				request.method === 'POST'
			) {
				const cookie = cookies.get('auth.session-token');
				if (cookie) return cookie;
				else return '';
			}

			return encode(params);
		},
		async decode(params) {
			if (
				request.url?.includes('callback') &&
				request.url?.includes('credentials') &&
				request.method === 'POST'
			) {
				return null;
			}

			return decode(params);
		}
	},
	debug: false,
	trustHost: true
}));
