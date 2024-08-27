import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

import { db } from '$lib/db';
import { CustomAdapter } from '$lib/adapter';

export const { handle, signIn } = SvelteKitAuth({
	adapter: CustomAdapter(db),
	providers: [Google],
	debug: true
});
