<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Save, Store } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let name = form?.user?.values.name ?? data.user?.name;
	let email = form?.user?.values.email ?? data.user?.email;

	let loadingForm = false;
</script>

<section class="space-y-6">
	<!-- <header class="space-y-1" id="store">
		<h2 class="text-xl font-bold">Pengaturan Toko</h2>
		<p class="text-sm">Kelola toko Anda dengan mudah melalui menu Pengaturan Toko.</p>
	</header>

	<div class="md:flex">
		<a href="/dashboard/store" class="btn">
			<Store class="mr-2" size={18} />Manajemen Toko
		</a>
	</div> -->

	<header class="space-y-1" id="profile">
		<h2 class="text-xl font-bold">Ubah Profil</h2>
		<p class="text-sm">
			Perbarui informasi profil Anda untuk menjaga data tetap akurat dan terkini.
		</p>
	</header>

	<form
		method="POST"
		action="?/user"
		use:enhance={() => {
			loadingForm = true;

			return async ({ result }) => {
				await applyAction(result);
				if (form?.user?.message) {
					toast.push(form?.user?.message);
				}
				invalidateAll();
				loadingForm = false;
			};
		}}
		class="space-y-4"
	>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="user-name" class="input-label">Nama</label>
				<input
					type="text"
					name="user-name"
					value={name}
					class="input"
					placeholder="Masukkan Nama Anda"
				/>
				{#if form?.user?.errors.name}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.user?.errors.name}
					</p>
				{/if}
			</div>
			<div class="input-group">
				<label for="user-email" class="input-label">Email</label>
				<input
					type="text"
					name="user-email"
					value={email}
					class="input"
					placeholder="Masukkan Email Anda"
				/>
				{#if form?.user?.errors.email}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.user?.errors.email}
					</p>
				{/if}
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto" disabled={loadingForm}>
			<Save class="mr-2" size={18} />Simpan Perubahan
		</button>
	</form>

	<header class="space-y-1">
		<h2 class="text-xl font-bold">{data.haspass ? 'Ubah Kata Sandi' : 'Buat Kata Sandi'}</h2>
		<div>
			<p class="text-sm">
				{data.haspass
					? 'Pastikan Anda mengingat kata sandi baru Anda sebelum mengubahnya.'
					: 'Silakan masukkan kata sandi baru untuk akun Anda'}
			</p>
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
	</header>

	<form
		method="POST"
		action="?/password"
		use:enhance={() => {
			loadingForm = true;

			return async ({ result }) => {
				await applyAction(result);
				if (form?.user?.message) {
					toast.push(form?.user?.message);
				}
				invalidateAll();
				loadingForm = false;
			};
		}}
		class="space-y-4"
	>
		<div class="grid md:grid-cols-2 gap-4">
			{#if data.haspass}
				<div class="input-group">
					<label for="user-password" class="input-label">Password Anda</label>
					<input
						type="password"
						name="user-password"
						class="input"
						placeholder="Masukkan password Anda saat ini"
					/>
					{#if form?.password?.errors.currpass}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.password?.errors.currpass}
						</p>
					{/if}
				</div>
				<div class="hidden md:block" />
			{/if}
			<div class="input-group">
				<label for="user-newpass" class="input-label">Password Baru</label>
				<input
					type="password"
					name="user-newpass"
					class="input"
					placeholder="Masukkan password baru"
				/>
				{#if form?.password?.errors.newpass}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.password?.errors.newpass}
					</p>
				{/if}
			</div>
			<div class="input-group">
				<label for="user-confirmpass" class="input-label">Konfirmasi Password Baru</label>
				<input
					type="password"
					name="user-confirmpass"
					class="input"
					placeholder="Konfirmasi password baru"
				/>
				{#if form?.password?.errors.confirmpass}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.password?.errors.confirmpass}
					</p>
				{/if}
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto" disabled={loadingForm}>
			<Save class="mr-2" size={18} />Ubah Kata Sandi
		</button>
	</form>
</section>
