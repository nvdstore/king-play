<script lang="ts">
	import { Save } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="space-y-6">
	<header class="space-y-1" id="store">
		<h2 class="text-xl font-bold">Pengaturan Toko</h2>
		<p class="text-sm">
			Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang Anda bagikan..
		</p>
	</header>

	<form method="POST" action="?/store" class="space-y-4">
		<h4 class="font-semibold text-red-500">Informasi Toko</h4>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="input-group">
				<label for="store-name" class="input-label">Nama Toko</label>
				<input
					type="text"
					name="store-name"
					value={data.store.name ?? ''}
					class="input"
					placeholder="Nama toko"
				/>
			</div>
			<div class="input-group">
				<label for="store-desc" class="input-label">Deskripsi Toko</label>
				<input
					type="text"
					name="store-desc"
					value={data.store.description ?? ''}
					class="input"
					placeholder="Deskripsi toko"
				/>
			</div>
			<div class="input-group">
				<label for="store-email" class="input-label">Email</label>
				<input
					type="text"
					name="store-email"
					value={data.store.email ?? ''}
					class="input"
					placeholder="Email toko"
				/>
			</div>
			<div class="input-group">
				<label for="store-phone" class="input-label">Nomor WhatsApp</label>
				<input
					type="text"
					name="store-phone"
					value={data.store.phone ?? ''}
					class="input"
					placeholder="Nomor whatsapp toko"
				/>
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
				<label for="store-tiktok" class="input-label">Tiktok</label>
				<input
					type="text"
					name="store-tiktok"
					value={data.store?.info?.tiktok ?? ''}
					class="input"
					placeholder="fb.com/kinggaming"
				/>
			</div>
			<div class="input-group">
				<label for="store-fb" class="input-label">Facebook</label>
				<input
					type="text"
					name="store-fb"
					value={data.store?.info?.fb ?? ''}
					class="input"
					placeholder="instagram.com/kinggaming"
				/>
			</div>
			<div class="input-group">
				<label for="store-ig" class="input-label">Instagram</label>
				<input
					type="text"
					name="store-ig"
					value={data.store?.info?.ig ?? ''}
					class="input"
					placeholder="instagram.com/kinggaming"
				/>
			</div>
			<div class="input-group">
				<label for="store-twitter" class="input-label">X/Twitter</label>
				<input
					type="text"
					name="store-twitter"
					value={data.store?.info?.twitter ?? ''}
					class="input"
					placeholder="x.com/kinggaming"
				/>
			</div>
			<div class="input-group">
				<label for="store-tgram" class="input-label">Telegram</label>
				<input
					type="text"
					name="store-tgram"
					value={data.store?.info?.telegram ?? ''}
					class="input"
					placeholder="t.me/6280.."
				/>
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-auto">
			<Save class="mr-2" size={18} />Simpan Perubahan
		</button>
	</form>
</section>
