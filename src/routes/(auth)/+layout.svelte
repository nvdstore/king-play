<script>
	import { Crown } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center justify-center pt-16 mx-auto space-y-6 overflow-y-auto">
	<a href="/">
		<Crown size={38} />
	</a>

	<div
		class="w-full md:w-[450px] md:border md:border-neutral-700 p-6 md:px-8 md:py-10 md:rounded-lg md:bg-neutral-800/50  backdrop-blur-sm"
	>
		<slot />
	</div>
</div>
