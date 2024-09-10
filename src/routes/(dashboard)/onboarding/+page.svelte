<script lang="ts">
	import { Crown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';

	import { applyAction, enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { signOut } from '@auth/sveltekit/client';
	import { slugify } from '$lib/utils/formatter';

	export let form: ActionData;

	let loading = false;
	let name = form?.values.name ?? '';

	$: domainName = slugify(name);
</script>

<div class="flex flex-col items-center justify-center pt-16 mx-auto space-y-6 overflow-y-auto">
	<a href="/">
		<Crown size={38} />
	</a>

	<div
		class="w-full md:w-[450px] md:border md:border-neutral-700 p-6 md:px-8 md:py-10 md:rounded-lg md:bg-neutral-800/50 backdrop-blur-sm"
	>
		<form
			method="post"
			use:enhance={() => {
				loading = true;

				return async ({ result }) => {
					console.log(result);
					if (result.type === 'redirect') {
						toast.push('Berhasil membuat toko');
						goto(result.location);
					} else {
						loading = false;
						await applyAction(result);
					}
				};
			}}
			class="space-y-6"
		>
			<header class="space-y-1.5 text-center md:text-left">
				<h4 class="text-2xl font-medium">Buat Toko</h4>
				<p class="text-sm">Sebelum melanjutkan, masukkan deskripsi toko Anda.</p>
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
				<div class="input-group w-full">
					<label for="name" class="input-label">Nama Toko</label>
					<input
						name="name"
						bind:value={name}
						class="input {form?.errors.name ? 'input-error' : ''}"
						type="text"
						placeholder="Contoh: KingPlay Topup"
					/>
					{#if form?.errors.name}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.errors.name}
						</p>
					{/if}
				</div>
				<div class="input-group w-full">
					<label for="domain" class="input-label">Alamat Domain Toko</label>
					<div class="flex items-center space-x-1">
						<input
							name="domain"
							bind:value={domainName}
							class="input {form?.errors.domain ? 'input-error' : ''} flex-1"
							type="text"
							placeholder="kinggaming"
						/>
						<select
							name="domain-type"
							class="input {form?.errors.domain ? 'input-error' : ''}"
							value={form?.values.domainType ?? '.kingplay.id'}
						>
							<option value=".kingplay.id">.kingplay.id</option>
							<option value=".kingplay.shop">.kingplay.shop</option>
							<option value=".kingplay.info">.kingplay.info</option>
						</select>
					</div>
					{#if form?.errors.domain}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.errors.domain}
						</p>
					{/if}
				</div>
				<div class="input-group w-full">
					<label for="desc" class="input-label">Deskripsi Toko</label>
					<input
						name="desc"
						value={form?.values.desc ?? ''}
						class="input {form?.errors.desc ? 'input-error' : ''}"
						type="text"
						placeholder="Masukkan deskripsi (opsional)"
					/>
				</div>
				<div class="input-group w-full">
					<label for="email" class="input-label">Email Toko</label>
					<input
						name="email"
						value={form?.values.email ?? ''}
						class="input {form?.errors.email ? 'input-error' : ''}"
						type="email"
						placeholder="Contoh: kingplay@gmail.com"
					/>
					{#if form?.errors.email}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.errors.email}
						</p>
					{/if}
				</div>
				<div class="input-group w-full">
					<label for="phone" class="input-label">Nomor WhatsApp Toko</label>
					<input
						name="phone"
						value={form?.values.phone ?? ''}
						class="input {form?.errors.phone ? 'input-error' : ''}"
						type="text"
						placeholder="Masukkan No. WA Toko"
					/>
					{#if form?.errors.phone}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.errors.phone}
						</p>
					{/if}
				</div>
			</section>

			<div class="space-y-2">
				<button class="btn btn-primary w-full" type="submit" disabled={loading}>Buat Toko</button>
				<button class="btn w-full space-x-2" type="button" on:click={() => signOut()}>Keluar</button
				>
			</div>
		</form>
	</div>
</div>
