<script lang="ts">
	import { tick } from 'svelte';
	import { format } from 'date-fns';
	import { DownloadCloud } from 'lucide-svelte';
	import { page } from '$app/stores';

	import Datepicker from '$lib/components/datepicker.svelte';
	import { TransactionStatus } from '$lib/constant';

	import type { PageData } from './$types';
	import TransactionList from '../transaction-list.svelte';

	export let data: PageData;

	let startDate = $page.url.searchParams.get('start') ?? format(new Date(), 'yyyy-MM-dd');
	let endDate = $page.url.searchParams.get('end') ?? format(new Date(), 'yyyy-MM-dd');
	let limit = $page.url.searchParams.get('limit')?.toString()
		? Number($page.url.searchParams.get('limit')?.toString())
		: data.defaultLimit;
	let pageNum = $page.url.searchParams.get('page')?.toString()
		? Number($page.url.searchParams.get('page')?.toString())
		: 1;
	let status = $page.url.searchParams.get('status') ?? 'all';
	let search = $page.url.searchParams.get('search') ?? '';

	let form: HTMLFormElement;
	let timeout: number;

	function debounce(cb: Function) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(cb, 700);
	}

	function handleExport() {
		const searchParams = new URLSearchParams();
		searchParams.append('start', startDate);
		searchParams.append('start', endDate);

		fetch(`/api/export-trx?${searchParams.toString()}`)
			.then((res) => res.blob())
			.then((blob) => {
				var file = window.URL.createObjectURL(blob);
				window.location.assign(file);
			});
	}

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
		<h2 class="text-xl font-bold">Riwayat Transaksi</h2>
		<p class="text-sm">
			Menampilkan data riwayat transaksi yang telah Anda lakukan selama periode yang dipilih.
		</p>
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
				<label for="status" class="input-label">Status Transaksi</label>
				<select
					name="status"
					class="input"
					bind:value={status}
					on:change={() => form.requestSubmit()}
				>
					<option value="all">Semua Transaksi</option>
					{#each TransactionStatus as item}
						<option value={item.key}>{item.value}</option>
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
					bind:value={search}
					on:input={() => debounce(() => form.requestSubmit())}
				/>
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<select bind:value={limit} name="limit" class="input" on:change={() => form.requestSubmit()}>
				<option value={10}>10 Entries</option>
				<option value={25}>25 Entries</option>
				<option value={50}>50 Entries</option>
				<option value={100}>100 Entries</option>
			</select>
			<button class="btn" type="button" on:click={handleExport}>
				<DownloadCloud size={18} class="md:mr-2" />
				<span class="hidden md:block">Ekspor ke XLSX</span>
			</button>
		</div>

		<input type="hidden" name="start" bind:value={startDate} />
		<input type="hidden" name="end" bind:value={endDate} />
		<input type="hidden" name="page" bind:value={pageNum} />
	</form>

	<TransactionList
		data={data.transactions}
		limit={Number(limit)}
		total={data.count}
		{pageNum}
		on:prev={handlePrev}
		on:next={handleNext}
	/>
</section>
