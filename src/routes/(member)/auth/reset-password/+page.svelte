<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let password: string;
	let confirmPassword: string;

	async function handleOnSubmit() {
		goto('/dashboard');
	}
</script>

<form on:submit|preventDefault={handleOnSubmit} class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Ubah Kata Sandi</h4>
		<p class="text-sm">Masukkan Kata Sandi baru untuk merubah Kata Sandi Anda.</p>
	</header>
	<section class="space-y-4">
		<div class="input-group w-full">
			<label for="password" class="input-label">Kata Sandi Baru</label>
			<input
				bind:value={password}
				name="password"
				class={data.theme.input}
				type="password"
				placeholder="Masukkan Kata Sandi Anda"
			/>
		</div>
		<div class="input-group w-full">
			<label for="confirm-password" class="input-label">Konfirmasi Kata Sandi Baru</label>
			<input
				bind:value={confirmPassword}
				name="confirm-password"
				class="data.theme.input"
				type="password"
				placeholder="Konfirmasi Kata Sandi Baru Anda"
			/>
		</div>

		<button class="btn btn-primary w-full" type="submit">Ubah Kata Sandi</button>
	</section>
</form>
