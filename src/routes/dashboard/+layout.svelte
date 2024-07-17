<script>
	import { Store } from 'lucide-svelte';
	import Aside from './aside.svelte';
</script>

<div class="grid md:grid-cols-[250px_1fr]">
	<Aside />

	<main class="p-4 md:p-6 space-y-6">
		<header class="flex items-center justify-between mb-6 text-neutral-50">
			<nav class="flex space-x-4"></nav>
			<div class="flex items-center space-x-4">
				<button class="w-10 h-10 hover:bg-neutral-700 flex items-center justify-center rounded-full transition-all"><Store /></button>
				<button class="">
					<span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
						<img
							class="aspect-square h-full w-full"
							alt="moherik"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
						/>
					</span>
				</button>
			</div>
		</header>

		<div class="max-w-[980px] text-neutral-200 mx-auto">
			<slot />
		</div>
	</main>
</div>
