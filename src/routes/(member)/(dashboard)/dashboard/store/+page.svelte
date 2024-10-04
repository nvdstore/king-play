<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Save } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import EmptyTable from '$lib/components/empty-table.svelte';
	import { currency } from '$lib/utils/formatter';

	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let loadingStoreForm = false;
	let name = form?.store?.values.name ?? data.store.name;
	let description = form?.store?.values.desc ?? data.store.description;
	let email = form?.store?.values.email ?? data.store.email;
	let phone = form?.store?.values.phone ?? data.store.phone;
	let theme = form?.store?.values.theme ?? data.store.theme;
	let color = form?.store?.values.color ?? data.store.color;
	let logo = data.store.logo;

	let defaultFee = form?.feedefault?.values.fee ?? data.defaultFee;
	let productFee = form?.fee?.values.product ?? '';
	let customFee = form?.fee?.values.fee ?? '';

	let loadingStoreInfoForm = false;
	let tiktok = form?.social?.values.tiktok ?? data.store.info?.tiktok;
	let fb = form?.social?.values.fb ?? data.store.info?.fb;
	let ig = form?.social?.values.ig ?? data.store.info?.ig;
	let twitter = form?.social?.values.twitter ?? data.store.info?.twitter;
	let telegram = form?.social?.values.telegram ?? data.store.info?.telegram;
</script>

