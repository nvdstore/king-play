<script lang="ts">
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { signIn } from '@auth/sveltekit/client';

	export let data: PageData;

	let email: string;
	let password: string;
</script>

<form method="post" use:enhance class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Masuk</h4>
		<p class="text-sm">Masuk dengan akun yang telah Anda daftarkan.</p>
	</header>
	<section class="space-y-4">
		<button type="button" on:click={() => signIn('google')} class="btn w-full space-x-2">
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
			<span>Masuk dengan Google</span>
		</button>
		<p class="text-center text-xs text-neutral-300">Atau masuk dengan Email</p>
		<div class="input-group w-full">
			<label for="email" class="input-label">Email</label>
			<input
				bind:value={email}
				name="email"
				class="input"
				type="email"
				placeholder="Masukkan Email Anda"
			/>
			<!-- {#if form?.errors.email}
				<p class="text-sm text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.email}
				</p>
			{/if} -->
		</div>
		<div>
			<div class="input-group w-full">
				<label for="password" class="input-label">Kata Sandi</label>
				<input
					bind:value={password}
					name="password"
					class="input"
					type="password"
					placeholder="Masukkan Kata Sandi Anda"
				/>
				<!-- {#if form?.errors.password}
					<p class="text-sm text-red-500" transition:slide={{ duration: 200 }}>
						{form.errors.password}
					</p>
				{/if} -->
			</div>
			<div class="flex justify-end mt-2">
				<a href="/auth/forgot-password" class="text-xs hover:underline">Lupa kata sandi?</a>
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full">Masuk</button>
		<p class="text-center text-xs text-neutral-300">Belum punya akun?</p>
		<a href="/auth/register" class="btn btn-outline">Daftar Sekarang</a>
	</section>
</form>
