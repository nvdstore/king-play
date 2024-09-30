import { error } from '@sveltejs/kit';
import { BASE_API_URL } from '$env/static/private';
import { addDays } from 'date-fns';

import { createSession } from '$lib/models/user';
import { getStoreByDomain } from '$lib/models/store';
import { getClientIp } from '$lib/request';
import type { Game, GameResponse, Store } from '$lib/type';

import type { LayoutServerLoad } from './$types';
import { themes } from '$lib/themes';

const ID_MASTER = '1000001';
const UUID_KEY = 'uuid';

export const load: LayoutServerLoad = async ({ fetch, url, cookies, request }) => {
	const host = url.hostname;

	let idMember = ID_MASTER;
	let store: Store;

	const storeData = await getStoreByDomain(host);
	if (storeData && storeData.id_member) {
		idMember = storeData.id_member;

		// this is store for domain spesific store
		store = {
			idMember,
			name: storeData.name,
			description: storeData.description,
			phone: storeData.phone,
			email: storeData.email,
			domain: storeData.custom_domain ?? storeData.domain,
			logo: storeData.logo,
			promo: [],
			info: {
				fb: storeData.fb,
				tiktok: storeData.tiktok,
				ig: storeData.ig,
				telegram: storeData.telegram,
				twitter: storeData.twitter
			}
		};
	} else {
		error(404, 'Store Not Found');
	}

	let userId = cookies.get(UUID_KEY);
	if (!userId) {
		const ip = await getClientIp();
		const expires = addDays(new Date(), 1);

		// Register new user session
		userId = crypto.randomUUID();
		const { data, error } = await createSession({
			userId: store.idMember,
			sessionToken: userId,
			expires,
			type: 'user',
			host,
			ip,
			deviceInfo: request.headers.get('user-agent') ?? ''
		});

		if (error == null) {
			cookies.set(UUID_KEY, userId, {
				path: '/',
				domain: url.hostname == 'localhost' ? '' : host,
				secure: true,
				expires,
				httpOnly: true
			});
		}
	}

	type ThemeType = typeof themes;
	let dataTheme: keyof ThemeType = store.theme as 'light';
	const color = store.color ?? 'blue';
	const theme = themes[dataTheme ?? 'light'];

	let games: Game[] = [];

	const response = await fetch(new URL('/v1.0/api/produk/list-group-produk', BASE_API_URL).href);
	if (!response.ok) {
		throw error(500, `HTTP Error status: ${response.status}`);
	}
	const data = await response.json();
	if (data.response_code != '00') {
		throw error(500, `Error get games: ${data.response_message}`);
	}
	const item = data.response_data;
	if (item.length > 0) {
		games = item.map(
			(game: GameResponse) =>
				({
					id: game.id_group_produk,
					name: game.nama_group_produk,
					image: game.img,
					slug: game.slug
				}) as Game
		);
	} else {
		games = [];
	}

	const popularGames: Game[] = games.slice(0, 3);

	return {
		color,
		theme,
		store,
		games,
		popularGames,
		isMaster: idMember == ID_MASTER
	};
};
