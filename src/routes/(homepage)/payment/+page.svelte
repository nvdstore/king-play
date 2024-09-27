<script lang="ts">
	import { currency } from '$lib/utils/formatter';
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import { Check, Clock } from 'lucide-svelte';

	export let data: PageData;
	const invoice = data.invoice;
</script>

<div class=" {data.theme.card}">
	<div class="flex flex-col items-center justify-center space-y-6 px-5 py-10 text-center">
		{#if data.status == 2}
			<Check size={48} />
			<h4 class="text-2xl font-medium">Pembayaran Berhasil</h4>
		{:else}
			<Clock size={48} />
			<h4 class="text-2xl font-medium">{data.flag}</h4>

			<div>
				<h4 class="font-bold text-4xl text-{data.color}-500">{currency(invoice.total)}</h4>
				<p class="text-sm opacity-75">Total Bayar</p>
			</div>

			<div class="space-y-4">
				<a href={invoice.checkoutUrl} target="_blank" class="btn btn-red uppercase">
					Selesaikan Pembayaran
				</a>
				<div>
					<p class="text-sm opacity-75">Selesaikan pemabayaran sebelum:</p>
					<p class="font-medium">{format(invoice.timeLimit, 'dd LLL yyyy hh:mm:ss ')}</p>
				</div>
				<p class="text-xs">ID Invoice: {invoice.idInvoice} &bull; Reff: {invoice.idInquiry}</p>
			</div>
		{/if}
	</div>
</div>
