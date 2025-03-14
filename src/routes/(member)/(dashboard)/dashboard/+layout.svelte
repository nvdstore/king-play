<script lang="ts">
	import {
		Bell,
		Download,
		ExternalLink,
		Link,
		LucideLink2,
		Menu,
		Share,
		Store,
		X
	} from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto, onNavigate } from '$app/navigation';

	import { openSidebar } from '$lib/stores/general';
	import Sidebar from './sidebar.svelte';

	import type { LayoutData } from './$types';
	import { currency } from '$lib/utils/formatter';
	import { copyText } from '$lib/utils/clipboard';

	onNavigate(() => {
		$openSidebar = false;
	});

	export let data: LayoutData;

	let showPopup = data.showPopup ?? true;
	let showPopupShare = false;
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		role="button"
		tabindex="-1"
		class="{$openSidebar
			? 'block md:hidden'
			: 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/80 z-40"
		on:click={() => ($openSidebar = false)}
	></div>

	<Sidebar store={data.store} on:share={() => (showPopupShare = true)} />

	<header class="flex items-center md:hidden sticky top-0 bg-neutral-800 z-20 space-x-4 py-2 px-4">
		<button class="btn" on:click={() => ($openSidebar = true)}>
			<Menu size={20} />
		</button>

		<button
			on:click={() => goto('/dashboard/store')}
			class="flex items-center gap-4 cursor-pointer w-full"
		>
			<div class="bg-red-500 rounded-lg h-10 w-10 flex items-center justify-center">
				<Store />
			</div>
			<div class="text-left">
				<a href="/dashboard/store" class="hover:underline">
					<h4 class="text-lg font-medium">{data.store.name}</h4>
				</a>
				<div class="flex items-center gap-2">
					<p class="text-xs">
						<span class="text-xs">Saldo</span>
						<span class="font-medium">{currency(data.store?.balance)}</span>
					</p>
				</div>
			</div>
		</button>
	</header>

	<main class="p-4 md:p-6 space-y-6 md:ml-[250px]">
		<div class="max-w-[980px] text-neutral-200 mx-auto">
			<slot />
		</div>
	</main>
</div>

{#if showPopup}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div transition:fade={{ duration: 300 }} class="popup show" on:click={() => (showPopup = false)}>
		<div class="relative m:w-[500px]">
			<a href="https://t.me/kingplayid" target="_blank">
				<img
					src="https://res.cloudinary.com/dwfrvuyh6/image/upload/v1735103492/telegram_promo_x3u5uw.png"
					alt="popup"
				/>
			</a>
			<div class="absolute top-0 right-0 p-2 cursor-pointer">
				<X class="text-slate-800" on:click={() => (showPopup = false)} />
			</div>
		</div>
	</div>
{/if}

{#if showPopupShare}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div transition:fade={{ duration: 300 }} class="popup show">
		<div
			class="relative w-full md:w-[500px] bg-slate-700 text-white md:min-h-[500px] rounded-md flex items-center justify-center p-4"
		>
			<button
				class="absolute top-0 right-0 p-4 cursor-pointer"
				on:click={() => (showPopupShare = false)}
			>
				<X />
			</button>

			<div class="flex flex-col items-center">
				<h3 class="text-xl font-medium mt-2 mb-10">Bagikan Website Toko Saya</h3>
				<img src={data.qrShare} class="bg-neutral-100 w-[200px] h-[200px] mb-5" alt="qr share" />
				<div class="flex items-center gap-4">
					<a href={data.qrShare} download class="btn btn-primary text-white">
						Unduh QR <Download size={18} class="ml-2" />
					</a>
					<a
						href="https://{data.store.customDomain ?? data.store.domain}"
						target="_blank"
						class="btn btn-primary text-white"
					>
						Lihat Website <ExternalLink size={18} class="ml-2" />
					</a>
				</div>

				<div class="flex items-center gap-4 mt-5">
					<a
						href="https://wa.me/?text=Top-up+game+jadi+lebih+mudah+dan+murah!%0ACek+di+sini:+https://{data
							.store.customDomain ?? data.store.domain}"
						target="_blank"
						class="flex flex-col items-center"
					>
						<div class="w-10 h-10 p-2 rounded-full bg-green-600 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								fill="#ffff"
								class="w-10 h-10"
								version="1.1"
								id="Layer_1"
								viewBox="0 0 308 308"
								xml:space="preserve"
							>
								<g id="XMLID_468_">
									<path
										id="XMLID_469_"
										d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156   c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687   c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887   c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153   c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348   c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802   c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922   c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0   c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458   C233.168,179.508,230.845,178.393,227.904,176.981z"
									/>
									<path
										id="XMLID_470_"
										d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716   c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396   c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z    M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188   l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677   c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867   C276.546,215.678,222.799,268.994,156.734,268.994z"
									/>
								</g>
							</svg>
						</div>
						<p class="text-sm mt-2">WhatsApp</p>
					</a>
					<button
						on:click|preventDefault|stopPropagation={() =>
							copyText(`https://${data.store.customDomain ?? data.store.domain}`)}
						class="flex flex-col items-center"
					>
						<div class="w-10 h-10 p-2 rounded-full bg-blue-400 flex items-center justify-center">
							<Link size={20} class="text-white" />
						</div>
						<p class="text-sm mt-2">Copy Link</p>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000a1;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
