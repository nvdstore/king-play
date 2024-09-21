export type Game = {
	id: number;
	slug: string;
	name: string;
	image: string;
};

export type GameResponse = {
	id_group_produk: number;
	nama_group_produk: string;
	img: string;
	status: number;
	tipe_group: string;
	form_fields: [];
};

export type Product = {
	id: number;
	name: string;
	price: number;
	icon?: string;
};

export type PaymentChannel = {
	id: number;
	name: string;
	code: string;
	image: string;
	price: number;
	helper: string;
};

export type PaymentChannelGroup = {
	id: number;
	label: string;
	type: string;
	channels: PaymentChannel[];
	images: string[];
};

export type Promo = {
	slug: string;
	image: string;
	desc?: string;
	url: string;
	alt?: string;
};
