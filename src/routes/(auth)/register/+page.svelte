<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string;
	let storeName: string;
	let email: string;
	let phone: string;
	let password: string;
	let confirmPassword: string;

	async function handleOnSubmit() {
		goto('/dashboard');
	}
</script>

<form on:submit|preventDefault={handleOnSubmit} class="space-y-6">
	<header class="space-y-1.5 text-center md:text-left">
		<h4 class="text-2xl font-medium">Daftar</h4>
		<p class="text-sm">Buat akun King Gaming Anda.</p>
	</header>
	<section class="space-y-4">
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group w-full">
				<label for="name" class="input-label">Nama Anda</label>
				<input
					bind:value={name}
					name="name"
					class="input"
					type="text"
					placeholder="Masukkan Nama Anda"
				/>
			</div>
			<div class="input-group w-full">
				<label for="store-name" class="input-label">Nama Toko</label>
				<input
					bind:value={storeName}
					name="store-name"
					class="input"
					type="text"
					placeholder="Contoh: King Topup"
				/>
			</div>
		</div>
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
			<label for="phone" class="input-label">Nomor WhatsApp</label>
			<input
				bind:value={phone}
				name="phone"
				class="input"
				type="text"
				placeholder="Masukkan No. WA Anda"
			/>
		</div>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group w-full">
				<label for="password" class="input-label">Kata Sandi</label>
				<input
					bind:value={password}
					name="password"
					class="input"
					type="password"
					placeholder="Masukkan kata sandi Anda"
				/>
			</div>
			<div class="input-group w-full">
				<label for="confirm-password" class="input-label">Konfirmasi Kata Sandi</label>
				<input
					bind:value={confirmPassword}
					name="confirm-password"
					class="input"
					type="password"
					placeholder="Konfirmasi kata sandi"
				/>
			</div>
		</div>
		<div>
			<label class="text-xs">
				<input type="checkbox" class="mr-1.5" />
				Saya setuju dengan
				<a href="/terms-condition" target="_blank" class="text-red-500 hover:underline"
					>Syarat dan Ketentuan</a
				>
				dan
				<a href="/privacy-policy" target="_blank" class="text-red-500 hover:underline"
					>Kebijakan Privasi</a
				>
			</label>
		</div>
		<button class="btn btn-primary w-full" type="submit">Daftar</button>
		<p class="text-center text-xs text-neutral-300">Atau</p>
		<button class="btn w-full space-x-2">
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
			<span>Daftar dengan Google</span>
		</button>

		<p class="text-center text-xs text-neutral-300">Sudah punya akun?</p>
		<a href="/login" class="btn btn-outline">Masuk</a>
	</section>
</form>
