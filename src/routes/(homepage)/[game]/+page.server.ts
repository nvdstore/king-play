import { error, type Actions } from '@sveltejs/kit';

import type { Game, PaymentChannel, PaymentChannelGroup, Product } from '$lib/type';
import { getGameField, getGameGroupBySlug, getPaymentChannels } from '$lib/models/game';
import { groupingPaymentChannel } from '$lib/utils/helper';
import { request, generateMid } from '$lib/request';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params, url, setHeaders }) => {
	const productId = url.searchParams.get('product')?.toString() ?? '';

	const group = await getGameGroupBySlug(params.game);
	if (!group || !group.id_group_produk) {
		error(404);
	}

	const game: Game = {
		id: group.id_group_produk,
		slug: group?.slug ?? '',
		name: group.nama_group_produk,
		image: group.img,
		fields: [],
		itemImg: group.item_img,
		itemName: group.item_name,
		tipeGroup: group.tipe_group
	};

	const fields = await getGameField(group.id_group_produk);
	game.fields = fields.map((fld: any) => ({
		key: fld.field_name,
		title: fld.field_title,
		target: fld.field_target,
		placeholder: fld.field_placeholder,
		options: fld.field_options ?? [],
		type: fld.field_type,
		required: fld.is_required ?? false
	}));

	const userId = cookies.get('uuid') ?? '';

	const { data: dataProducts } = await request({
		method: 'POST',
		endpoint: '/v1.0/api/produk/list-produk',
		payload: { id_group_produk: game.id.toString() },
		uuid: userId
	});

	const products: Product[] = dataProducts?.map((product: any) => ({
		id: product.id_produk,
		name: product.produk,
		price: product.nominal,
		icon: '',
		status: product.status
	}));

	let channels: PaymentChannelGroup[] = [];
	let selectedProduct: Product | null = null;

	let dataChannels = [];
	if (productId) {
		const mid = generateMid();
		const { data: resChannels } = await request({
			method: 'POST',
			endpoint: '/v1.0/api/invoices/channel',
			payload: { mid, id_produk: productId, id_user: userId },
			uuid: userId
		});

		dataChannels = resChannels ?? [];

		selectedProduct = products.find((val) => val.id == productId) ?? null;
	} else {
		dataChannels = await getPaymentChannels();
	}

	channels = groupingPaymentChannel(dataChannels);

	return {
		game,
		products,
		selectedProduct,
		channels
	};
};

export const actions: Actions = {
	default: async ({ request: req, cookies }) => {
		const formData = await req.formData();
		const product = formData.get('product');
		const idpel1 = formData.get('id_pelanggan_1');
		const idpel2 = formData.get('id_pelanggan_2');
		const email = formData.get('email');
		const channel = formData.get('channel');

		console.log(`email ${email}`);

		const mid = generateMid();
		const userId = cookies.get('uuid') ?? '';

		const inquiry = await request({
			method: 'POST',
			endpoint: '/v1.0/api/inquiry/',
			payload: {
				mid,
				step: 2,
				data: {
					id_produk: product,
					id_user: userId,
					id_pelanggan1: idpel1 ?? '',
					id_pelanggan2: idpel2 ?? '',
					id_pelanggan3: '',
					email: email
				}
			},
			uuid: userId
		});

		const inqAdditional = inquiry?.additional;
		const idInquiry = inqAdditional?.response_transaction_detail?.id_transaksi_inquiry;
		if (inquiry.code != '00' || !inquiry.data || !idInquiry) {
			// inquiry gagal kembalikan response
			return inquiry;
		}

		// TODO: lanjut create invoice
		const invoice = await request({
			method: 'POST',
			endpoint: '/v1.0/api/invoices/',
			payload: {
				mid,
				step: 2,
				data: {
					id_produk: product,
					id_user: userId,
					id_pelanggan1: idpel1 ?? '',
					id_pelanggan2: idpel2 ?? '',
					id_pelanggan3: '',
					email: email,
					phone: ''
				},
				invoice_detail: {
					id_channel_pembayaran: channel,
					id_transaksi_inquiry: idInquiry
				}
			},
			uuid: userId
		});

		return invoice;
	}
};
