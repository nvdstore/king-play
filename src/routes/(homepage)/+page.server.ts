import type { PageServerLoad } from './$types';
import type { Promo } from './type';

export const load: PageServerLoad = async () => {
	let listPromo: Promo[] = [
		{
			slug: 'hehe',
			image: 'https://i.pinimg.com/originals/d2/9c/75/d29c755f89d8a880562856d12eea33df.jpg',
			url: '#!'
		},
		{
			slug: 'hehe',
			image:
				'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a44778ea-3457-40e0-8979-b7e3685d23d0/dftr9j1-59c69b78-a084-4a74-ab37-5c505f09f7c5.png/v1/fill/w_1195,h_668,q_70,strp/hanabi_moonlit_ninja_skin_8k_wallpaper__by_newjer53_dftr9j1-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA3NCIsInBhdGgiOiJcL2ZcL2E0NDc3OGVhLTM0NTctNDBlMC04OTc5LWI3ZTM2ODVkMjNkMFwvZGZ0cjlqMS01OWM2OWI3OC1hMDg0LTRhNzQtYWIzNy01YzUwNWYwOWY3YzUucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7H9KBdqXnqBysOpH2-Vq6o-I7kDOnQwVKpmz0g7b5CI',
			url: '#!'
		}
	];

	return {
		listPromo
	};
};
