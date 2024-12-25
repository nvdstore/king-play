<script lang="ts">
	import { Bell, LucideLink2, Menu, Store, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto, onNavigate } from '$app/navigation';

	import { openSidebar } from '$lib/stores/general';
	import Sidebar from './sidebar.svelte';

	import type { LayoutData } from './$types';

	onNavigate(() => {
		$openSidebar = false;
	});

	export let data: LayoutData;

	let showPopup = data.showPopup ?? true;
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

	<Sidebar store={data.store} />

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
				<a
					href="https://{data.store.domain}"
					target="_blank"
					class="text-xs inline-flex items-center hover:underline gap-1"
				>
					<LucideLink2 size={14} /> Kunjungi
				</a>
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
