<script lang="ts">
	import { tick } from 'svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';
	import { ChevronDown, ChevronUp, Search, Wallet, X, Landmark, CircleHelp } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Swal from 'sweetalert2';

	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { navigating } from '$app/stores';

	import { currency } from '$lib/utils/formatter';
	import type { PaymentChannel, PaymentChannelGroup, Product } from '$lib/type';

	import type { ActionData, PageData } from './$types';
	import { showLoader } from '$lib/stores/general';

	export let data: PageData;

	let form: HTMLFormElement;
	let submitForm: HTMLFormElement;
	let selectedProduct: Product | null = data.selectedProduct;
	let searchValue: string = '';
	let selectedGroupChannel: PaymentChannelGroup | null = null;
	let selectedChannel: PaymentChannel | null = null;
	let showAll = false;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const formData = new FormData(event.currentTarget);

		if (!formData.get('id_pelanggan_1')) {
			scrollToTargetAdjusted('inputIdpel');
			return toast.push('Masukkan ID Anda');
		}

		const product = selectedProduct?.id.toString() ?? '';
		if (!product) {
			scrollToTargetAdjusted('listProduct');
			return toast.push('Pilih produk terlebih dahulu');
		}

		const channel = selectedChannel?.id.toString() ?? '';
		if (!channel) {
			scrollToTargetAdjusted('payMethod');
			return toast.push('Pilih metode pembayaran Anda');
		}

		formData.append('product', product);
		formData.append('channel', channel);

		$showLoader = true;

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			const resData = result.data as ActionData;
			if (resData && resData.code != '00') {
				Swal.fire({
					title: 'Whoops!',
					icon: 'warning',
					text: resData.message ?? 'Terjadi kesalahan pada sistem',
					customClass: { confirmButton: `bg-${data.color}-500` }
				});

				$showLoader = false;
			} else {
				const invoiceAdditional = resData?.additional;
				const checkoutUrl = invoiceAdditional?.response_invoice_detail?.checkout_url;
				if (checkoutUrl) {
					const base64Data = btoa(JSON.stringify(resData));
					const url = new URLSearchParams();
					url.append('d', base64Data);
					window.location.href = '/payment' + '?' + url.toString();
				}
			}

			await invalidateAll();
		} else {
			$showLoader = false;
		}

		applyAction(result);
	}

	async function handleSelectProduct(product: Product) {
		if (product.status == 0) return;

		scrollToTargetAdjusted('payMethod');

		selectedProduct = product;
		selectedChannel = null;

		await tick();
		form.requestSubmit();
	}

	function handleSelectGroupChannel(group: PaymentChannelGroup) {
		if (!selectedProduct) {
			return toast.push('Pilih produk terlebih dahulu');
		}

		if (selectedGroupChannel?.id != group.id) {
			selectedGroupChannel = group;
		} else {
			selectedGroupChannel = null;
		}
	}

	function handleSelectChannel(channel: PaymentChannel) {
		selectedChannel = channel;
	}

	function scrollToTargetAdjusted(targetId: string, offset = 10) {
		const element: HTMLElement | null = document.getElementById(targetId);
		const elementPosition = element?.getBoundingClientRect().top;
		const offsetPosition = elementPosition ?? 0 + window.pageYOffset - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}

	$: filteredProducts =
		searchValue.length > 0
			? data.products.filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase()))
			: showAll
				? data.products
				: data.products?.slice(0, 9);
</script>

