<script>
	import { Inbox } from 'lucide-svelte';
	import TransactionList from '../transaction-list.svelte';
</script>

<section class="space-y-6">
	<header class="space-y-1">
		<h2 class="text-xl font-bold">Riwayat Transaksi</h2>
		<p class="text-sm">
			Menampilkan data riwayat transaksi yang telah Anda lakukan selama periode yang dipilih.
		</p>
	</header>

	<TransactionList />
</section>