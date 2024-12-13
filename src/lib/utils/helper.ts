import { MappingGroupChannel } from '$lib/constant';
import type { PaymentChannel, PaymentChannelGroup } from '$lib/type';

export const groupingPaymentChannel = (data: any[]) => {
	const groupMapping: Record<any, PaymentChannelGroup> = {};

	data.forEach((item: any, idx) => {
		if (!groupMapping[item.nama_group_channel]) {
			const group = MappingGroupChannel.find((ch) => ch.group == item.nama_group_channel);

			groupMapping[item.nama_group_channel] = {
				id: Object.keys(groupMapping).length + 1,
				label: group?.name ?? '',
				type: group?.group ?? '',
				channels: [],
				images: []
			};
		}

		const channel: PaymentChannel = {
			id: item.id_channel_pembayaran,
			code: item.via,
			image: item.img,
			name: item.via,
			price: item.nominal_up_pg ?? '',
			isDisabled: item.is_disabled == '1',
			keterangan: item.keterangan ?? ''
		};

		groupMapping[item.nama_group_channel].channels.push(channel);
		groupMapping[item.nama_group_channel].images.push(item.img);
	});

	return Object.values(groupMapping);
};
