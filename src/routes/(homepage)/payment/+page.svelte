<script lang="ts">
	import { currency } from '$lib/utils/formatter';
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import { Check, CheckCircle, Clock, HelpCircle } from 'lucide-svelte';

	export let data: PageData;
	const invoice = data.invoice;
</script>

{#if data.status == 4}
	<div class={data.theme.card}>
		<div class="flex flex-col items-center justify-center space-y-6 px-5 py-10 text-center">
			<CheckCircle size={48} />
			<div class="md:w-[500px]">
				<h4 class="text-2xl font-medium text-{data.color}-500">Pembayaran Berhasil</h4>
				<p>Terima kasih! Pembayaran Anda telah berhasil diproses.</p>
				<p class="mt-2">
					Saldo atau item yang Anda beli akan segera dikirimkan ke akun Anda. Silakan cek kembali
					dalam beberapa saat. Jika ada kendala, tim dukungan kami siap membantu.
				</p>
				<p class="mt-6 font-medium">
					Selamat bermain dan nikmati pengalaman top-up yang lebih mudah dan cepat bersama kami!
				</p>
			</div>
		</div>
	</div>
{:else}
	<div class="grid md:grid-cols-[1fr_350px] gap-6 items-stretch">
		<div class={data.theme.card}>
			<div class="flex flex-col items-center justify-center space-y-6 px-5 py-10 text-center">
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
						<p class="text-sm opacity-75">Selesaikan pembayaran sebelum:</p>
						<p class="font-medium">{format(invoice.timeLimit, 'dd LLL yyyy hh:mm:ss ')}</p>
					</div>
					<p class="text-xs">ID Invoice: {invoice.idInvoice} &bull; Reff: {invoice.idInquiry}</p>
				</div>
			</div>
		</div>

		<div class="{data.theme.card} p-4 w-full text-left panduan">
			<h4 class="inline-flex items-center text-lg font-medium">
				<HelpCircle class="mr-2" /><span>Panduan Pembayaran</span>
			</h4>
			<div>
				{@html invoice.panduan}
			</div>
		</div>
	</div>
{/if}
