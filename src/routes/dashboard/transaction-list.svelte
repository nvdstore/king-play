<script>
	import { ChevronLeft, ChevronRight, Inbox } from 'lucide-svelte';

	import Datepicker from '$lib/components/datepicker.svelte';
	import SelectInput from '$lib/components/select-input.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	export let hideFilter = false;
	export let data = ['hehe'];

	let startDate = new Date();
	let endDate = new Date();
</script>

<div class="space-y-6">
	{#if !hideFilter}
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<Datepicker label="Pilih Tanggal" bind:startDate bind:endDate isRange />
			<SelectInput
				label="Status Transaksi"
				placeholder="Pilih status Transaksi"
				value="all"
				options={[
					{ value: 'all', label: 'Semua Status' },
					{ value: 'wait', label: 'Menunggu' },
					{ value: 'process', label: 'Sedang diproses' },
					{ value: 'done', label: 'Selesai' },
					{ value: 'cancel', label: 'Dibatalkan' },
					{ value: 'fail', label: 'Gagal' }
				]}
			/>
			<TextInput label="Pencarian" placeholder="Cari data transaksi" />
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
						<td colspan="6">
							<div class="space-y-1 flex flex-col items-center justify-center min-h-[200px]">
								<Inbox size={32} />
								<div class="space-y-0 5 text-center">
									<h2 class="text-lg">Tidak ada data</h2>
									<p>Belum ada data tramsaksi</p>
								</div>
							</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>


		{#if data.length > 0}
			<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700">
				<span class="text-xs text-neutral-400">Menampilkan halaman 1 dari 1</span>
				<div class="flex items-center space-x-2">
					<button class="p-2 rounded-full hover:bg-neutral-700 transition-all"
						><ChevronLeft size={18} /></button
					>
					<button class="p-2 rounded-full hover:bg-neutral-700 transition-all"
						><ChevronRight size={18} /></button
					>
				</div>
			</div>
		{/if}
	</div>
</div>
