<script>
	import { Bell, LucideLink2, Menu, Store } from 'lucide-svelte';
	import Sidebar from './sidebar.svelte';
	import { goto, onNavigate } from '$app/navigation';
	import { openSidebar } from '$lib/stores/general';

	onNavigate(() => {
		$openSidebar = false;
	})
</script>

<div class="grid md:grid-cols-[250px_1fr]">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div role="button" tabindex="-1" class="{$openSidebar ? 'block md:hidden' : 'hidden' } absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/80 z-40" on:click={() => $openSidebar = false}></div>

	<Sidebar />

	<header class="flex items-center md:hidden sticky top-0 bg-neutral-800 z-20 space-x-4 py-2 px-4">
		<button class="btn" on:click={() => $openSidebar = true}>
			<Menu size={20} />
		</button>

		<button
			on:click={() => goto('/dashboard/store-setting')}
			class="flex items-center gap-4 cursor-pointer w-full"
		>
			<div class="bg-red-500 rounded-lg h-10 w-10 flex items-center justify-center">
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
	</header>

	<main class="p-4 md:p-6 space-y-6">
		<div class="max-w-[980px] text-neutral-200 mx-auto">
			<slot />
		</div>
	</main>
</div>
