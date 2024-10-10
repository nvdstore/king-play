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

	const checkoutUserId = checkoutData.data.id_user;
	if (checkoutUserId != userId) {
		console.log('Invalid user');
		redirect(307, '/');
	}

	const invoiceDet = checkoutData.additional.response_invoice_detail;
	if (!invoiceDet) {
		console.log('Invoice data not found');
		redirect(307, '/');
	}

	const invoiceData: InvoiceDataTyoe = {
		channel: invoiceDet.channel,
		checkoutUrl: invoiceDet.checkout_url,
		idChannel: invoiceDet.id_channel_pembayaran,
		idInquiry: invoiceDet.id_transaksi_inquiry,
		idInvoice: invoiceDet.id_invoice,
		panduan: invoiceDet.panduan,
		payUrl: invoiceDet.pay_url,
		reffIdBiller: invoiceDet.reff_id_biller,
		timeLimit: new Date(invoiceDet.time_limit),
		total: invoiceDet.total
	};

	const { data } = await request({
		method: 'POST',
		endpoint: '/v1.0/api/invoices/check/',
		payload: {
			id_invoice: invoiceData.idInvoice,
			id_user: userId!
		},
		uuid: userId!
	});
	let flag = data?.flag ?? 'Selesaikan Pembayaran';
	let status: number = data?.status ?? 1;

	return {
		flag,
		status,
		invoice: invoiceData
	};
};
