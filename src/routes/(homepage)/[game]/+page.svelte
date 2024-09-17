<script lang="ts">
	import type { PageData } from './$types';

	import type { Product } from '../type';
	import { ChevronDown, CreditCard, Search, Wallet, X } from 'lucide-svelte';

	export let data: PageData;

	let selectedProduct: Product;
	let searchValue: string = '';

	$: filteredProducts =
		searchValue.length > 0
			? data.products.filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase()))
			: data.products;
</script>

<div class="space-y-6">
	<div class="flex items-start gap-6">
		<div class="{data.theme.card} w-full drop-shadow">
			<div class="flex items-start p-4 gap-6 border-b {data.theme.border}">
				<img src={data.game.image} class="w-20 rounded-lg" alt="" />
				<div>
					<p class="text-sm opacity-50">Topup Games</p>
					<h4 class="text-4xl font-bold">{data.game.name}</h4>
				</div>
			</div>

			<div class="space-y-8 p-4">
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
									class="{data.theme.bgColor} 
									border {data.theme.border} 
									rounded-lg overflow-hidden flex items-center space-x-2 px-3 bg-opacity-50"
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
													: `${data.theme.cardButtonActive} bg-${data.color}-500/20 border border-${data.color}-500`}"
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
							<button class="{data.theme.cardButton} w-full cursor-pointer p-4">
								<div class="flex items-center justify-between gap-2 text-sm">
									<div class="flex items-center gap-2">
										<Wallet size={20} />
										<p class="font-medium">Dompet Digital (E-Wallet)</p>
									</div>
									<div class="flex items-center gap-2">
										<p class="font-medium text-{data.color}-500">Rp7.600 - Rp8.000</p>
										<ChevronDown size={20} />
									</div>
								</div>
							</button>
							<button class="{data.theme.cardButton} w-full cursor-pointer p-4">
								<div class="flex items-center justify-between gap-2 text-sm">
									<div class="flex items-center gap-2">
										<CreditCard size={20} />
										<p class="font-medium">Transfer Bank</p>
									</div>
									<div class="flex items-center gap-2">
										<p class="font-medium text-{data.color}-500">Rp7.600 - Rp8.000</p>
										<ChevronDown size={20} />
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="{data.theme.card} p-4 w-[600px] sticky top-24"></div>
	</div>
</div>
