<script lang="ts">
	import { tick } from 'svelte';
	import { format, startOfMonth } from 'date-fns';
	import { ChevronLeft, ChevronRight, DownloadCloud } from 'lucide-svelte';
	import { page } from '$app/stores';

	import { currency } from '$lib/utils/formatter';
	import Datepicker from '$lib/components/datepicker.svelte';
	import EmptyTable from '$lib/components/empty-table.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let startDate =
		$page.url.searchParams.get('start') ?? format(startOfMonth(new Date()), 'yyyy-MM-dd');
	let endDate = $page.url.searchParams.get('end') ?? format(new Date(), 'yyyy-MM-dd');
	let limit = $page.url.searchParams.get('limit')?.toString()
		? Number($page.url.searchParams.get('limit')?.toString())
		: data.defaultLimit;
	let pageNum = $page.url.searchParams.get('page')?.toString()
		? Number($page.url.searchParams.get('page')?.toString())
		: 1;

	let form: HTMLFormElement;

	async function handlePrev() {
		if (pageNum > 1) {
			pageNum -= 1;

			await tick();
			form.requestSubmit();
		}
	}

	async function handleNext() {
		if (pageNum < 10) {
			pageNum += 1;

			await tick();
			form.requestSubmit();
		}
	}
</script>

<section class="space-y-4">
	<header class="space-y-1">
		<h2 class="text-xl font-bold">Laporan</h2>
		<p class="text-sm">Menampilkan laporan total penjualan per hari.</p>
	</header>

	<form data-sveltekit-keepfocus data-sveltekit-noscroll bind:this={form} class="space-y-4">
		<div
			class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg"
		>
			<Datepicker
				label="Pilih Tanggal"
				bind:startDate
				bind:endDate
				isRange
				on:complete={() => {
					pageNum = 1;
					form.requestSubmit();
				}}
			/>
			<div class="input-group">
				<label for="product" class="input-label">Produk</label>
				<div class="input-group">
					<select name="product" class="input" on:change={() => form.requestSubmit()}>
						<option value="all">Semua Produk</option>
						{#each data.products as product}
							<option value={product.id_group_produk}>{product.nama_group_produk}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="flex items-center space-x-4">
			<select bind:value={limit} name="limit" class="input" on:change={() => form.requestSubmit()}>
				<option value={10}>10 Entries</option>
				<option value={25}>25 Entries</option>
				<option value={50}>50 Entries</option>
				<option value={100}>100 Entries</option>
			</select>
			<button class="btn" type="button">
				<DownloadCloud size={18} class="md:mr-2" />
				<span class="hidden md:block">Ekspor ke XLSX</span>
			</button>
		</div>

		<input type="hidden" name="start" bind:value={startDate} />
		<input type="hidden" name="end" bind:value={endDate} />
		<input type="hidden" name="page" bind:value={pageNum} />
	</form>

	<div class="overflow-x-auto border border-neutral-700 rounded-lg">
		<table class="min-w-full">
			<thead>
				<th>Tanggal</th>
				<th class="hidden md:table-cell">Total Transaksi</th>
				<th>Total Rupiah</th>
				<th>Total Komisi</th>
			</thead>
			<tbody>
				{#if data.report.length > 0}
					{#each data.report as report}
						<tr>
							<td>
								{format(report.date, 'dd/MM/yyyy')}
								<dl class="lg:hidden mt-2">
									<dt>Total Transaksi: {report.totalTrx}</dt>
								</dl>
							</td>
							<td class="hidden md:table-cell">{report.totalTrx}</td>
							<td>{currency(report.totalNum)}</td>
							<td>{currency(report.totalFee)}</td>
						</tr>
					{/each}
				{:else}
					<tr>
						<td colspan="4"><EmptyTable /></td>
					</tr>
				{/if}
			</tbody>
		</table>

		{#if data.report.length > 0}
			<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700">
				<span class="text-xs text-neutral-400">
					Menampilkan data {limit} dari {data.report.length}
				</span>
				<div class="flex items-center space-x-2">
					<button
						class="p-2 rounded-full hover:bg-neutral-700 transition-all"
						on:click={handlePrev}
					>
						<ChevronLeft size={18} />
					</button>
					<div class="px-2">{pageNum}</div>
					<button
						class="p-2 rounded-full hover:bg-neutral-700 transition-all"
						on:click={handleNext}
					>
						<ChevronRight size={18} />
					</button>
				</div>
			</div>
		{/if}
	</div>
</section>
