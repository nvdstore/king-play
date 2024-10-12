<script lang="ts">
	import { slide } from 'svelte/transition';
	import { toast } from '@zerodevx/svelte-toast';

	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let password = form?.values?.password ?? '';
	let confirmPassword = form?.values?.confirmPassword ?? '';
	let loading = false;
</script>

<div class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Ubah Kata Sandi</h4>
		<p class="text-sm">Masukkan Kata Sandi baru untuk merubah Kata Sandi Anda.</p>
	</header>
	<form
		method="POST"
		use:enhance={() => {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				if (form?.message) {
					toast.push(form?.message);

					if (form?.ok) {
						window.location.href = '/auth/login';
					}
				}

				invalidateAll();
				loading = false;
			};
		}}
		class="space-y-4"
	>
		<div class="input-group w-full">
			<label for="password" class="input-label">Kata Sandi Baru</label>
			<input
				value={password}
				name="password"
				class={data.theme.input}
				type="password"
				placeholder="Masukkan Kata Sandi Anda"
			/>
			{#if form?.errors?.password}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors?.password}
				</p>
			{/if}
			<div class="border p-2 border-red-700 bg-red-600/20 rounded-md mt-4">
				<span class="text-sm">Format password:</span>
				<ul class="text-xs list-disc ml-4">
					<li>Minimal 8 karakter</li>
					<li>Minimal satu huruf kecil</li>
					<li>Minimal satu huruf besar</li>
					<li>Minimal satu digit angka</li>
					<li>Minimal satu simbol</li>
				</ul>
			</div>
		</div>
		<div class="input-group w-full">
			<label for="confirm-password" class="input-label">Konfirmasi Kata Sandi Baru</label>
			<input
				value={confirmPassword}
				name="confirm-password"
				class="{data.theme.input} "
				type="password"
				placeholder="Konfirmasi Kata Sandi Baru Anda"
			/>
			{#if form?.errors?.confirmPassword}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors?.confirmPassword}
				</p>
			{/if}
		</div>

		<button class="btn btn-primary w-full" type="submit">Ubah Kata Sandi</button>
	</form>
</div>
