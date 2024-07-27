<script>
	import { Bell, Store } from 'lucide-svelte';
	import Sidebar from './sidebar.svelte';
</script>

<div class="grid md:grid-cols-[250px_1fr]">
	<Sidebar />

	<main class="p-4 md:p-6 space-y-6">
		<div class="max-w-[980px] text-neutral-200 mx-auto">
			<slot />
		</div>
	</main>
</div>
