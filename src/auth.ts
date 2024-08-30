import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';

import { db } from '$lib/db';
import { CustomAdapter } from '$lib/auth/adapter';
import { User } from '$lib/models/user';

export const { handle, signIn } = SvelteKitAuth({
	adapter: CustomAdapter(db),
	providers: [
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials) => {
				let user = null;
				try {
					user = await User.getUserByEmail(credentials.email as string);

					if (!user) {
						throw new Error('	User not found.');
					}

					if (!bcrypt.compareSync(`${credentials.password}`, user.password)) {
						throw new Error('Password salah');
					}

					return {
						id: user.id_member,
						name: user.name,
						email: user.email,
						image: user.image
					};
				} catch (error) {
					console.log(error);
					return null;
				}
			}
		})
	],
	pages: { signIn: '/auth/login', error: '/auth/login' },
	debug: true
});
