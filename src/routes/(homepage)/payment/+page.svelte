<script lang="ts">
	import { format } from 'date-fns';
	import { id } from 'date-fns/locale';
	import { Copy, HelpCircle } from 'lucide-svelte';

	import { currency } from '$lib/utils/formatter';
	import type { PageData } from './$types';
	import { copyText } from '$lib/utils/clipboard';

	export let data: PageData;
	const invoice = data.invoice;
</script>

{#if data.status == 4}
	<div class={data.theme.card}>
		<div class="flex flex-col items-center justify-center space-y-6 px-5 py-10 text-center">
			<img
				src="https://img.icons8.com/?size=100&id=RifiHoZHwbPM&format=png&color=000000"
				alt="success"
			/>

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
	<div class="grid md:grid-cols-[1fr_350px] gap-6 items-start">
		<div class="flex flex-col items-center justify-center space-y-6 md:px-5 text-center">
			<div class="flex flex-col items-center space-y-2">
				<img
					src="https://img.icons8.com/?size=100&id=n7FpOs5tCs7E&format=png&color=000000"
					alt="waiting"
				/>
				<h4 class="text-2xl font-medium">{data.flag}</h4>
			</div>

			<div>
				<div class="flex items-center gap-4">
					<h4 class="font-bold text-4xl text-{data.color}-500">{currency(invoice.total)}</h4>
					<button on:click={() => copyText(invoice.total)}><Copy size={20} /></button>
				</div>

				<p class="text-sm opacity-75">Total Bayar</p>
			</div>

			<div class="space-y-4">
				{#if data.typeInvoice == 'QR'}
					<div>
						<div class="p-2 border rounded-lg inline-flex bg-white">
							<img src={data.qrData} alt="qr" class="w-200" />
						</div>
						<div class="flex flex-col items-center mt-2 space-y-4">
							<p class="text-sm font-medium mt-2">
								Pindai kode QR diatas dengan Aplikasi Pembayaran
							</p>
							<a href={data.qrData} class="btn btn-{data.color}" download>Download Kode QR</a>
						</div>
					</div>
				{:else if data.typeInvoice == 'VA'}
					<div class="p-4 border rounded-lg inline-flex flex-col bg-white">
						<div class="mb-2 text-left">
							<img src={data.logoChannel} class="w-20" alt={data.namaChannel} />
							<p class="text-xs mt-1">Nomor Virtual Account</p>
						</div>

						<div class="flex items-center gap-2">
							<h4 class="text-2xl font-medium text-{data.color}-500">{data.virtualAccount}</h4>
							<button on:click={() => copyText(data.virtualAccount)}><Copy size={16} /></button>
						</div>
					</div>
				{:else if data.typeInvoice == 'RETAIL'}
					<div class="p-4 border rounded-lg inline-flex flex-col bg-white">
						<div class="mb-2 text-left">
							<img src={data.logoChannel} class="w-20" alt={data.namaChannel} />
							<p class="text-xs mt-1">Kode Pembayaran</p>
						</div>

						<div class="flex items-center gap-2">
							<h4 class="text-2xl font-medium text-{data.color}-500">{data.paymentCode}</h4>
							<button on:click={() => copyText(data.paymentCode)}><Copy size={16} /></button>
						</div>
					</div>
				{:else}
					<a href={invoice.checkoutUrl} target="_blank" class="btn btn-red uppercase">
						Selesaikan Pembayaran
					</a>
				{/if}

				<div>
					<p class="text-sm opacity-75">Selesaikan pembayaran sebelum:</p>
					<p class="font-medium">
						{format(invoice.timeLimit, 'dd LLLL yyyy hh:mm:ss ', { locale: id })}
					</p>
				</div>
				<p class="text-xs">ID Invoice: {invoice.idInvoice} &bull; Reff: {invoice.idInquiry}</p>
			</div>

			<div class="border border-{data.color}-500 bg-{data.color}-500/10 rounded-lg p-4 text-sm">
				<p>
					Harap Simpan Invoice Anda. Pastikan Anda menyimpan ID Invoice <b>{invoice.idInvoice}</b>
					di atas sebagai bukti pembayaran. Invoice ini juga telah kami kirimkan ke email yang Anda
					daftarkan. (Jika email tidak ditemukan, harap cek folder <b>Spam</b>).<br /><br />Jika
					Anda mengalami kendala dalam transaksi, silakan hubungi CS/Admin melalui tombol di bawah
					ini:<br />
					<a
						href="https://t.me/kingplay.id"
						target="_blank"
						class="text-{data.color}-500 hover:underline"
					>
						Hubungi Admin via Telegram.
					</a><br /><br />Kami siap membantu Anda! 😊
				</p>
			</div>
		</div>

		<div class="{data.theme.card} p-4 w-full text-left panduan">
			<h4 class="inline-flex items-center text-lg font-medium">
				<HelpCircle class="mr-2" /><span>Panduan Pembayaran</span>
			</h4>
			<div class="mt-2">
				{@html invoice.panduan}
			</div>
		</div>
	</div>
{/if}
