import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { InvoiceDataTyoe } from '$lib/type';
import { request } from '$lib/request';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const userId = cookies.get('uuid');

	const base64data = url.searchParams.get('d') ?? '';
	const checkoutData = JSON.parse(atob(base64data));
	if (!checkoutData) {
		console.log('Error parsing data');
		redirect(307, '/');
	}

	const checkoutUserId = checkoutData.id_user;
	if (checkoutUserId != userId) {
		console.log('Invalid user');
		redirect(307, '/');
	}

	const idInvoice = checkoutData.id_invoice;
	if (!idInvoice) {
		console.log('Invoice data not found');
		redirect(307, '/');
	}

	const { data } = await request({
		method: 'POST',
		endpoint: '/v1.0/api/invoices/check/',
		payload: {
			id_invoice: idInvoice,
			id_user: userId!
		},
		uuid: userId!
	});
	// console.log(data);

	const invoiceData = JSON.parse(data.data);
	const invoiceDetail = invoiceData.invoice_detail;
	const invoice: InvoiceDataTyoe = {
		channel: invoiceDetail.channel,
		checkoutUrl: invoiceDetail.checkout_url,
		idChannel: invoiceDetail.id_channel_pembayaran,
		idInquiry: invoiceDetail.id_transaksi_inquiry,
		idInvoice: invoiceDetail.id_invoice,
		panduan: invoiceDetail.panduan,
		payUrl: invoiceDetail.pay_url,
		reffIdBiller: invoiceDetail.reff_id_biller,
		timeLimit: new Date(invoiceDetail.time_limit),
		total: invoiceDetail.total
	};

	const flag = data?.flag ?? 'Selesaikan Pembayaran';
	const status: number = data?.status ?? 1;

	return {
		flag,
		status,
		invoice
	};
};
