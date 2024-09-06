import { CredentialsSignin, SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';

import { db } from '$lib/db';
import { CustomAdapter } from '$lib/auth/adapter';
import { User } from '$lib/models/user';

class InvalidInput extends CredentialsSignin {
	code = 'bad-request';
}

class InvalidCredentials extends CredentialsSignin {
	code = 'credentials';
}

export const { handle, signIn } = SvelteKitAuth({
	adapter: CustomAdapter(db),
	providers: [
		Google,
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

				const user = await User.getUserByEmail(credentials.email as string);

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
	callbacks: {},
	debug: true
});
