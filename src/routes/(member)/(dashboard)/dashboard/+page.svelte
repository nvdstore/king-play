<script lang="ts">
	import { BadgeCheckIcon, ArrowLeftRight, Clock, RefreshCcw, HandCoins } from 'lucide-svelte';
	import { page } from '$app/stores';

	import TransactionList from './transaction-list.svelte';
	import type { PageData } from './$types';
	import { currency } from '$lib/utils/formatter';

	export let data: PageData;

	let form: HTMLFormElement;
	let pageNum = $page.url.searchParams.get('page')?.toString()
		? Number($page.url.searchParams.get('page')?.toString())
		: 1;
</script>

<section class="space-y-6">
	<h2 class="text-xl font-bold mb-4">Transaksi Hari Ini</h2>
	<div class="grid grid-cols-2 gap-6">
		<div class="card card-default">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">{data.resume.total}</p>
					<ArrowLeftRight class="text-green-500" />
				</div>
				<p class="text-sm text-neutral-300">Total Transaksi</p>
			</div>
		</div>
		<div class="card card-default">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">{currency(data.resume.totalnum)}</p>
					<HandCoins class="text-green-500" />
				</div>
				<p class="text-sm text-neutral-300">Total Penjualan</p>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
		<div class="card card-yellow">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">{data.resume.waiting}</p>
					<Clock />
				</div>
				<p class="text-sm text-neutral-300">Menunggu Pembayaran</p>
			</div>
		</div>
		<div class="card card-blue">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">{data.resume.pending}</p>
					<RefreshCcw />
				</div>
				<p class="text-sm text-neutral-300">Dalam Proses</p>
			</div>
		</div>
		<div class="card card-green">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">{data.resume.success}</p>
					<BadgeCheckIcon />
				</div>
				<p class="text-sm text-neutral-300">Sukses</p>
			</div>
		</div>
	</div>

	<h2 class="text-xl font-bold mb-4">Transaksi Terbaru</h2>
	<form bind:this={form} data-sveltekit-noscroll>
		<input type="hidden" name="page" bind:value={pageNum} />
	</form>

	<TransactionList
		data={data.transactions}
		limit={data.limit}
		total={data.total}
		{pageNum}
		showNav={false}
	/>
</section>

<style>
	.card {
		@apply border shadow-lg rounded-lg cursor-pointer;
	}
	.card.card-default {
		@apply bg-neutral-600 bg-opacity-80 hover:bg-opacity-90 transition-all border-neutral-700 backdrop-blur-sm;
	}
	.card.card-yellow {
		@apply bg-yellow-600 bg-opacity-80 hover:bg-opacity-90 transition-all border-yellow-800 backdrop-blur-sm;
	}
	.card.card-blue {
		@apply bg-blue-600 bg-opacity-80 hover:bg-opacity-90 transition-all border-blue-800 backdrop-blur-sm;
	}
	.card.card-green {
		@apply bg-green-600 bg-opacity-80 hover:bg-opacity-90 transition-all border-green-800 backdrop-blur-sm;
	}
	.card.card-red {
		@apply bg-red-600 bg-opacity-80 hover:bg-opacity-90 transition-all border-red-800 backdrop-blur-sm;
	}
</style>
