<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		BadgePercent,
		Bell,
		Clock,
		Crown,
		FileBarChart,
		Home,
		LogOut,
		LucideLink2,
		Settings,
		Store
	} from 'lucide-svelte';
	import { openSidebar } from '$lib/stores/general';

	$: isActive = (link: string) => $page.url.pathname === link;
</script>

<aside
	class="{!$openSidebar
		? 'translate-x-[-250px]'
		: 'translate-x-[0px]'} transition-transform delay-[0] fixed w-[250px] z-50 md:translate-x-0 md:flex flex-col h-screen bg-neutral-800 text-neutral-200"
>
	<a href="/" class="flex items-center p-4 pt-6 gap-2 bg-red-500">
		<Crown size={26} />
		<span class="ml-2 font-bold">KING Gaming</span>
	</a>

	<div
		class="hidden md:flex items-center p-2 py-4 gap-3 w-full border-b border-neutral-700 hover:bg-neutral-900/50 transition-all"
	>
		<a
			href="/dashboard/store"
			class="bg-red-500 rounded-lg h-10 w-10 flex items-center justify-center"
		>
			<Store />
		</a>
		<div class="text-left">
			<a href="/dashboard/store">
				<h4 class="text-md font-medium">Store Name</h4>
			</a>
			<a href="/" target="_blank" class="text-xs inline-flex items-center hover:underline gap-1">
				<LucideLink2 size={14} /> Kunjungi
			</a>
		</div>
		<a href="/dashboard/notif" class="ml-auto mr-2">
			<Bell size={18} />
		</a>
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
