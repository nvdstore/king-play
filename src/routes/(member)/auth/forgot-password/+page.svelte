<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	import type { ActionData, PageData } from './$types';
	import { slide } from 'svelte/transition';

	export let form: ActionData;
	export let data: PageData;

	let email = form?.values.email ?? '';
	let confirmEmail = '';
	let loading = false;
</script>

<div class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Lupa Kata Sandi</h4>
		<p class="text-sm">
			Masukkan alamat Email Anda, dan kami akan mengirimkan link untuk Reset Kata Sandi Anda.
		</p>
	</header>
	<form
		method="POST"
		use:enhance={() => {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				if (form?.message) {
					toast.push(form?.message);
				}
				invalidateAll();
				loading = false;
			};
		}}
		class="space-y-4"
	>
		<div class="input-group w-full">
			<label for="email" class="input-label">Email</label>
			<input
				value={email}
				name="email"
				class="{data.theme.input} {form?.errors.email ? 'input-error' : ''}"
				type="email"
				placeholder="Masukkan Email Anda"
			/>
			{#if form?.errors.email}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.email}
				</p>
			{/if}
		</div>
		<div class="input-group w-full">
			<label for="confirm-email" class="input-label">Konfirmasi Email</label>
			<input
				value={confirmEmail}
				name="confirm-email"
				class="{data.theme.input} {form?.errors.confirmEmail ? 'input-error' : ''}"
				type="email"
				placeholder="Konfirmasi Email Anda"
			/>
			{#if form?.errors.confirmEmail}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.confirmEmail}
				</p>
			{/if}
		</div>

		<button class="btn btn-primary w-full" type="submit">Kirim Link</button>
		<a href="/auth/login" class={data.theme.button}>Masuk</a>
	</form>
</div>
