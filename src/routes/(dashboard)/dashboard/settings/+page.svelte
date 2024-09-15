<script>
	import { Save, Store } from 'lucide-svelte';
</script>

<section class="space-y-6">
	<header class="space-y-1" id="store">
		<h2 class="text-xl font-bold">Pengaturan Toko</h2>
		<p class="text-sm">
			Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang Anda bagikan..
		</p>
	</header>

	<div class="md:flex">
		<a href="/dashboard/store" class="btn">
			<Store class="mr-2" size={18} />Manajemen Toko
		</a>
	</div>

	<form method="POST" action="?/store" class="space-y-4">
		<h4 class="font-semibold text-red-500">Informasi Toko</h4>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="store-name" class="input-label">Nama Toko</label>
				<input type="text" name="store-name" class="input" placeholder="Nama toko" />
			</div>
			<div class="input-group">
				<label for="store-desc" class="input-label">Deskripsi Toko</label>
				<input type="text" name="store-desc" class="input" placeholder="Deskripsi toko" />
			</div>
			<div class="input-group">
				<label for="store-email" class="input-label">Email</label>
				<input type="text" name="store-email" class="input" placeholder="Email toko" />
			</div>
			<div class="input-group">
				<label for="store-phone" class="input-label">Nomor WhatsApp</label>
				<input type="text" name="store-phone" class="input" placeholder="Nomor whatsapp toko" />
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto">
			<Save class="mr-2" size={18} />Simpan Perubahan
		</button>
	</form>

	<form method="POST" action="?/social" class="space-y-4">
		<h4 class="font-semibold text-red-500">Sosial Media</h4>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="store-fb" class="input-label">Facebook</label>
				<input type="text" name="store-fb" class="input" placeholder="fb.com/kinggaming" />
			</div>
			<div class="input-group">
				<label for="store-ig" class="input-label">Instagram</label>
				<input type="text" name="store-ig" class="input" placeholder="instagram.com/kinggaming" />
			</div>
			<div class="input-group">
				<label for="store-twitter" class="input-label">X/Twitter</label>
				<input type="text" name="store-twitter" class="input" placeholder="x.com/kinggaming" />
			</div>
			<div class="input-group">
				<label for="store-tgram" class="input-label">Telegram</label>
				<input type="text" name="store-tgram" class="input" placeholder="t.me/6280.." />
			</div>
			<div class="input-group">
				<label for="store-line" class="input-label">Line</label>
				<input type="text" name="store-line" class="input" placeholder="line.me/6280..." />
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto">
			<Save class="mr-2" size={18} />Simpan Perubahan
		</button>
	</form>

	<header class="space-y-1" id="profile">
		<h2 class="text-xl font-bold">Ubah Profil</h2>
		<p class="text-sm">
			Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang Anda bagikan..
		</p>
	</header>

	<form method="POST" action="?/user" class="space-y-4">
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="user-name" class="input-label">Nama</label>
				<input type="text" name="user-name" class="input" placeholder="Masukkan Nama Anda" />
			</div>
			<div class="input-group">
				<label for="user-phone" class="input-label">Nomor WhatsApp</label>
				<input
					type="text"
					name="user-phone"
					class="input"
					placeholder="Masukkan No. WhatsApp Anda"
				/>
			</div>
			<div class="input-group">
				<label for="user-email" class="input-label">Email</label>
				<input type="text" name="user-email" class="input" placeholder="Masukkan Email Anda" />
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto">
			<Save class="mr-2" size={18} />Simpan Perubahan
		</button>
	</form>

	<header class="space-y-1">
		<h2 class="text-xl font-bold">Ubah Kata Sandi</h2>
		<p class="text-sm">Pastikan Anda mengingat kata sandi baru Anda sebelum mengubahnya.</p>
	</header>

	<form method="POST" action="?/password" class="space-y-4">
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="user-name" class="input-label">Password Anda</label>
				<input
					type="text"
					name="user-name"
					class="input"
					placeholder="Masukkan password Anda saat ini"
				/>
			</div>
			<div class="hidden md:block" />
			<div class="input-group">
				<label for="user-email" class="input-label">Password Baru</label>
				<input type="text" name="user-email" class="input" placeholder="Masukkan password baru" />
			</div>
			<div class="input-group">
				<label for="user-email" class="input-label">Konfirmasi Password Baru</label>
				<input type="text" name="user-email" class="input" placeholder="Konfirmasi password baru" />
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto">
			<Save class="mr-2" size={18} />Ubah Kata Sandi
		</button>
	</form>
</section>
