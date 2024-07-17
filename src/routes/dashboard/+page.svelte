<script>
	import { ArrowUp, BadgeCheckIcon, CircleX, Clock, RefreshCcw } from 'lucide-svelte';

	import TransactionList from './transaction-list.svelte';
</script>

<section class="space-y-6">
	<h2 class="text-xl font-bold mb-4">Transaksi Hari Ini</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
		<div class="card card-default">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">120</p>
					<ArrowUp class="text-green-500" />
				</div>
				<p class="text-sm text-neutral-300">Total Transaksi</p>
			</div>
		</div>
		<div class="card card-default">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">10</p>
					<ArrowUp class="text-green-500" />
				</div>
				<p class="text-sm text-neutral-300">Total Penjualan</p>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div class="card card-yellow">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">2</p>
					<Clock />
				</div>
				<p class="text-sm text-neutral-300">Menunggu</p>
			</div>
		</div>
		<div class="card card-blue">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">0</p>
					<RefreshCcw />
				</div>
				<p class="text-sm text-neutral-300">Dalam Proses</p>
			</div>
		</div>
		<div class="card card-green">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">120</p>
					<BadgeCheckIcon />
				</div>
				<p class="text-sm text-neutral-300">Sukses</p>
			</div>
		</div>
		<div class="card card-red">
			<div class="p-6 space-y-2">
				<div class="flex items-center justify-between">
					<p class="text-3xl font-bold">1</p>
					<CircleX />
				</div>
				<p class="text-sm text-neutral-300">Gagal</p>
			</div>
		</div>
	</div>

	<h2 class="text-xl font-bold mb-4">Transaksi Terbaru</h2>
	<TransactionList hideFilter />
</section>

<style>
	.card {
		@apply border shadow-lg rounded-lg cursor-pointer;
	}
	.card.card-default {
		@apply bg-neutral-700 bg-opacity-50 hover:bg-opacity-60 transition-all border-neutral-700 backdrop-blur-sm;
	}
	.card.card-yellow {
		@apply bg-yellow-700 bg-opacity-50 hover:bg-opacity-60 transition-all border-yellow-800 backdrop-blur-sm;
	}
	.card.card-blue {
		@apply bg-blue-700 bg-opacity-50 hover:bg-opacity-60 transition-all border-blue-800 backdrop-blur-sm;
	}
	.card.card-green {
		@apply bg-green-700 bg-opacity-50 hover:bg-opacity-60 transition-all border-green-800 backdrop-blur-sm;
	}
	.card.card-red {
		@apply bg-red-700 bg-opacity-50 hover:bg-opacity-60 transition-all border-red-800 backdrop-blur-sm;
	}
</style>