<div class="flex flex-col md:flex-row items-start gap-2 md:gap-6">
	<main class="md:{data.theme.card} w-full">
		<div
			class="flex items-start md:p-4 gap-6 {data.theme.bgColor} md:border-b {data.theme
				.border} rounded-t-lg md:sticky top-[4.5rem] z-10 bg-opacity-75 backdrop-blur-md"
		>
			<img src={data.game.image} class="w-[72px] aspect-square rounded-lg" alt="" />
			<div>
				<p class="text-sm opacity-50">Topup Games</p>
				<h4 class="text-3xl font-bold">{data.game.name}</h4>
			</div>
		</div>

		<form
			bind:this={submitForm}
			method="post"
			on:submit|preventDefault={handleSubmit}
			data-sveltekit-keepfocus
			data-sveltekit-noscroll
			class="space-y-8 md:p-4 py-6"
		>
			<div class="w-full flex items-start gap-6" id="inputIdpel">
				<h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block">1.</h1>
				<div class="space-y-4 w-full">
					<div>
						<h4 class="font-medium">
							<span class="md:hidden">1. </span>Masukkan Game ID {data.game.name} Anda
						</h4>
						<p class="text-sm opacity-50">
							Silahkan anda mengisi dengan game ID anda, contoh : 213123123
						</p>
					</div>
					{#if data.game.fields && data.game.fields?.length > 0}
						<div class="grid {data.game.fields?.length % 2 == 0 ? 'md:grid-cols-2' : ''} gap-4">
							{#each data.game.fields as field}
								{#if field.type == 'dropdown'}
									<select
										class={data.theme.input}
										name={field.target}
										placeholder={field.placeholder}
										required={field.required}
									>
										{#each JSON.parse(field.options) as option}
											<option value={option.value}>{option.label}</option>
										{/each}
									</select>
								{:else}
									<input
										class={data.theme.input}
										name={field.target}
										placeholder={field.placeholder}
										required={field.required}
									/>
								{/if}
							{/each}
						</div>
					{:else}
						<div class="flex items-center gap-4">
							<input
								name="id_pelanggan_1"
								class="{data.theme.input} flex-1"
								placeholder="Masukkan ID Anda"
							/>
						</div>
					{/if}
				</div>
			</div>

			<div class="w-full flex items-center space-x-8 flex-1 -ml-13" id="listProduct">
				<div class="w-full flex items-start gap-6">
					<h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block">2.</h1>
					<div class="space-y-4 w-full">
						<div>
							<h4 class="font-medium">
								<span class="md:hidden">2. </span>Pilih jumlah {data.game.itemName ?? 'item'} yang ingin
								anda beli
							</h4>
							<p class="text-sm opacity-50">Pilih berapa banyak yang ingin anda beli</p>
						</div>
						<div class="space-y-4">
							<div
								class="{data.theme.input} 
									overflow-hidden flex items-center space-x-2 px-3 bg-opacity-50"
							>
								<div class="flex-1">
									<Search size={18} class={data.theme.bgColor} />
								</div>
								<input
									bind:value={searchValue}
									type="text"
									class="bg-transparent outline-none h-10 w-full text-sm"
									placeholder="Cari produk"
								/>
								{#if searchValue.length > 0}
									<button type="button" on:click={() => (searchValue = '')}>
										<X size={18} class={data.theme.bgColor} />
									</button>
								{/if}
							</div>

							<div class="space-y-2">
								<h4 class="text-sm opacity-50">
									{searchValue.length > 0
										? `Pencarian produk: ${searchValue}`
										: `Semua Produk (${filteredProducts?.length})`}
								</h4>
								<div class="grid grid-cols-3 gap-2">
									{#each showAll || searchValue ? filteredProducts : filteredProducts ?? [] as product}
										<button
											type="button"
											class="flex flex-col items-center gap-2 cursor-pointer h-auto p-2 {product.status ==
											0
												? 'opacity-50 cursor-not-allowed'
												: ''} {selectedProduct?.id != product.id
												? data.theme.cardButton
												: `${data.theme.cardButtonActive} border border-${data.color}-500`}"
											on:click={() => handleSelectProduct(product)}
										>
											<img src={data.game.itemImg} class="w-10" alt="icon" />
											<span class="text-sm line-clamp-2">{product.name}</span>
										</button>
									{/each}
								</div>
							</div>
							{#if !searchValue && filteredProducts?.length >= 9}
								<button
									type="button"
									class="flex items-center justify-center w-full text-sm gap-1"
									on:click={() => (showAll = !showAll)}
								>
									<span>{showAll ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Semua Produk'}</span>
									{#if showAll}
										<ChevronUp size={24} />
									{:else}
										<ChevronDown size={24} />
									{/if}
								</button>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<div class="w-full flex items-start gap-6" id="payMethod">
				<h1 class="font-bold text-4xl opacity-75 w-[40px] text-right hidden md:block">3.</h1>
				<div class="space-y-4 w-full">
					<div>
						<h4 class="font-medium">
							<span class="md:hidden">3. </span>Pilih Metode Pembayaran
						</h4>
						<p class="text-sm opacity-50">Silahkan Pilih Metode Bayar</p>
					</div>
					<div class="space-y-2">
						{#each data.channels as group}
							<div
								class="{data.theme.cardButton} w-full px-0 {$navigating
									? 'opacity-60 pointer-events-none'
									: ''}"
							>
								<button
									type="button"
									class="flex items-center justify-between gap-2 text-sm p-4 w-full cursor-pointer"
									on:click={() => handleSelectGroupChannel(group)}
									disabled={$navigating ? true : false}
								>
									<div class="flex items-center gap-2">
										{#if group.type == 'EWALLET'}
											<Wallet size={20} />
										{:else if group.type == 'BANK'}
											<Landmark size={20} />
										{/if}
										<p class="font-medium">{group.label}</p>
									</div>
									{#if selectedGroupChannel?.id != group.id}
										<ChevronDown size={20} />
									{:else}
										<ChevronUp size={20} />
									{/if}
								</button>

								{#if selectedGroupChannel?.id == group.id}
									<div
										class="p-2 border-t space-y-2 {data.theme.border}"
										in:slide={{ duration: 200 }}
									>
										{#each group.channels as channel}
											<button
												type="button"
												class="flex items-center justify-between w-full p-2 rounded-md
												{selectedChannel?.id != channel.id
													? data.theme.cardButton
													: `${data.theme.cardButtonActive} border border-${data.color}-500`}"
												on:click={() => handleSelectChannel(channel)}
											>
												<div class="flex items-center gap-3">
													<div class="bg-white p-1 rounded-md">
														<img
															src={channel.image}
															class="w-20 h-5 object-scale-down"
															alt={channel.name}
														/>
													</div>
													<p class="text-sm">{channel.name}</p>
												</div>
												<div class="font-semibold text-{data.color}-500">
													{channel.price ? currency(channel.price) : ''}
												</div>
											</button>
										{/each}
									</div>
								{/if}

								<button
									type="button"
									on:click={() => handleSelectGroupChannel(group)}
									class="flex items-center justify-end border-t {data.theme
										.border} px-4 py-2 w-full"
								>
									<div class="flex items-center justify-end gap-1 flex-wrap">
										{#each group.images as img}
											<div class="bg-neutral-50 rounded-md p-1">
												<img src={img} class="w-20 h-4 object-scale-down" alt="payment-channel" />
											</div>
										{/each}
									</div>
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</form>

		<form bind:this={form} class="hidden" data-sveltekit-noscroll data-sveltekit-keepfocus>
			<input type="hidden" name="product" value={selectedProduct?.id} />
		</form>
	</main>

	<aside class="w-full md:w-[600px] sticky top-24 space-y-6">
		<div class="{data.theme.cardButton} p-4 space-y-2">
			<div>
				<div class="py-2">
					<span class="text-sm bg-opacity-50">Game:</span>
					<p class="font-medium">{data.game.name}</p>
				</div>
				<div class="py-2">
					<span class="text-sm bg-opacity-50">Produk:</span>
					<p class="font-medium">{selectedProduct?.name ?? '-'}</p>
				</div>
				<div class="py-2">
					<span class="text-sm bg-opacity-50">Metode Pembayaran:</span>
					<div class="flex items-center space-x-2">
						{#if selectedChannel}
							<div class="bg-white p-1 rounded-md">
								<img
									src={selectedChannel?.image}
									class="w-20 h-4 object-scale-down"
									alt={selectedChannel?.name}
								/>
							</div>
						{/if}
						<p class="font-medium">{selectedChannel?.name ?? '-'}</p>
					</div>
				</div>
				{#if selectedChannel}
					<div class="py-2">
						<span class="text-sm bg-opacity-50">Total Pembayaran:</span>
						<p class="font-semibold text-lg text-{data.color}-500">
							{selectedChannel?.price ? currency(selectedChannel.price) : '-'}
						</p>
					</div>
				{/if}
			</div>
			<button class="btn btn-red w-full" on:click={() => submitForm.requestSubmit()}>
				Bayar Sekarang
			</button>
		</div>

		{#if selectedChannel}
			<div class="{data.theme.card} p-4 space-y-4">
				<div class="flex items-center gap-2 font-medium">
					<CircleHelp />
					<span>Cara Pembayaran {selectedChannel.name}</span>
				</div>
				<div class="helper">{@html selectedChannel.helper}</div>
			</div>
		{/if}
	</aside>
</div>
