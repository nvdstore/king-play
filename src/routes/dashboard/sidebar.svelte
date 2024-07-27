<script>
	import { page } from '$app/stores';
	import {
		BadgePercent,
		Clock,
		Crown,
		FileBarChart,
		Home,
		LogOut,
		RefreshCcw,
		Settings
	} from 'lucide-svelte';

	$: isActive = (link) => $page.url.pathname == link;
</script>

<aside
	class="hidden md:flex flex-col h-screen bg-neutral-950/20 text-neutral-200"
>
	<div class="flex items-center p-4 pt-6 gap-2">
		<Crown/> 
		<span class="ml-2 text-lg font-bold">King Gaming</span>
	</div>
	<nav class="space-y-2 p-4">
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
	<div class="mt-auto p-4">
		<nav class="space-y-2">
			<div
				class="flex items-center p-2 hover:bg-neutral-700/50 bg-opacity-50 backdrop-blur-sm rounded-md cursor-pointer transition-all text-red-800"
			>
				<LogOut size={20} />
				<span class="ml-3 text-sm">Keluar</span>
			</div>
		</nav>
	</div>
</aside>

<style>
	.active {
		@apply bg-neutral-700/50;
	}
</style>
