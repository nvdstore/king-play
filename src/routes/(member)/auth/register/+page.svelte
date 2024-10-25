<script lang="ts">
	import { onMount } from 'svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { slide } from 'svelte/transition';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';
	import { goto } from '$app/navigation';

	export let form: ActionData;
	export let data: PageData;

	let loading = false;

	onMount(() => {
		const error = $page.url.searchParams.get('error');

		if (error == 'Configuration') {
			toast.push('Terjadi kesalahan!');
			goto('/auth/register');
		} else if (error == 'OAuthAccountNotLinked') {
			toast.push('Email sudah terdaftar sebelumnya!');
			goto('/auth/register');
		}
	});
</script>

<form
	method="post"
	use:enhance={() => {
		loading = true;

		return async ({ result }) => {
			await applyAction(result);

			const errors = form?.errors;
			const values = form?.values;

			if (errors?.message) {
				toast.push(errors?.message);
				loading = false;
			} else {
				toast.push('Berhasil melakukan pendaftaran');
				await signIn('credentials', { email: values?.email, password: values?.password });
			}
		};
	}}
	class="space-y-6"
>
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Daftar</h4>
		<p class="text-sm">Buat akun King Gaming Anda.</p>
	</header>
	{#if form?.errors.message}
		<div
			class="flex items-center justify-between text-sm text-red-600 py-2 px-3 bg-red-200 rounded-md"
			transition:slide={{ duration: 200 }}
		>
			<span>
				{form.errors.message}
			</span>
		</div>
	{/if}

	<section class="space-y-4">
		<button
			type="button"
			on:click={() => signIn('google')}
			class="{data.theme.button} w-full space-x-2"
		>
			<svg
				role="img"
				viewBox="0 0 24 24"
				width="18"
				height="18"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Google</title><path
					d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
				/>
			</svg>
			<span>Lanjutkan dengan Google</span>
		</button>
		<p class="text-center text-xs opacity-75">Atau daftar dengan Email</p>
		<div class="input-group w-full">
			<label for="name" class="input-label">Nama Anda</label>
			<input
				name="name"
				value={form?.values.name ?? ''}
				class="{data.theme.input} {form?.errors.name ? 'input-error' : ''}"
				type="text"
				placeholder="Masukkan Nama Anda"
			/>
			{#if form?.errors.name}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.name}
				</p>
			{/if}
		</div>
		<div class="input-group w-full">
			<label for="email" class="input-label">Email</label>
			<input
				name="email"
				value={form?.values.email ?? ''}
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
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group w-full">
				<label for="password" class="input-label">Kata Sandi</label>
				<input
					name="password"
					value={form?.values.password ?? ''}
					class="{data.theme.input} {form?.errors.password ? 'input-error' : ''}"
					type="password"
					placeholder="Masukkan kata sandi Anda"
				/>
				{#if form?.errors.password}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.errors.password}
					</p>
				{/if}
			</div>
			<div class="input-group w-full">
				<label for="confirm-password" class="input-label">Konfirmasi Kata Sandi</label>
				<input
					name="confirm-password"
					value={form?.values.confirmPassword ?? ''}
					class="{data.theme.input} {form?.errors.confirmPassword ? 'input-error' : ''}"
					type="password"
					placeholder="Konfirmasi kata sandi"
				/>
				{#if form?.errors.confirmPassword}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.errors.confirmPassword}
					</p>
				{/if}
			</div>
		</div>
		<div>
			<label class="text-xs">
				<input type="checkbox" name="terms" checked={form?.values.terms} class="mr-1.5" />
				Saya setuju dengan
				<a href="/terms-condition" target="_blank" class="text-red-500 hover:underline">
					Syarat dan Ketentuan
				</a>
				dan
				<a href="/privacy-policy" target="_blank" class="text-red-500 hover:underline">
					Kebijakan Privasi
				</a>
			</label>
			{#if form?.errors.terms}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.terms}
				</p>
			{/if}
		</div>
		<button class="btn btn-primary w-full" type="submit" disabled={loading}>Daftar</button>
		<p class="text-center text-xs opacity-75">Sudah punya akun?</p>
		<a href="/auth/login" class={data.theme.button}>Masuk</a>
	</section>
</form>
