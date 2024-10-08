<script lang="ts">
	import { tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import { Save, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';

	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import EmptyTable from '$lib/components/empty-table.svelte';
	import { currency } from '$lib/utils/formatter';

	import type { ActionData, PageData } from './$types';

	export let formAction: ActionData;
	export let data: PageData;

	let pageNum = $page.url.searchParams.get('page')?.toString()
		? Number($page.url.searchParams.get('page')?.toString())
		: 1;

	let loadingStoreForm = false;
	let name = formAction?.store?.values.name ?? data.store.name;
	let description = formAction?.store?.values.desc ?? data.store.description;
	let email = formAction?.store?.values.email ?? data.store.email;
	let phone = formAction?.store?.values.phone ?? data.store.phone;
	let theme = formAction?.store?.values.theme ?? data.store.theme;
	let color = formAction?.store?.values.color ?? data.store.color;
	let logo = data.store.logo;

	let defaultFee = formAction?.feedefault?.values.fee ?? data.defaultFee;
	let productFee = formAction?.fee?.values.product ?? '';
	let groupFee = formAction?.feegroup?.values.fee ?? '';
	let groupProductFee = formAction?.feegroup?.values.groupProduct ?? '';
	let customFee = formAction?.fee?.values.fee ?? '';

	let loadingStoreInfoForm = false;
	let tiktok = formAction?.social?.values.tiktok ?? data.store.info?.tiktok;
	let fb = formAction?.social?.values.fb ?? data.store.info?.fb;
	let ig = formAction?.social?.values.ig ?? data.store.info?.ig;
	let twitter = formAction?.social?.values.twitter ?? data.store.info?.twitter;
	let telegram = formAction?.social?.values.telegram ?? data.store.info?.telegram;

	let listFeeForm: HTMLFormElement;

	async function handlePrev() {
		if (pageNum > 1) {
			pageNum -= 1;

			await tick();
			listFeeForm.requestSubmit();
		}
	}

	async function handleNext() {
		if (pageNum < 10) {
			pageNum += 1;

			await tick();
			listFeeForm.requestSubmit();
		}
	}
</script>

<section class="space-y-10">
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
					if (formAction?.store?.message) {
						toast.push(formAction?.store?.message);
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
						class="input {formAction?.store?.errors.name ? 'input-error' : ''}"
						placeholder="Nama toko"
					/>
					{#if formAction?.store?.errors.name}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{formAction.store?.errors.name}
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
						class="input {formAction?.store?.errors.storeEmail ? 'input-error' : ''}"
						placeholder="Email toko"
					/>
					{#if formAction?.store?.errors.email}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{formAction.store?.errors.email}
						</p>
					{/if}
				</div>
				<div class="input-group">
					<label for="store-phone" class="input-label">Nomor WhatsApp</label>
					<input
						type="text"
						name="store-phone"
						value={phone}
						class="input {formAction?.store?.errors.storePhone ? 'input-error' : ''}"
						placeholder="Nomor whatsapp toko"
					/>
					{#if formAction?.store?.errors.phone}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{formAction.store?.errors.phone}
						</p>
					{/if}
				</div>
				<div class="input-group">
					<label for="theme" class="input-label">Logo</label>
					<input
						type="file"
						class="input {formAction?.fee?.errors.logo ? 'input-error' : ''}"
						name="store-logo"
						accept="image/*"
					/>
					{#if formAction?.store?.errors.logo}
						<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
							{formAction.store?.errors.logo}
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

	<div class="md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg space-y-6">
		<h4 class="font-semibold text-red-500">Setting Fee Produk</h4>

		<div>
			<div class="mb-4">
				<h5 class="font-medium">Default Fee</h5>
				<p class="text-sm">
					Ubah nominal fee default untuk semua produk yang tidak termasuk di custom fee
				</p>
			</div>
			<form
				method="POST"
				use:enhance={() => {
					loadingStoreForm = true;

					return async ({ result }) => {
						await applyAction(result);
						if (formAction?.feedefault?.message) {
							toast.push(formAction?.feedefault?.message);
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
							class="input {formAction?.feedefault?.errors.fee ? 'input-error' : ''}"
							placeholder="Nominal Fee"
						/>
						{#if formAction?.feedefault?.errors.fee}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{formAction.feedefault?.errors.fee}
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
				<h5 class="font-medium">Custom Fee per Grup</h5>
				<p class="text-sm">
					Ubah nominal custom fee per grup produk (data akan diupdate jika sudah ada)
				</p>
			</div>

			<form
				method="POST"
				use:enhance={() => {
					loadingStoreForm = true;

					return async ({ result }) => {
						await applyAction(result);
						if (formAction?.feegroup?.message) {
							toast.push(formAction?.feegroup?.message);
						}
						invalidateAll();
						loadingStoreForm = false;
					};
				}}
				action="?/setfeeGroup"
			>
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
					<div class="input-group">
						<select
							name="fee-product"
							value={groupProductFee}
							class="input {formAction?.feegroup?.errors.product ? 'input-error' : ''}"
						>
							<option value="">Pilih Grup Produk</option>
							{#each data.groupProducts as product}
								<option value={product.id_group_produk}>{product.nama_group_produk}</option>
							{/each}
						</select>
						{#if formAction?.feegroup?.errors.product}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{formAction.feegroup?.errors.product}
							</p>
						{/if}
					</div>
					<div class="input-group">
						<input
							type="number"
							name="fee-nominal"
							value={groupFee}
							class="input {formAction?.feegroup?.errors.fee ? 'input-error' : ''}"
							placeholder="Nominal Fee"
						/>
						{#if formAction?.feegroup?.errors.fee}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{formAction.feegroup?.errors.fee}
							</p>
						{/if}
					</div>
				</div>

				<button type="submit" class="btn btn-red" disabled={loadingStoreForm}>Simpan</button>
			</form>
		</div>

		<div>
			<div class="mb-4">
				<h5 class="font-medium">Custom Fee</h5>
				<p class="text-sm">
					Ubah nominal custom fee per produk (data akan diupdate jika sudah ada)
				</p>
			</div>
			<form
				method="POST"
				use:enhance={() => {
					loadingStoreForm = true;

					return async ({ result }) => {
						await applyAction(result);
						if (formAction?.fee?.message) {
							toast.push(formAction?.fee?.message);
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
							class="input {formAction?.fee?.errors.product ? 'input-error' : ''}"
						>
							<option value="">Pilih Produk</option>
							{#each data.products as product}
								<option value={product.id_produk}
									>{product.nama_group_produk} - {product.produk}</option
								>
							{/each}
						</select>
						{#if formAction?.fee?.errors.product}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{formAction.fee?.errors.product}
							</p>
						{/if}
					</div>
					<div class="input-group">
						<input
							type="number"
							name="fee-nominal"
							value={customFee}
							class="input {formAction?.fee?.errors.fee ? 'input-error' : ''}"
							placeholder="Nominal Fee"
						/>
						{#if formAction?.fee?.errors.fee}
							<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
								{formAction.fee?.errors.fee}
							</p>
						{/if}
					</div>
				</div>

				<button type="submit" class="btn btn-red" disabled={loadingStoreForm}>Simpan</button>
			</form>
		</div>

		<div>
			<div class="mb-4">
				<h5 class="font-medium">Daftar Custom Fee</h5>
			</div>
			<div class="overflow-x-auto border border-neutral-700 rounded-lg mt-4">
				<table class="min-w-full">
					<thead>
						<th>Produk</th>
						<th>Grup</th>
						<th class="text-center">Fee</th>
						<th></th>
					</thead>
					<tbody>
						{#if data?.fees?.length > 0}
							{#each data?.fees as item}
								<tr>
									<td>{item.product}</td>
									<td>{item.groupProduct}</td>
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

				{#if data?.fees?.length > 0}
					<form
						data-sveltekit-keepfocus
						data-sveltekit-noscroll
						bind:this={listFeeForm}
						class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700"
					>
						<span class="text-xs text-neutral-400">Menampilkan halaman {pageNum}</span>
						<div class="flex items-center space-x-2">
							<button
								type="button"
								class="p-2 rounded-full hover:bg-neutral-700 transition-all"
								on:click={handlePrev}
							>
								<ChevronLeft size={18} />
							</button>
							<div class="px-2">{pageNum}</div>
							<button
								type="button"
								class="p-2 rounded-full hover:bg-neutral-700 transition-all"
								on:click={handleNext}
							>
								<ChevronRight size={18} />
							</button>
						</div>

						<input type="hidden" name="page" bind:value={pageNum} />
					</form>
				{/if}
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
					if (formAction?.social?.message) {
						toast.push(formAction?.social?.message);
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
