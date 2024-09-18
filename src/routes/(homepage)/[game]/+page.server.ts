import type { PageServerLoad } from './$types';

import type { Game, PaymentChannelGroup, Product } from '../type';

export const load: PageServerLoad = async () => {
	let game: Game = {
		id: 1,
		slug: 'mobile-legends',
		name: 'Mobile Legends',
		image:
			'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
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

	let channels: PaymentChannelGroup[] = [
		{
			id: 1,
			label: 'E-Wallet',
			type: 'EWALLET',
			channels: [
				{
					id: 1,
					code: 'SHOPEE',
					image: 'https://storage.googleapis.com/tokogame-img/payment-provider/logo-shopeepay.png',
					name: 'Shopee',
					price: 2000
				},
				{
					id: 2,
					code: 'GOPAY',
					image: 'https://storage.googleapis.com/tokogame-img/payment-provider/logo-gopay.png',
					name: 'Gopay',
					price: 2500
				}
			],
			images: [
				'https://storage.googleapis.com/tokogame-img/payment-provider/logo-shopeepay.png',
				'https://storage.googleapis.com/tokogame-img/payment-provider/logo-gopay.png'
			]
		},
		{
			id: 2,
			label: 'Transfer Bank',
			type: 'BANK',
			channels: [
				{
					id: 3,
					code: 'BCA',
					image: 'https://storage.googleapis.com/tokogame-img/payment-provider/logo-bca.png',
					name: 'BCA',
					price: 4200
				}
			],
			images: ['https://storage.googleapis.com/tokogame-img/payment-provider/logo-bca.png']
		}
	];

	return {
		game,
		products,
		channels
	};
};