<section class="space-y-8">
	<header class="space-y-1" id="store">
		<h2 class="text-xl font-bold">Pengaturan Toko</h2>
		<p class="text-sm">Kelola toko Anda dengan mudah melalui menu Pengaturan Toko.</p>
	</header>

	<div class="md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg">
		<form
			method="POST"
			use:enhance={() => {
				loadingStoreForm = true;

				return async ({ result }) => {
					await applyAction(result);
					if (form?.store?.message) {
						toast.push(form?.store?.message);
					}
					invalidateAll();
					loadingStoreForm = false;
				};
			}}
			action="?/store"
			class="space-y-4"
			enctype="multipart/form-data"
		>
			<h4 class="font-semibold text-red-500">Sesuaikan Website Toko</h4>
			<div class="grid md:grid-cols-2 gap-4">
				<div class="input-group">
					<label for="store-name" class="input-label">Nama Toko</label>
					<input
						type="text"
						name="store-name"
						value={name}
						class="input {form?.store?.errors.name ? 'input-error' : ''}"
						placeholder="Nama toko"
					/>
					{#if form?.store?.errors.name}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.store?.errors.name}
						</p>
					{/if}
				</div>
				<div class="input-group">
					<label for="store-desc" class="input-label">Deskripsi Toko</label>
					<input
						type="text"
						name="store-desc"
						value={description}
						class="input"
						placeholder="Deskripsi toko"
					/>
				</div>
				<div class="input-group">
					<label for="store-email" class="input-label">Email</label>
					<input
						type="text"
						name="store-email"
						value={email}
						class="input {form?.store?.errors.storeEmail ? 'input-error' : ''}"
						placeholder="Email toko"
					/>
					{#if form?.store?.errors.email}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.store?.errors.email}
						</p>
					{/if}
				</div>
				<div class="input-group">
					<label for="store-phone" class="input-label">Nomor WhatsApp</label>
					<input
						type="text"
						name="store-phone"
						value={phone}
						class="input {form?.store?.errors.storePhone ? 'input-error' : ''}"
						placeholder="Nomor whatsapp toko"
					/>
					{#if form?.store?.errors.phone}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.store?.errors.phone}
						</p>
					{/if}
				</div>
				<div class="input-group">
					<label for="theme" class="input-label">Logo</label>
					<input
						type="file"
						class="input {form?.fee?.errors.logo ? 'input-error' : ''}"
						name="store-logo"
						accept="image/*"
					/>
					{#if form?.store?.errors.logo}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{form.store?.errors.logo}
						</p>
					{/if}
					<img src={logo} alt="logo" class="w-40" />
				</div>

				<div class="input-group">
					<label for="theme" class="input-label">Tema</label>
					<select name="store-theme" class="input" value={theme}>
						<option value="light">Terang (Default)</option>
						<option value="dark">Gelap</option>
					</select>
				</div>
				<div class="input-group">
					<label for="theme" class="input-label">Warna</label>
					<select name="store-color" class="input" value={color}>
						<option value="blue">Biru</option>
						<option value="yellow">Kuning</option>
						<option value="red">Merah</option>
					</select>
				</div>
			</div>
			<button type="submit" class="btn btn-primary w-full md:w-auto" disabled={loadingStoreForm}>
				<Save class="mr-2" size={18} />Simpan Perubahan
			</button>
		</form>
	</div>

	<div class="md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg space-y-4">
		<h4 class="font-semibold text-red-500">Setting Fee Produk</h4>

		<div>
			<div class="mb-4">
				<h5 class="font-medium">Default Fee</h5>
				<p class="text-sm">Setting fee default untuk semua produk</p>
			</div>
			<form
				method="POST"
				use:enhance={() => {
					loadingStoreForm = true;

					return async ({ result }) => {
						await applyAction(result);
						if (form?.feedefault?.message) {
							toast.push(form?.feedefault?.message);
						}
						invalidateAll();
						loadingStoreForm = false;
					};
				}}
				action="?/setdefault"
			>
				<div class="flex gap-4">
					<div class="input-group">
						<input
							type="number"
							name="fee-nominal"
							value={defaultFee}
							class="input {form?.feedefault?.errors.fee ? 'input-error' : ''}"
							placeholder="Nominal Fee"
						/>
						{#if form?.feedefault?.errors.fee}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{form.feedefault?.errors.fee}
							</p>
						{/if}
					</div>
					<button type="submit" class="btn btn-red" disabled={loadingStoreForm}>
						Set Default Fee
					</button>
				</div>
			</form>
		</div>

		<div>
			<div class="mb-4">
				<h5 class="font-medium">Custom Fee</h5>
				<p class="text-sm">Setting fee per produk</p>
			</div>
			<form
				method="POST"
				use:enhance={() => {
					loadingStoreForm = true;

					return async ({ result }) => {
						await applyAction(result);
						if (form?.fee?.message) {
							toast.push(form?.fee?.message);
						}
						invalidateAll();
						loadingStoreForm = false;
					};
				}}
				action="?/setfee"
			>
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
					<div class="input-group">
						<select
							name="fee-product"
							value={productFee}
							class="input {form?.fee?.errors.product ? 'input-error' : ''}"
						>
							<option value="">Pilih Produk</option>
							{#each data.products as product}
								<option value={product.id_produk}
									>{product.nama_group_produk} - {product.produk}</option
								>
							{/each}
						</select>
						{#if form?.fee?.errors.product}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{form.fee?.errors.product}
							</p>
						{/if}
					</div>
					<div class="input-group">
						<input
							type="number"
							name="fee-nominal"
							value={customFee}
							class="input {form?.fee?.errors.fee ? 'input-error' : ''}"
							placeholder="Nominal Fee"
						/>
						{#if form?.fee?.errors.fee}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{form.fee?.errors.fee}
							</p>
						{/if}
					</div>
				</div>

				<button type="submit" class="btn btn-red" disabled={loadingStoreForm}>Tambahkan</button>
			</form>

			<div class="overflow-x-auto border border-neutral-700 rounded-lg mt-4">
				<table class="min-w-full">
					<thead>
						<th>Produk</th>
						<th class="text-center">Up Harga</th>
						<th></th>
					</thead>
					<tbody>
						{#if data?.fees?.length > 0}
							{#each data?.fees as item}
								<tr>
									<td>{item.product}</td>
									<td class="text-center">{currency(Number(item.fee))}</td>
									<td class="md:w-20">
										<form action="?/deletefee" use:enhance method="POST">
											<input type="hidden" name="product-id" value={item.productId} />
											<button type="submit" class="text-red-500">Hapus</button>
										</form></td
									>
								</tr>
							{/each}
						{:else}
							<tr>
								<td colspan="3"><EmptyTable description="Belum ada data setting fee" /></td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg">
		<form
			method="POST"
			use:enhance={() => {
				loadingStoreInfoForm = true;

				return async ({ result }) => {
					await applyAction(result);
					if (form?.social?.message) {
						toast.push(form?.social?.message);
					}
					invalidateAll();
					loadingStoreInfoForm = false;
				};
			}}
			action="?/social"
			class="space-y-4"
		>
			<h4 class="font-semibold text-red-500">Sosial Media</h4>
			<div class="grid md:grid-cols-2 gap-4">
				<div class="input-group">
					<label for="store-tiktok" class="input-label">Tiktok</label>
					<input
						type="text"
						name="store-tiktok"
						value={tiktok}
						class="input"
						placeholder="tiktok.com/kinggaming"
					/>
				</div>
				<div class="input-group">
					<label for="store-fb" class="input-label">Facebook</label>
					<input
						type="text"
						name="store-fb"
						value={fb}
						class="input"
						placeholder="ig.com/kinggaming"
					/>
				</div>
				<div class="input-group">
					<label for="store-ig" class="input-label">Instagram</label>
					<input
						type="text"
						name="store-ig"
						value={ig}
						class="input"
						placeholder="instagram.com/kinggaming"
					/>
				</div>
				<div class="input-group">
					<label for="store-twitter" class="input-label">X/Twitter</label>
					<input
						type="text"
						name="store-twitter"
						value={twitter}
						class="input"
						placeholder="x.com/kinggaming"
					/>
				</div>
				<div class="input-group">
					<label for="store-tgram" class="input-label">Telegram</label>
					<input
						type="text"
						name="store-tgram"
						value={telegram}
						class="input"
						placeholder="t.me/6280.."
					/>
				</div>
			</div>
			<button
				type="submit"
				class="btn btn-primary w-full md:w-auto"
				disabled={loadingStoreInfoForm}
			>
				<Save class="mr-2" size={18} />Simpan Perubahan
			</button>
		</form>
	</div>
</section>
