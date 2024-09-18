<script lang="ts">
	import { ChevronDown, ChevronUp, Search, Wallet, X, Landmark } from 'lucide-svelte';

	import type { PageData } from './$types';
	import type { PaymentChannel, PaymentChannelGroup, Product } from '../type';
	import { slide } from 'svelte/transition';
	import { currency } from '$lib/utils/formatter';

	export let data: PageData;

	let selectedProduct: Product;
	let searchValue: string = '';
	let selectedGroupChannel: PaymentChannelGroup | null = null;
	let selectedChannel: PaymentChannel | null = null;

	function handleSelectGroupChannel(group: PaymentChannelGroup) {
		if (selectedGroupChannel?.id != group.id) {
			selectedGroupChannel = group;
		} else {
			selectedGroupChannel = null;
		}
	}

	$: filteredProducts =
		searchValue.length > 0
			? data.products.filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase()))
			: data.products;
</script>

<div class="flex items-start gap-6">
	<main class="{data.theme.card} w-full">
		<div
			class="flex items-start p-4 gap-6 {data.theme.bgColor} border-b {data.theme
				.border} rounded-t-lg sticky top-[4.5rem] z-10 bg-opacity-75 backdrop-blur-md"
		>
			<img src={data.game.image} class="w-[72px] aspect-square rounded-lg" alt="" />
			<div>
				<p class="text-sm opacity-50">Topup Games</p>
				<h4 class="text-3xl font-bold">{data.game.name}</h4>
			</div>
		</div>

		<div class="space-y-8 p-4 py-6">
			<div class="w-full flex items-start gap-6">
				<h1 class="font-bold text-4xl opacity-50 w-[40px] text-right">1.</h1>
				<div class="space-y-4 w-full">
					<div>
						<h4 class="font-medium">Masukkan Game ID Mobile Legends Anda</h4>
						<p class="text-sm opacity-50">
							Silahkan anda mengisi dengan game ID anda, contoh : 213123123
						</p>
					</div>
					<div class="flex items-center gap-4">
						<input class="{data.theme.input} flex-1" placeholder="Masukkan ID Anda" />
						<input class="{data.theme.input} flex-4" placeholder="ID Zona" />
					</div>
				</div>
			</div>

			<div class="w-full flex items-center space-x-8 flex-1 -ml-13">
				<div class="w-full flex items-start gap-6">
					<h1 class="font-bold text-4xl opacity-50 w-[40px] text-right">2.</h1>
					<div class="space-y-4 w-full">
						<div>
							<h4 class="font-medium">Pilih jumlah diamond yang ingin anda beli</h4>
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
									<button on:click={() => (searchValue = '')}>
										<X size={18} class={data.theme.bgColor} />
									</button>
								{/if}
							</div>

							<div class="space-y-2">
								<h4 class="text-sm opacity-50">
									{searchValue.length > 0 ? `Pencarian produk: ${searchValue}` : 'Semua Produk'}
								</h4>
								<div class="grid grid-cols-3 gap-2">
									{#each filteredProducts as product}
										<button
											class="flex flex-col items-center gap-2 cursor-pointer h-auto p-2 {selectedProduct?.id !=
											product.id
												? data.theme.cardButton
												: `${data.theme.cardButtonActive} border border-${data.color}-500`}"
											on:click={() => (selectedProduct = product)}
										>
											<img
												src="https://api.duniagames.co.id/api/product/upload/image/10519365491555755415.png"
												alt="icon"
											/>
											<span class="text-sm line-clamp-2">{product.name}</span>
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="w-full flex items-start gap-6">
				<h1 class="font-bold text-4xl opacity-50 w-[40px] text-right">3.</h1>
				<div class="space-y-4 w-full">
					<div>
						<h4 class="font-medium">Pilih Metode Pembayaran</h4>
						<p class="text-sm opacity-50">Silahkan Pilih Metode Bayar</p>
					</div>
					<div class="space-y-2">
						{#each data.channels as group}
							<div class="{data.theme.cardButton} w-full px-0">
								<button
									class="flex items-center justify-between gap-2 text-sm p-4 w-full cursor-pointer"
									on:click={() => handleSelectGroupChannel(group)}
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
												class="flex items-center justify-between w-full p-2 rounded-md
												{selectedChannel?.id != channel.id
													? data.theme.cardButton
													: `${data.theme.cardButtonActive} border border-${data.color}-500`}"
												on:click={() => (selectedChannel = channel)}
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
													{currency(channel.price)}
												</div>
											</button>
										{/each}
									</div>
								{/if}

								<div class="flex items-center justify-end border-t {data.theme.border} px-4 py-2">
									<div class="flex items-center gap-1">
										{#each group.images as img}
											<div class="bg-neutral-50 rounded-md p-1">
												<img src={img} class="w-20 h-4 object-scale-down" alt="payment-channel" />
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</main>

	<aside class="{data.theme.card} p-4 w-[600px] sticky top-24">
		<div class="space-y-4">
			<div>
				<div class="border-b {data.theme.border} py-2">
					<span class="text-sm bg-opacity-50">Game:</span>
					<p class="font-medium">{data.game.name}</p>
				</div>
				<div class="border-b {data.theme.border} py-2">
					<span class="text-sm bg-opacity-50">Produk:</span>
					<p class="font-medium">{selectedProduct?.name ?? '-'}</p>
				</div>
				<div class="py-2">
					<span class="text-sm bg-opacity-50">Metode Pembayaran:</span>
					<p class="font-medium">{selectedChannel?.name ?? '-'}</p>
				</div>
			</div>
			<button class="btn btn-red w-full">Bayar Sekarang</button>
		</div>
	</aside>
</div>
