import { error } from '@sveltejs/kit';
import { BASE_API_URL } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

import { themes } from './themes';
import type { Game, GameResponse } from './type';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
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
					image: game.img
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
