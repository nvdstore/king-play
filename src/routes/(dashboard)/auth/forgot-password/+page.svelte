<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string;
	let confirmEmail: string;

	async function handleOnSubmit() {
		goto('/dashboard');
	}
</script>

<form on:submit|preventDefault={handleOnSubmit} class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Lupa Kata Sandi</h4>
		<p class="text-sm">
			Masukkan alamat Email Anda, dan kami akan mengirimkan link untuk Reset Kata Sandi Anda.
		</p>
	</header>
	<section class="space-y-4">
		<div class="input-group w-full">
			<label for="email" class="input-label">Email</label>
			<input
				bind:value={email}
				name="email"
				class="input"
				type="email"
				placeholder="Masukkan Email Anda"
			/>
		</div>
		<div class="input-group w-full">
			<label for="confirm-email" class="input-label">Konfirmasi Email</label>
			<input
				bind:value={confirmEmail}
				name="confirm-email"
				class="input"
				type="email"
				placeholder="Konfirmasi Email Anda"
			/>
		</div>

		<button class="btn btn-primary w-full" type="submit">Kirim Link</button>
		<a href="/auth/login" class="btn btn-outline">Masuk</a>
	</section>
</form>
