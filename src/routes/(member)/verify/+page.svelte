<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto">
	<div class="w-full md:w-[450px] px-8 md:py-10">
		<div class="mb-5">
			{#if data.ok}
				<h1 class="text-xl font-medium">Verifikasi Email Berhasil</h1>
				<p>Silahkan lakukan login kembali. Anda bisa menutup tab ini.</p>
			{:else}
				<h1 class="text-xl font-medium">Verifikasi Email Tidak Berhasil</h1>
				<p>Terjadi kesalahan saat melakukan verifikasi.</p>
			{/if}
		</div>
	</div>
</div>
