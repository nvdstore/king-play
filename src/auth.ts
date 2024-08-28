import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';

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

				// logic to verify if user exists
				user = User.getUserByEmail(credentials.email as string);

				if (!user) {
					throw new Error('User not found.');
				}

				// if ()

				// return JSON object with the user data
				return user;
			}
		})
	],
	pages: { signIn: '/auth/login', error: '/auth/login' }
});
