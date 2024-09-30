<script lang="ts">
	import { page } from '$app/stores';
	import { ServerCrash } from 'lucide-svelte';
</script>

<div class="flex items-center justify-center w-full h-screen">
	<div class="flex flex-col items-center">
		<ServerCrash size={48} />
		<h4 class="text-xl mb-5 mt-2">{$page.error?.message ?? 'Terjadi Kesalahan'}</h4>
		<a href="/" class="btn btn-red">Kembali ke Beranda</a>
	</div>
</div>
