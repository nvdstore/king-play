import type { Actions, PageServerLoad, RequestEvent } from './$types';

import {
	deleteFee,
	getAllProduct,
	getMemberFees,
	setFee,
	setFeeDefault,
	updateStore,
	updateStoreInfo
} from '$lib/models/store';
import { validateEmail } from '$lib/utils/validator';
import { upload } from '$lib/upload';
import type { FeeMember } from '$lib/type';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	const { fees, defaultFee } = await getMemberFees(user?.idMember!);
	const feeList: FeeMember[] = fees?.map(
		(fee: any) =>
			({
				memberId: fee.id_member,
				productId: fee.id_produk,
				product: `${fee.nama_group_produk} - ${fee.produk}`,
				fee: fee.fee_member
			}) as FeeMember
	);

	const products = await getAllProduct();

	return {
		fees: feeList ?? [],
		defaultFee,
		products
	};
};

export const actions = {
	store: storeAction,
	setdefault: setfeeDefaultAction,
	setfee: setfeeAction,
	deletefee: deletefeeAction,
	social: socialAction
} satisfies Actions;

async function storeAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const name = frmData.get('store-name')?.toString();
	const desc = frmData.get('store-desc')?.toString();
	const email = frmData.get('store-email')?.toString();
	const phone = frmData.get('store-phone')?.toString();
	const theme = frmData.get('store-theme')?.toString() ?? 'light';
	const color = frmData.get('store-color')?.toString() ?? 'blue';
	const logo = frmData.get('store-logo') as File;

	let errorBag: Record<string, string> = {};
	let valueBag = {
		name,
		desc,
		email,
		phone,
		theme,
		color
	};
	if (!name) {
		errorBag.name = 'Nama harus diisi';
	}
	if (!email) {
		errorBag.email = 'Email harus diisi';
	} else if (!validateEmail(email.toString())) {
		errorBag.email = 'Format email salah';
	}
	if (!phone) {
		errorBag.phone = 'Nomor harus diisi';
	}
	if (logo.size > 0 && !logo.type.match('image/')) {
		errorBag.logo = 'Format file salah';
	}

	if (Object.keys(errorBag).length) {
		return { store: { errors: errorBag, values: valueBag, message: 'Input salah, periksa form' } };
	}

	const filename = await upload({ file: logo, dirname: session?.user?.id });
	const { data, error } = await updateStore({
		memberId: session?.user?.id!,
		name: name!,
		description: desc ?? '',
		email: email!,
		phone: phone!,
		theme: theme,
		color: color,
		logo: filename ?? undefined
	});

	if (error) {
		return {
			store: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
		};
	}

	return { store: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
}

async function setfeeDefaultAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const fee = frmData.get('fee-nominal')?.toString() ?? '';

	let errorBag: Record<string, string> = {};
	let valueBag = { fee };
	if (!fee || Number(fee) <= 0) {
		errorBag.fee = 'Nominal harus diisi';
	}

	if (Object.keys(errorBag).length) {
		return {
			feedefault: { errors: errorBag, values: valueBag, message: 'Input salah, periksa form' }
		};
	}

	const { data, error } = await setFeeDefault({
		memberId: session?.user?.id!,
		amount: Number(fee)
	});

	if (error) {
		return {
			feedefault: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
		};
	}

	return { feedefault: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
}

async function setfeeAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const product = frmData.get('fee-product')?.toString() ?? '';
	const fee = frmData.get('fee-nominal')?.toString() ?? '';

	let errorBag: Record<string, string> = {};
	let valueBag = { product, fee };
	if (!product) {
		errorBag.product = 'Pilih produk terlebih dahulu';
	}
	console.log(fee);
	if (!fee || Number(fee) <= 0) {
		errorBag.fee = 'Nominal harus diisi';
	}

	if (Object.keys(errorBag).length) {
		return { fee: { errors: errorBag, values: valueBag, message: 'Input salah, periksa form' } };
	}

	const { data, error } = await setFee({
		memberId: session?.user?.id!,
		product,
		amount: Number(fee)
	});

	if (error) {
		return {
			fee: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
		};
	}

	return { fee: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
}

async function deletefeeAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const productId = frmData.get('product-id')?.toString() ?? '';
	await deleteFee(session?.user?.id!, productId);
}

async function socialAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const tiktok = frmData.get('store-tiktok')?.toString() ?? '';
	const fb = frmData.get('store-fb')?.toString() ?? '';
	const ig = frmData.get('store-ig')?.toString() ?? '';
	const twitter = frmData.get('store-twitter')?.toString() ?? '';
	const telegram = frmData.get('store-telegram')?.toString() ?? '';

	let errorBag: Record<string, string> = {};
	let valueBag = {
		tiktok,
		fb,
		ig,
		twitter,
		telegram
	};

	const { data, error } = await updateStoreInfo({
		memberId: session?.user?.id!,
		tiktok,
		fb,
		ig,
		twitter,
		telegram
	});

	if (error) {
		return {
			social: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
		};
	}

	return { social: { errors: {}, values: valueBag, message: 'Berhasil menyimpan data' } };
}
