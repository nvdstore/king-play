<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		BadgePercent,
		Clock,
		Crown,
		FileBarChart,
		Home,
		LogOut,
		LucideLink2,
		Settings,
		Store
	} from 'lucide-svelte';
	import {openSidebar} from '$lib/stores/general'

	$: isActive = (link) => $page.url.pathname == link;
</script>

<aside class="{!$openSidebar ? 'translate-x-[-250px]' : 'w-[250px] translate-x-[0px]'} transition-transform delay-[0] fixed z-50 md:relative md:translate-x-0 md:flex flex-col h-screen bg-neutral-800 text-neutral-200">
	<a href="/" class="flex items-center p-4 pt-6 gap-2">
		<Crown size={20} />
		<span class="ml-2 font-medium">King Gaming</span>
	</a>

	<button
		on:click={() => goto('/dashboard/store-setting')}
		class="hidden md:flex items-center p-2 gap-3 cursor-pointer w-full border-y border-neutral-700 hover:bg-neutral-900/50 transition-all"
	>
		<div class="bg-neutral-500 rounded-lg h-10 w-10 flex items-center justify-center">
			<Store />
		</div>
		<div class="text-left">
			<a href="/dashboard/store-setting" class="hover:underline"
				><h4 class="text-lg font-medium">Store Name</h4></a
			>
			<a href="/" target="_blank" class="text-xs inline-flex items-center hover:underline gap-1"
				><LucideLink2 size={14} /> Kunjungi</a
			>
		</div>
	</button>

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
		<a
			href="/dashboard/comission"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/comission')}
		>
			<BadgePercent size={20} />
			<span class="ml-3 text-sm">Komisi</span>
		</a>
		<a
			href="/dashboard/report"
			class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			class:active={isActive('/dashboard/report')}
		>
			<FileBarChart size={20} />
			<span class="ml-3 text-sm">Laporan</span>
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
			<a
				href="/login"
				class="flex items-center p-2 hover:bg-red-800/50 bg-red-900/50 bg-opacity-50 text-red-200 backdrop-blur-sm rounded-md cursor-pointer transition-all"
			>
				<LogOut size={20} />
				<span class="ml-3 text-sm">Keluar</span>
			</a>
		</nav>
	</div>
</aside>

<style>
	.active {
		@apply bg-neutral-700/50;
	}
</style>
