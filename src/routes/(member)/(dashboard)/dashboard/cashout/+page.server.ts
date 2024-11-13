import type { Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { getPaymentChannels } from '$lib/models/game';
import { getBalance, getHistoryCashout } from '$lib/models/user';
import { groupingPaymentChannel } from '$lib/utils/helper';
import { request, generateMid } from '$lib/request';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	const balance = await getBalance(user?.idMember!);

	const dataChannels = await getPaymentChannels('cashout');
	const channels = groupingPaymentChannel(dataChannels);

	const historyCashout = await getHistoryCashout(user?.idMember!);

	return {
		balance,
		channels,
		historyCashout
	};
};

export const actions: Actions = {
	default: async ({ locals, request: req, cookies }) => {
		const session = await locals.auth();
		console.log(session);
		const user = session?.user;

		const frmData = await req.formData();

		const nominal = frmData.get('nominal')?.toString() ?? '';
		const channel = frmData.get('channel')?.toString() ?? '';
		const idpel = frmData.get('idpel')?.toString() ?? '';
		const password = frmData.get('password')?.toString() ?? '';

		let errorBag: Record<string, string> = {};
		let valueBag = { nominal, channel };

		if (!nominal || Number(nominal) <= 0) {
			errorBag.nominal = 'Nominal harus diisi';
		}
		if (!idpel) {
			errorBag.idpel = 'Nomor rekening harus diisi';
		}
		if (!password) {
			errorBag.password = 'Password harus diisi';
		}
		if (Object.keys(errorBag).length) {
			return { errors: errorBag, values: valueBag, message: 'Input salah' };
		}

		if (!channel || channel == 'undefined') {
			return { errors: errorBag, values: valueBag, message: 'Pilih channel pembayaran' };
		}

		const mid = generateMid();

		const { code, message, ok } = await request({
			method: 'POST',
			endpoint: '/v1.0/api/cashout',
			payload: {
				mid,
				data: {
					id_produk: '',
					id_user: session?.sessionToken ?? '',
					id_pelanggan1: '',
					id_pelanggan2: '',
					id_pelanggan3: '',
					email: user?.email,
					phone: '',
					password
				},
				data_detail: {
					nominal,
					id_pel: idpel,
					channel_id: channel
				}
			},
			uuid: session?.sessionToken ?? ''
		});

		return { errors: errorBag, values: valueBag, message, code };
	}
};
