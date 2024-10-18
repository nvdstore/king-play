import type { Actions, PageServerLoad, RequestEvent } from './$types';

import {
	deleteFee,
	getAllGroupProduct,
	getAllProduct,
	getMemberFees,
	setFee,
	setFeeDefault,
	setFeeGroup,
	updateStore,
	updateStoreDomain,
	updateStoreInfo
} from '$lib/models/store';
import { checkDomain, validateEmail } from '$lib/utils/validator';
import { upload } from '$lib/upload';
import type { FeeMember } from '$lib/type';

export const load: PageServerLoad = async ({ parent, url }) => {
	const { user } = await parent();

	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;

	const { fees, defaultFee } = await getMemberFees({
		memberId: user?.idMember!,
		limit: 10,
		offset: (page - 1) * 10
	});
	const feeList: FeeMember[] = fees?.map(
		(fee: any) =>
			({
				memberId: fee.id_member,
				productId: fee.id_produk,
				product: fee.produk,
				groupProductId: fee.id_group_produk,
				groupProduct: fee.nama_group_produk,
				fee: fee.fee_member
			}) as FeeMember
	);

	const groupProducts = await getAllGroupProduct();

	const products = await getAllProduct();

	return {
		fees: feeList ?? [],
		defaultFee,
		groupProducts,
		products
	};
};

export const actions = {
	domain: domainAction,
	store: storeAction,
	setdefault: setfeeDefaultAction,
	setfeeGroup: setfeeGroupAction,
	setfee: setfeeAction,
	deletefee: deletefeeAction,
	social: socialAction
} satisfies Actions;

async function domainAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const domain = frmData.get('domain')?.toString() ?? '';
	const domainType = frmData.get('domain-type')?.toString() ?? '';
	const fullDOmain = domain + domainType;
	const customDomain = frmData.get('custom-domain')?.toString() ?? '';

	let errorBag: Record<string, string> = {};
	let valueBag = { domain, domainType, customDomain };
	if (!domain && !customDomain) {
		errorBag.domain = 'Domain harus diisi';
	} else if (!checkDomain(fullDOmain)) {
		errorBag.domain = 'Format domain harus diisi';
	}

	if (customDomain && !checkDomain(customDomain)) {
		errorBag.customDomain = 'Format domain harus diisi';
	}

	if (Object.keys(errorBag).length) {
		return { domain: { errors: errorBag, values: valueBag, message: 'Input salah, periksa form' } };
	}

	const { data, error } = await updateStoreDomain({
		memberId: session?.user?.id!,
		domain: fullDOmain,
		customDomain
	});

	if (error) {
		return {
			domain: {
				errors: errorBag,
				values: valueBag,
				message: error ?? 'Terjadi kesalahan saat menyimpan data'
			}
		};
	}

	return { domain: { errors: errorBag, values: valueBag, message: 'Berhasil menyimpan data' } };
}

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

async function setfeeGroupAction(event: RequestEvent) {
	const session = await event.locals.auth();
	const frmData = await event.request.formData();

	const groupProduct = frmData.get('fee-product')?.toString() ?? '';
	const fee = frmData.get('fee-nominal')?.toString() ?? '';

	let errorBag: Record<string, string> = {};
	let valueBag = { groupProduct, fee };
	if (!groupProduct) {
		errorBag.product = 'Pilih grup produk terlebih dahulu';
	}
	if (!fee || Number(fee) <= 0) {
		errorBag.fee = 'Nominal harus diisi';
	}

	if (Object.keys(errorBag).length) {
		return {
			feegroup: { errors: errorBag, values: valueBag, message: 'Input salah, periksa form' }
		};
	}

	const { data, error } = await setFeeGroup({
		memberId: session?.user?.id!,
		groupProduct: groupProduct,
		amount: Number(fee)
	});

	if (error) {
		return {
			feegroup: { errors: {}, values: valueBag, message: 'Terjadi kesalahan saat menyimpan data' }
		};
	}

	const isAllSuccess = data?.every((currVal: boolean) => currVal == true);

	return {
		feegroup: {
			errors: {},
			values: valueBag,
			message: isAllSuccess ? 'Berhasil menyimpan data' : 'Berhasil menyimpan data sebagian'
		}
	};
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
