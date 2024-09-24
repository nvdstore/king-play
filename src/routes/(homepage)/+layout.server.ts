import { error } from '@sveltejs/kit';
import { BASE_API_URL } from '$env/static/private';
import { addDays } from 'date-fns';
import { User } from '$lib/models/user';
import { getClientIp } from '$lib/request';
import type { Game, GameResponse } from '$lib/type';

import type { LayoutServerLoad } from './$types';
import { themes } from './themes';

const ID_MASTER = '1000001';
const UUID_KEY = 'uuid';

export const load: LayoutServerLoad = async ({ fetch, url, cookies, request }) => {
	// TODO: check domain, get id member by domain
	console.log(url.hostname);

	let userId = cookies.get(UUID_KEY);
	if (!userId) {
		const ip = await getClientIp();
		const expires = addDays(new Date(), 1);

		// Register new user session
		userId = crypto.randomUUID();
		const { data, error } = await User.createSession({
			userId: ID_MASTER,
			sessionToken: userId,
			expires,
			type: 'user',
			ip,
			deviceInfo: request.headers.get('user-agent') ?? ''
		});

		if (error == null) {
			cookies.set(UUID_KEY, userId, {
				path: '/',
				secure: true,
				expires,
				httpOnly: true
			});
		}
	}

	const getTheme = url.searchParams.get('theme');

	type ThemeType = typeof themes;
	let dataTheme: keyof ThemeType = (getTheme as 'dark') ?? 'dark';
	let dataColor = 'yellow';
	const color = dataColor ?? '';
	const theme = themes[dataTheme ?? 'dark'];

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
	}

	const popularGames: Game[] = games.slice(0, 3);

	return {
		color,
		theme,
		games,
		popularGames
	};
};
