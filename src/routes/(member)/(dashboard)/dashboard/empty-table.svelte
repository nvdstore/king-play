<script>
	import { Inbox } from 'lucide-svelte';

	export let description = 'Belum ada data';
</script>

<div class="space-y-1 flex flex-col items-center justify-center min-h-[200px]">
	<Inbox size={32} />
	<div class="space-y-0 5 text-center">
		<h2 class="text-lg">Tidak ada data</h2>
		<p>{description}</p>
	</div>
</div>
