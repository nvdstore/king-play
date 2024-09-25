import type { PageServerLoad } from './$types';
import { request } from '$lib/request';

import type { Game, PaymentChannelGroup, Product } from '$lib/type';
import { getGroupBySlug } from '$lib/models/game';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const group = await getGroupBySlug(params.game);
	const game: Game = {
		id: group.id_group_produk,
		slug: group?.slug ?? '',
		name: group.nama_group_produk,
		image: group.img
	};

	const { data } = await request({
		method: 'POST',
		endpoint: '/v1.0/api/produk/list-produk',
		payload: { id_group_produk: game.id.toString() },
		uuid: cookies.get('uuid') ?? ''
	});

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
					price: 2000,
					helper: '<ul><li>Step 1</li><li>Step 2</li></ul>'
				},
				{
					id: 2,
					code: 'GOPAY',
					image: 'https://storage.googleapis.com/tokogame-img/payment-provider/logo-gopay.png',
					name: 'Gopay',
					price: 2500,
					helper: '<ul><li>Step 1</li><li>Step 2</li></ul>'
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
					price: 4200,
					helper: '<ul><li>Step 1</li><li>Step 2</li></ul>'
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
