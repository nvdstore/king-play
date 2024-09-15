<script lang="ts">
	import { Crown, Search, X, User } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { register } from 'swiper/element/bundle';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let searchValue: string = '';
	let showSearchBox: boolean = false;

	register();

	$: filteredGames =
		searchValue.length > 0
			? data.games.filter((val) => val.name?.toLowerCase().includes(searchValue.toLowerCase()))
			: data.popularGames;
</script>

<svelte:head>
	<title>KingPlay - Topup Game</title>
</svelte:head>

<div class="min-h-screen {data.theme.main}">
	<div class="{data.theme.nav} sticky top-0 z-20">
		<nav class="flex items-center justify-between p-4 mx-auto md:max-w-[800px]">
			<a href="/" class="flex items-center space-x-2 flex-1">
				<Crown size={30} />
				<span class="font-semibold text-lg">
					King<span class="text-{data.color}-500">Play</span>.id
				</span>
			</a>
			<div class="flex items-center justify-end space-x-2">
				<div class="hidden md:block">
					<div class="{showSearchBox ? 'w-[400px]' : 'max-w-[200px]'} transition-all relative z-50">
						<div
							class="{data.theme.bgColor} 
							border {data.theme.border} rounded-lg overflow-hidden flex items-center space-x-2 px-3"
						>
							<div class="flex-1">
								<Search size={18} class={data.theme.bgColor} />
							</div>
							<input
								bind:value={searchValue}
								type="text"
								class="bg-transparent outline-none h-10 w-full"
								placeholder={showSearchBox ? 'Ketik untuk mencari' : 'Pencarian Game...'}
								on:click={() => (showSearchBox = true)}
							/>
							{#if searchValue.length > 0}
								<button on:click={() => (searchValue = '')}>
									<X size={18} class={data.theme.bgColor} />
								</button>
							{/if}
						</div>
						{#if showSearchBox}
							<div
								class="absolute h-[200px] w-full mt-2 shadow rounded-lg overflow-y-auto
								{data.theme.bgColorSecondary} 
								{data.theme.border}"
								in:slide={{ delay: 100 }}
							>
								<div class="p-4 space-y-4">
									<div class="space-y-4">
										<h4 class="font-semibold text-sm">
											{#if searchValue.length > 0}
												Pencarian Games: <span class="italic">{searchValue}</span>
											{:else}
												Games Populer
											{/if}
										</h4>
										<div class="grid grid-cols-2 gap-2">
											{#each filteredGames as game}
												<a href="/{game.slug}" on:click={() => (showSearchBox = false)}>
													<div
														class="flex items-center space-x-2 p-2 rounded-lg {data.theme.bgColor}"
													>
														<img src={game.image} class="rounded-lg w-10" alt={game.name} />
														<div>
															<div class="line-clamp-1 text-sm font-medium">
																{game.name}
															</div>
															<div class="text-xs italic">Topup Game</div>
														</div>
													</div>
												</a>
											{/each}
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
					{#if showSearchBox}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							transition:fade={{ duration: 50 }}
							class="fixed h-[100vw] w-[100vw] top-[-20vh] right-0 block bg-neutral-900/75 z-40"
							on:click={() => (showSearchBox = false)}
						></div>
					{/if}
				</div>
				<a href="/auth/login" class="btn btn-{data.color}">
					<Crown class="pr-2" /> Member
				</a>
			</div>
		</nav>
	</div>

	<main class="mx-auto space-y-4 md:space-y-8 md:max-w-[800px] p-4 my-10">
		<slot />
	</main>

	<footer class={data.theme.footer}>
		<div class="mx-auto space-y-4 md:space-y-8 md:max-w-[800px] p-4 py-10">
			<section class="flex md:grid md:grid-cols-4 gap-4 text-sm">
				<div class="space-y-4 flex-1">
					<a href="/" class="flex space-x-2">
						<Crown size={30} />
						<span class="font-semibold text-lg">
							King<span class="text-{data.color}-500">Play</span>.id
						</span>
					</a>
					<div>
						<div>&copy; 2024 - KingPlay Teams, All rights reserved.</div>
					</div>
					<ul>
						<li><a href="/about-us">Tentang Kami</a></li>
						<li><a href="/privacy-policy">Kebijakan Privasi</a></li>
						<li><a href="/terms">Syarat & Ketentuan</a></li>
					</ul>
				</div>
				<div></div>
				<div class="space-y-4 flex-1">
					<div class="space-y-2">
						<div class="text-{data.color}-500 font-medium">Sitemap</div>
						<ul>
							<li><a href="/">Topup Game</a></li>
							<li><a href="/transactions">Cek Transaksi</a></li>
						</ul>
					</div>
					<div class="space-y-2">
						<div class="text-{data.color}-500 font-medium">Member</div>
						<ul>
							<li><a href="/auth/register">Daftar Member</a></li>
							<li><a href="/dashboard">Dashboard</a></li>
						</ul>
					</div>
				</div>
				<div class="space-y-2 flex-1">
					<div class="text-{data.color}-500 font-medium">Kontak Kami</div>
					<ul>
						<li><a href="#!">WhatsApp</a></li>
						<li><a href="#!">Email</a></li>
						<li><a href="#!">Facebook</a></li>
						<li><a href="#!">Tiktok</a></li>
						<li><a href="#!">Instagram</a></li>
						<li><a href="#!">X.com</a></li>
					</ul>
				</div>
			</section>
		</div>
	</footer>
</div>

<style>
	footer ul li a:hover {
		text-decoration: underline;
	}
	footer ul li {
		line-height: 2rem;
	}
</style>
