import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { InvoiceDataTyoe } from '$lib/type';
import { request } from '$lib/request';
import { BASE_API_URL } from '$env/static/private';

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

	let typeInvoice: 'QR' | 'VA' | 'RETAIL' | 'OTHER' = 'OTHER';
	if ('virtual_account' in invoiceDetail) {
		typeInvoice = 'VA';
	} else if ('payment_code' in invoiceDetail) {
		typeInvoice = 'RETAIL';
	} else if ('custom_qr' in invoiceDetail) {
		typeInvoice = 'QR';
	}

	let resData: Record<string, any> = {
		flag,
		status,
		invoice,
		typeInvoice,
		namaChannel: invoiceDetail.nama_channel,
		logoChannel: invoiceDetail.logo
	};

	if (typeInvoice == 'QR') {
		const customQrPath = invoiceDetail.custom_qr;
		const customQrUrl = new URL(customQrPath, BASE_API_URL).toString();
		const qrData = await fetch(customQrUrl)
			.then((response) => response.arrayBuffer())
			.then((buffer) => Buffer.from(buffer).toString('base64'));

		resData = { ...resData, qrData: `data:image/png;base64, ${qrData}` };
	} else if (typeInvoice == 'RETAIL') {
		resData = { ...resData, paymentCode: invoiceDetail.payment_code };
	} else if (typeInvoice == 'VA') {
		resData = { ...resData, virtualAccount: invoiceDetail.virtual_account };
	}

	return resData;
};
