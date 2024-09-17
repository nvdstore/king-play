export type Game = {
	id: number;
	slug: string;
	name: string;
	image: string;
};

export type Product = {
	id: number;
	name: string;
	price: number;
	icon?: string;
};

export type Promo = {
	slug: string;
	image: string;
	desc?: string;
	url: string;
	alt?: string;
};
