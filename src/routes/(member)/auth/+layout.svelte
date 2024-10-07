<script lang="ts">
	import { Crown } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto">
	<a href="/">
		<Crown size={38} />
	</a>

	<div class="w-full md:w-[450px] md:{data.theme.card} px-8 md:py-10">
		<slot />
	</div>
</div>
