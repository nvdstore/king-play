<script>
	import { ChevronLeft, ChevronRight, DownloadCloud, Inbox, SortAsc } from 'lucide-svelte';

	import EmptyTable from './empty-table.svelte';

	export let hideFilter = false;
	export let data = ['hehe'];
	export let page = '25';
</script>

<div class="space-y-6">
	<div class="space-y-4">
		{#if !hideFilter}
			<div class="flex items-center space-x-4">
				<select bind:value={page} name="status" class="input">
					<option value="10">10 Entries</option>
					<option value="25">25 Entries</option>
					<option value="50">50 Entries</option>
					<option value="100">100 Entries</option>
				</select>
				<button class="btn">
					<DownloadCloud size={18} class="md:mr-2" />
					<span class="hidden md:block">Ekspor ke XLSX</span>
				</button>
			</div>
		{/if}

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
						<tr>
							<td>
								WHE-2q383928
								<dl class="lg:hidden mt-2">
									<dt>#203029302</dt>
									<dt class="mb-1">Mobile Legends 20 Diamond</dt>
									<dt class="md:hidden text-xs text-neutral-400">Tgl: 10/06/2024</dt>
								</dl>
							</td>
							<td class="hidden lg:table-cell">203029302</td>
							<td class="hidden lg:table-cell">Mobile Legends 20 Diamond</td>
							<td>Rp20.000</td>
							<td class="hidden md:table-cell">10/06/2024</td>
							<td>Sukses</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6"><EmptyTable description="Belum ada data transaksi" /></td>
						</tr>
					{/if}
				</tbody>
			</table>

			{#if data.length > 0}
				<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700">
					<span class="text-xs text-neutral-400">Menampilkan halaman 1 dari 1</span>
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
	</div>
</div>
