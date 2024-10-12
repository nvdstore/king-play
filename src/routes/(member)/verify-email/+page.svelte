<script lang="ts">
	import { enhance } from '$app/forms';
	import { signOut } from '@auth/sveltekit/client';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let form: HTMLFormElement;
</script>

<nav class="p-4 text-right">
	<span>{data?.user?.name}</span>
	<span class="mx-2">|</span>
	<a href="#!" on:click={() => signOut()} class="underline text-red-500">Keluar</a>
</nav>

<div class="flex flex-col items-center justify-center py-16 mx-auto space-y-6 overflow-y-auto">
	<div class="w-full md:w-[450px] md:{data.theme.card} px-8 md:py-10">
		<div class="mb-5">
			<h1 class="text-xl font-medium">Verifikasi Email</h1>
			<p>Untuk melanjutkan, klik tautan yang kami kirimkan ke Email Anda.</p>
		</div>
		{#if !data.nextRetryAt}
			<p class="text-sm">
				Tidak menerima Email?
				<a href="#!" on:click={() => form.requestSubmit()} class="underline text-red-500">
					Kirim ulang link verifikasi
				</a>
			</p>
		{:else}
			<p class="text-sm">Email verifikasi sudah dikirim</p>
		{/if}
	</div>

	<form method="post" bind:this={form} use:enhance></form>
</div>
