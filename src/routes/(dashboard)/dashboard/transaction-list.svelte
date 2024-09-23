<script lang="ts">
	import { ChevronLeft, ChevronRight, DownloadCloud, Inbox, SortAsc } from 'lucide-svelte';

	import EmptyTable from './empty-table.svelte';
	import type { Transcation } from '$lib/models/transactions';
	import { currency } from '$lib/utils/formatter';

	export let data: Transcation[] = [];
	export let limit: number;
	export let total: number;
</script>

<div class="overflow-x-auto border border-neutral-700 rounded-lg">
	<table class="min-w-full">
		<thead>
			<th>Invoice Number</th>
			<th class="hidden lg:table-cell">ID Transaksi</th>
			<th class="hidden lg:table-cell">Produk</th>
			<th>Harga</th>
			<th class="hidden md:table-cell">Tanggal</th>
			<th>Status</th>
		</thead>
		<tbody>
			{#if data.length > 0}
				{#each data as item}
					<tr>
						<td>
							{item.idInvoice}
							<dl class="lg:hidden mt-2">
								<dt>#{item.idTransaksi}</dt>
								<dt class="mb-1">{item.produk}</dt>
								<dt class="md:hidden text-xs text-neutral-400">Tgl: {item.tanggal}</dt>
							</dl>
						</td>
						<td class="hidden lg:table-cell">{item.idTransaksi}</td>
						<td class="hidden lg:table-cell">{item.produk}</td>
						<td>{currency(item.nominal)}</td>
						<td class="hidden md:table-cell">{item.tanggal}</td>
						<td>Sukses</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="6"><EmptyTable description="Belum ada data transaksi" /></td>
				</tr>
			{/if}
		</tbody>
	</table>

	{#if data.length > 0}
		<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700">
			<span class="text-xs text-neutral-400">Menampilkan data {limit} dari {total}</span>
			<div class="flex items-center space-x-2">
				<button class="p-2 rounded-full hover:bg-neutral-700 transition-all">
					<ChevronLeft size={18} />
				</button>
				<button class="p-2 rounded-full hover:bg-neutral-700 transition-all">
					<ChevronRight size={18} />
				</button>
			</div>
		</div>
	{/if}
</div>
