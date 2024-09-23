<script lang="ts">
	import { onMount } from 'svelte';
	import { format } from 'date-fns';

	import Datepicker from '$lib/components/datepicker.svelte';
	import TransactionList from '../transaction-list.svelte';

	export let startDate = format(new Date(), 'yyyy-MM-dd');
	export let endDate = format(new Date(), 'yyyy-MM-dd');

	let form: HTMLFormElement;

	const statusItem = [
		{ value: 'wait', label: 'Menunggu' },
		{ value: 'process', label: 'Sedang diproses' },
		{ value: 'done', label: 'Selesai' },
		{ value: 'cancel', label: 'Dibatalkan' },
		{ value: 'fail', label: 'Gagal' }
	];

	onMount(() => {
		if (form) {
			form.requestSubmit();
		}
	});
</script>

<section class="space-y-6">
	<header class="space-y-1">
		<h2 class="text-xl font-bold">Riwayat Transaksi</h2>
		<p class="text-sm">
			Menampilkan data riwayat transaksi yang telah Anda lakukan selama periode yang dipilih.
		</p>
	</header>

	<form
		bind:this={form}
		class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg"
	>
		<Datepicker label="Pilih Tanggal" bind:startDate bind:endDate isRange />
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
				on:input={() => form.requestSubmit()}
			/>
		</div>
	</form>

	<TransactionList />
</section>
