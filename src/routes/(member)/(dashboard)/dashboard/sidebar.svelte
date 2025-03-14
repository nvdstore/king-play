<script lang="ts">
	import { page } from '$app/stores';
	import {
		HandCoins,
		Bell,
		Clock,
		Crown,
		FileBarChart,
		Home,
		LogOut,
		LucideLink2,
		Settings,
		Store,
		StoreIcon,
		Eye,
		ExternalLink
	} from 'lucide-svelte';
	import { openSidebar } from '$lib/stores/general';
	import { signOut } from '@auth/sveltekit/client';
	import { currency } from '$lib/utils/formatter';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let store;

	$: isActive = (link: string) => $page.url.pathname === link;
</script>

<aside
	class="{!$openSidebar
		? 'translate-x-[-250px]'
		: 'translate-x-[0px]'} transition-transform delay-[0] fixed w-[250px] z-50 md:translate-x-0 md:flex flex-col h-screen bg-neutral-800 text-neutral-200"
>
	<a href="/" class="flex items-center p-4 pt-6 gap-2 bg-red-500">
		<Crown size={26} />
		<span class="ml-2 font-bold">King Play</span>
	</a>

	<div
		class="hidden md:flex items-start p-2 py-4 gap-3 w-full border-b border-neutral-700 hover:bg-neutral-900/50 transition-all"
	>
		<a
			href="/dashboard/store"
			class="bg-red-500 rounded-lg h-10 w-10 flex items-center justify-center"
		>
			<Store />
		</a>
		<div class="text-left">
			<a href="/dashboard/store">
				<h4 class="text-md font-medium">{store?.name}</h4>
			</a>
			<p class="text-xs">
				<span class="text-xs">Saldo</span>
				<span class="font-medium">{currency(store?.balance)}</span>
			</p>
		</div>
		<!-- <a href="/dashboard/notif" class="ml-auto mr-2">
			<Bell size={18} />
		</a> -->
	</div>

	<div class="p-2">
		<nav class="space-y-2">
			<button
				on:click={() => dispatch('share')}
				class="flex items-center justify-between p-2 hover:bg-blue-800/50 bg-blue-900/50 bg-opacity-50 text-blue-200 backdrop-blur-sm rounded-md cursor-pointer transition-all w-full"
			>
				<div class="ml-3 text-sm">Bagikan Toko Saya</div>
			</button>
		</nav>
	</div>

	<nav class="space-y-2 p-2">
		<a
			href="/dashboard"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard')}
		>
			<Home size={20} />
			<span class="ml-3 text-sm">Dashboard</span>
		</a>
		<a
			href="/dashboard/history"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/history')}
		>
			<Clock size={20} />
			<span class="ml-3 text-sm">Transaksi</span>
		</a>
		<!-- <a
			href="/dashboard/comission"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/comission')}
		>
			<BadgePercent size={20} />
			<span class="ml-3 text-sm">Komisi</span>
		</a> -->
		<a
			href="/dashboard/report"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/report')}
		>
			<FileBarChart size={20} />
			<span class="ml-3 text-sm">Laporan</span>
		</a>
		<a
			href="/dashboard/cashout"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/cashout')}
		>
			<HandCoins size={20} />
			<span class="ml-3 text-sm">Penarikan Dana</span>
		</a>
		<a
			href="/dashboard/store"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/store')}
		>
			<StoreIcon size={20} />
			<span class="ml-3 text-sm">Manajemen Toko</span>
		</a>
		<a
			href="/dashboard/settings"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/settings')}
		>
			<Settings size={20} />
			<span class="ml-3 text-sm">Pengaturan</span>
		</a>
	</nav>
	<div class="mt-auto p-2">
		<nav class="space-y-2">
			<button
				on:click={() => signOut()}
				class="flex items-center p-2 hover:bg-red-800/50 bg-red-900/50 bg-opacity-50 text-red-200 backdrop-blur-sm rounded-md cursor-pointer transition-all w-full"
			>
				<LogOut size={20} />
				<span class="ml-3 text-sm">Keluar</span>
			</button>
		</nav>
	</div>
</aside>

<style>
	.active {
		@apply bg-neutral-700/50;
	}
</style>
