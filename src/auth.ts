import PostgresAdapter from '@auth/pg-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

import { db } from '$lib/db';

export const { handle, signIn } = SvelteKitAuth({
	adapter: PostgresAdapter(db),
	providers: [Google],
	debug: true
});
