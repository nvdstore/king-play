import type { LayoutServerLoad } from './$types';

import { themes } from './themes';
import type { Game } from './type';

export const load: LayoutServerLoad = async ({ url }) => {
	const getTheme = url.searchParams.get('theme');

	type ThemeType = typeof themes;
	let dataTheme: keyof ThemeType = (getTheme as 'dark') ?? 'dark';
	let dataColor = 'yellow';

	const color = dataColor ?? '';
	const theme = themes[dataTheme ?? 'dark'];

	let games: Game[] = [
		{
			slug: 'honor-of-kings',
			name: 'Honor of Kings',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/37/63/db376320-c37b-c8c8-05bc-578ace590ad8/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
		},
		{
			slug: 'mobile-legends',
			name: 'Mobile Legends',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
		},
		{
			slug: 'pokemon-go',
			name: 'Pokemon GO',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/ca/c9/6bcac96a-ba65-d71c-ac59-079e28853b83/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp'
		}
	];

	const popularGames: Game[] = [
		{
			slug: 'honor-of-kings',
			name: 'Honor of Kings',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/37/63/db376320-c37b-c8c8-05bc-578ace590ad8/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
		},
		{
			slug: 'mobile-legends',
			name: 'Mobile Legends',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp'
		},
		{
			slug: 'pokemon-go',
			name: 'Pokemon GO',
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/ca/c9/6bcac96a-ba65-d71c-ac59-079e28853b83/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp'
		}
	];

	return {
		color,
		theme,
		games,
		popularGames
	};
};
