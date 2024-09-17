import type { PageServerLoad } from './$types';

import type { Game, Product } from '../type';

export const load: PageServerLoad = async () => {
	let game: Game = {
		id: 1,
		slug: 'honor-of-kings',
		name: 'Honor of Kings',
		image:
			'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/37/63/db376320-c37b-c8c8-05bc-578ace590ad8/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
	};

	let products: Product[] = [
		{
			id: 1,
			name: '3 Diamonds',
			price: 7000
		},
		{
			id: 2,
			name: '3 Diamonds',
			price: 7000
		},
		{
			id: 3,
			name: '3 Diamonds',
			price: 7000
		},
		{
			id: 4,
			name: '3 Diamonds',
			price: 7000
		}
	];

	return {
		game,
		products
	};
};
