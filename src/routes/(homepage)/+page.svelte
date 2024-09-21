<script lang="ts">
	import { register } from 'swiper/element/bundle';

	import type { PageData } from './$types';

	register();

	export let data: PageData;
</script>

<div class="space-y-10">
	<section class="border border-slate-800/50 rounded-lg overflow-hidden">
		<swiper-container
			pagination="true"
			navigation="true"
			autoplay-delay="2500"
			autoplay-disable-on-interaction="false"
			loop="true"
		>
			{#each data.listPromo as promo}
				<swiper-slide>
					<a href={promo.url}>
						<img
							src={promo.image}
							alt={promo.alt ?? 'promo image'}
							class="w-full aspect-[24/9] object-cover"
						/>
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	</section>

	<section
		class="border border-slate-800/50 rounded-xl bg-no-repeat bg-cover overflow-hidden text-neutral-50"
		style="background-image: url(https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/74/2024/06/24/zilong-empyrean-paladin-skin-mobile-legends-mlbb-hd-wallpaper-uhdpaper-859023630.jpg);"
	>
		<div class="bg-neutral-800/60 py-8 flex flex-col items-center">
			<h1 class="text-2xl font-bold mb-4 text-center shadown drop-shadow-lg">
				Join Sekarang<br />buat <span class="text-{data.color}-500">Website Topup Game</span><br
				/>kamu sendiri!
			</h1>
			<a href="/auth/register" class="btn btn-{data.color}">Daftar Sekarang</a>
		</div>
	</section>

	<section class="space-y-4">
		<h4 class="text-xl font-medium">Topup Game</h4>

		<div class="grid grid-cols-3 gap-6 md:grid-cols-6">
			{#each data.games as game}
				<a href={game.id.toString()} class="card-link">
					<div class="space-y-4 p-4 {data.theme.card}">
						<div class="card">
							<img src={game.image} class="card-image" alt={game.image} />
						</div>
						<div class="card-text {data.theme.color}">{game.name}</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section
		class="border border-slate-800/50 rounded-xl bg-no-repeat bg-cover overflow-hidden text-neutral-50"
		style="background-image: url(https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/74/2024/06/24/zilong-empyrean-paladin-skin-mobile-legends-mlbb-hd-wallpaper-uhdpaper-859023630.jpg);"
	>
		<div class="bg-neutral-800/60 py-8 flex flex-col items-center">
			<h1 class="text-2xl font-bold mb-4 text-center shadown drop-shadow-lg">
				Join Sekarang<br />buat <span class="text-{data.color}-500">Website Topup Game</span><br
				/>kamu sendiri!
			</h1>
			<a href="/auth/register" class="btn btn-{data.color}">Daftar Sekarang</a>
		</div>
	</section>
</div>

<style>
	.card-link:hover .card-image {
		@apply scale-105 transition-transform;
	}
	.card {
		@apply relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg;
	}
	.card-image {
		@apply h-full w-full;
	}
	.card-text {
		@apply line-clamp-1 text-center font-medium  transition-colors md:text-sm;
	}
</style>
