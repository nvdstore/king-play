<script lang="ts">
	import { Crown } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>King Play</title>
</svelte:head>

<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto">
	<a href="/">
		<img
			src="https://res.cloudinary.com/dwfrvuyh6/image/upload/v1733492336/Logo_White_BG_xzlux0.png"
			class="h-10"
			alt="Kingplay"
		/>
	</a>

	<div class="w-full md:w-[450px] md:{data.theme.card} px-8 md:py-10">
		<slot />
	</div>
</div>
