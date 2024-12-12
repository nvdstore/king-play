<script lang="ts">
	import { Crown, Search, X, User } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { register } from 'swiper/element/bundle';

	import type { LayoutData } from './$types';
	import { showLoader, userAgent } from '$lib/stores/general';

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
	<meta charset="utf-8" />
	<meta name="description" content="Topup game termudah dan termurah" />
	<title>{data.store.name} - Topup Game</title>
</svelte:head>

<div class="min-h-screen {data.theme.main}">
	<div class="{data.theme.nav} sticky top-0 z-20">
		<nav class="flex items-center justify-between p-4 mx-auto md:max-w-[1024px] space-x-2">
			<a href="/" class="flex items-center space-x-2 flex-1">
				{#if data.isMaster}
					<img
						src="https://res.cloudinary.com/dwfrvuyh6/image/upload/v1733492336/Logo_White_BG_xzlux0.png"
						class="h-10"
						alt="Kingplay"
					/>
				{:else if data.store.logo}
					<img src={data.store.logo} class="h-10" alt={data.store.name} />
				{:else}
					<span class="font-semibold text-lg">{data.store.name}</span>
				{/if}
			</a>
			<div class="flex items-center justify-end space-x-2">
				<div class={showSearchBox ? 'fixed left-5 right-5 md:relative' : ''}>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:click={() => (showSearchBox = true)}
						class="{showSearchBox
							? 'md:w-[400px]'
							: 'max-w-11 md:max-w-[200px]'} transition-all relative z-50"
					>
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
							class="fixed h-[300vh] md:h-[100vh] w-[100vw] top-0 right-0 block bg-neutral-900/75 z-40"
							on:click={() => (showSearchBox = false)}
						></div>
					{/if}
				</div>
				{#if data.isMaster}
					<a href="/auth/login" class="btn btn-{data.color}">
						<Crown class="pr-2" /> Member
					</a>
				{/if}
			</div>
		</nav>
	</div>

	<main class="mx-auto md:max-w-[1024px] p-4 md:my-10">
		<slot />
	</main>

	<footer class={data.theme.footer}>
		<div class="mx-auto space-y-4 md:space-y-8 md:max-w-[1024px] p-4 py-10">
			<section class="flex md:grid md:grid-cols-4 gap-4 text-sm">
				<div class="space-y-4 flex-1">
					{#if data.isMaster}
						<a href="/" class="flex space-x-2">
							<img
								src="https://res.cloudinary.com/dwfrvuyh6/image/upload/v1733492336/Logo_White_BG_xzlux0.png"
								class="h-10 object-scale-down"
								alt="Kingplay"
							/>
						</a>
						<div>
							<div>&copy; {new Date().getFullYear()} - KingPlay Teams, All rights reserved.</div>
						</div>
					{:else if data.store.logo}
						<a href="/">
							<img src={data.store.logo} class="h-10 object-scale-down" alt={data.store.name} />
						</a>
					{:else}
						<a href="/">
							<span class="font-semibold text-lg">{data.store.name}</span>
						</a>
					{/if}
				</div>
				<div>
					{#if data.isMaster}
						<div class="hidden md:block space-y-2">
							<div class="text-{data.color}-500 font-medium">Member</div>
							<ul>
								<li><a href="/auth/register">Daftar Member</a></li>
								<li><a href="/dashboard">Dashboard</a></li>
							</ul>
						</div>
					{/if}
				</div>
				<div class="space-y-4 flex-1">
					<div class="space-y-2">
						<div class="text-{data.color}-500 font-medium">Sitemap</div>
						<ul>
							<li><a href="/">Topup Game</a></li>
							<li><a href="/privacy-policy">Kebijakan Privasi</a></li>
							<li><a href="/terms">Syarat & Ketentuan</a></li>
						</ul>
					</div>
					{#if data.isMaster}
						<div class="block md:hidden space-y-2">
							<div class="text-{data.color}-500 font-medium">Member</div>
							<ul>
								<li><a href="/auth/register">Daftar Member</a></li>
								<li><a href="/dashboard">Dashboard</a></li>
							</ul>
						</div>
					{/if}
				</div>
				<div class="space-y-2 flex-1">
					<div class="text-{data.color}-500 font-medium">Kontak Kami</div>
					<ul>
						{#if data.store.phone}
							<li><a href="https://wa.me/{data.store.phone}" target="_blank">WhatsApp</a></li>
						{/if}
						{#if data.store.email}
							<li><a href="mailto:{data.store.email}" target="_blank">Email</a></li>
						{/if}
						{#if data.store.info?.fb}
							<li><a href="https://{data.store.info?.fb}" target="_blank">Facebook</a></li>
						{/if}

						{#if data.store.info?.tiktok}
							<li><a href="https://{data.store.info?.tiktok}" target="_blank">Tiktok</a></li>
						{/if}
						{#if data.store.info?.ig}
							<li><a href="https://{data.store.info?.ig}" target="_blank">Instagram</a></li>
						{/if}
						{#if data.store.info?.twitter}
							<li><a href="https://{data.store.info?.twitter}" target="_blank">x.com</a></li>
						{/if}
					</ul>
				</div>
			</section>
		</div>
	</footer>
</div>

{#if $showLoader}
	<div
		class="fixed top-0 left-0 w-full h-screen bg-slate-900/75 z-50 backdrop-blur-sm flex items-center justify-center"
	>
		<div class="p-5 rounded-lg bg-neutral-50 text-slate-800 shadow-sm flex items-center space-x-4">
			<div role="status">
				<svg
					aria-hidden="true"
					class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span class="sr-only">Loading...</span>
			</div>

			<p>Mohon tunggu...</p>
		</div>
	</div>
{/if}

<style>
	footer ul li a:hover {
		text-decoration: underline;
	}
	footer ul li {
		line-height: 2rem;
	}
</style>
