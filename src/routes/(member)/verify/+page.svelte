<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Verifikasi Email | King Play</title>
</svelte:head>

<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto">
	<div class="w-full md:w-[450px] px-8 md:py-10">
		<div class="mb-5">
			{#if data.ok}
				<h1 class="text-xl font-medium">Verifikasi Email Berhasil</h1>
				<p class="mb-4">Silahkan lakukan login kembali. Anda bisa menutup tab ini.</p>
				<a href="/auth/login" class="underline">Klik untuk Login</a>
			{:else}
				<h1 class="text-xl font-medium">Verifikasi Email Tidak Berhasil</h1>
				<p>Terjadi kesalahan saat melakukan verifikasi.</p>
			{/if}
		</div>
	</div>
</div>
