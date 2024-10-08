<script lang="ts">
	import { page } from '$app/stores';
	import { ServerCrash, House, RefreshCcw } from 'lucide-svelte';
</script>

<div class="flex items-center justify-center h-screen">
	<div class="w-[400px] border rounded-2xl p-6">
		<div class="flex flex-col items-center">
			<h1 class="font-medium opacity-75">{$page.status}</h1>
			<h2>Oops, Terjadi Kesalahan</h2>
			<h4 class="text-xl mb-8">{$page.error?.message ?? 'Internal Server Error'}</h4>
			{#if $page.url.pathname == '/'}
				<button on:click={() => window.location.reload()} class="btn btn-red">
					<RefreshCcw size={18} class="mr-2" />Muat Ulang
				</button>
			{:else}
				<a href="/" class="btn btn-red"><House size={18} class="mr-2" />Kembali ke Beranda</a>
			{/if}
			<p class="text-sm mt-3">
				Butuh bantuan: <a href="mailto:support@kingplay.id" class="text-red-500">
					support@kingplay.id
				</a>
			</p>
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 6rem;
	}
</style>
