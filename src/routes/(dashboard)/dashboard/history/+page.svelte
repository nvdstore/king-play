<script lang="ts">
	import { format } from 'date-fns';
	import { page } from '$app/stores';

	import Datepicker from '$lib/components/datepicker.svelte';
	import TransactionList from '../transaction-list.svelte';
	import type { PageData } from './$types';
	import { DownloadCloud } from 'lucide-svelte';

	export let data: PageData;
	let startDate = $page.url.searchParams.get('start') ?? format(new Date(), 'yyyy-MM-dd');
	let endDate = $page.url.searchParams.get('end') ?? format(new Date(), 'yyyy-MM-dd');
	let limit = $page.url.searchParams.get('limit')?.toString() ?? '25';
	let pageOffset = $page.url.searchParams.get('page')?.toString() ?? '1';

	let form: HTMLFormElement;
	let timeout: number;

	const statusItem = [
		{ value: 'wait', label: 'Menunggu' },
		{ value: 'process', label: 'Sedang diproses' },
		{ value: 'done', label: 'Selesai' },
		{ value: 'cancel', label: 'Dibatalkan' },
		{ value: 'fail', label: 'Gagal' }
	];

	function debounce(cb: Function) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(cb, 700);
	}
</script>

<section class="space-y-4">
	<header class="space-y-1">
		<h2 class="text-xl font-bold">Riwayat Transaksi</h2>
		<p class="text-sm">
			Menampilkan data riwayat transaksi yang telah Anda lakukan selama periode yang dipilih.
		</p>
	</header>

	<form data-sveltekit-keepfocus bind:this={form} class="space-y-4">
		<div
			class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg"
		>
			<Datepicker
				label="Pilih Tanggal"
				bind:startDate
				bind:endDate
				isRange
				on:complete={() => form.requestSubmit()}
			/>
			<input type="hidden" name="start" bind:value={startDate} />
			<input type="hidden" name="end" bind:value={endDate} />
			<div class="input-group">
				<label for="status" class="input-label">Status Transaksi</label>
				<select name="status" class="input" on:change={() => form.requestSubmit()}>
					<option value="all">Semua Transaksi</option>
					{#each statusItem as item}
						<option value={item.value}>{item.label}</option>
					{/each}
				</select>
			</div>
			<div class="input-group">
				<label for="search" class="input-label">Pencarian</label>
				<input
					type="text"
					class="input"
					name="search"
					placeholder="Cari data transaksi"
					on:input={() => debounce(() => form.requestSubmit())}
				/>
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<select bind:value={limit} name="limit" class="input" on:change={() => form.requestSubmit()}>
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
	</form>

	<TransactionList data={data.transactions} limit={Number(limit)} total={data.count} />
</section>
