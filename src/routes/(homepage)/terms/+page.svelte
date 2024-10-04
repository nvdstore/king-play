<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Syarat &amp; Ketentuan - {data.store.name}</title>
</svelte:head>

<h1 class="text-xl text-{data.color}-500 font-medium mb-5">Syarat dan Ketentuan</h1>
<p>
	Selamat datang di KingPlay! Syarat dan Ketentuan ini mengatur penggunaan situs web kami. Dengan
	mengakses dan menggunakan layanan KingPlay, Anda setuju untuk mematuhi Syarat dan Ketentuan
	berikut. Harap baca dengan seksama sebelum menggunakan layanan kami.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">1. Penerimaan Syarat</h2>
<p>
	Dengan mengakses situs web KingPlay, Anda menyatakan bahwa Anda telah membaca, memahami, dan
	setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan salah satu
	bagian dari ketentuan ini, harap jangan menggunakan layanan kami.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">2. Modifikasi Layanan</h2>
<p>
	KingPlay berhak untuk mengubah atau menghentikan layanan kapan saja tanpa pemberitahuan
	sebelumnya. Kami juga dapat memperbarui Syarat dan Ketentuan ini kapan saja, dan perubahan
	tersebut akan berlaku segera setelah dipublikasikan di situs kami. Anda bertanggung jawab untuk
	meninjau syarat-syarat ini secara berkala.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">3. Penggunaan yang Diperbolehkan</h2>
<p>
	Anda setuju untuk menggunakan situs KingPlay hanya untuk tujuan yang sah dan sesuai dengan Syarat
	dan Ketentuan ini. Anda tidak diperbolehkan menggunakan situs web kami untuk:
</p>
<ul class="list-decimal ml-5">
	<li>Menyebarkan konten yang melanggar hukum, menipu, menghina, atau merugikan orang lain.</li>
	<li>
		Melakukan tindakan yang dapat merusak, membebani, atau membahayakan operasi situs web kami.
	</li>
	<li>
		Menyalin, menjual, atau memanfaatkan bagian dari situs web kami tanpa izin tertulis dari kami.
	</li>
</ul>

<h2 class="text-md text-{data.color}-500 font-medium">4. Pendaftaran Akun</h2>
<p>
	Beberapa fitur di KingPlay mungkin memerlukan pendaftaran akun. Anda setuju untuk memberikan
	informasi yang benar dan lengkap selama proses pendaftaran, serta menjaga kerahasiaan kata sandi
	dan detail akun Anda. Anda bertanggung jawab atas semua aktivitas yang terjadi di akun Anda.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">5. Batasan Tanggung Jawab</h2>
<p>
	KingPlay tidak bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, atau
	konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami. Kami
	menyediakan situs web "sebagaimana adanya" dan tidak memberikan jaminan mengenai keakuratan atau
	ketersediaan konten.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">6. Hak Kekayaan Intelektual</h2>
<p>
	Seluruh konten yang disediakan di KingPlay, termasuk teks, gambar, logo, dan perangkat lunak,
	dilindungi oleh undang-undang hak cipta dan hak kekayaan intelektual lainnya. Anda tidak boleh
	menggunakan konten ini tanpa izin tertulis dari kami atau pemilik konten terkait.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">7. Penghentian Layanan</h2>
<p>
	Kami dapat menghentikan akses Anda ke situs web atau layanan kami kapan saja jika Anda melanggar
	Syarat dan Ketentuan ini. Penghentian tersebut dapat dilakukan tanpa pemberitahuan sebelumnya dan
	kami tidak bertanggung jawab atas konsekuensi yang timbul dari penghentian tersebut.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">8. Hukum yang Berlaku</h2>
<p>
	Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di wilayah
	hukum kami. Segala sengketa yang timbul terkait penggunaan layanan kami akan diselesaikan sesuai
	dengan peraturan perundang-undangan yang berlaku.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">9. Kontak Kami</h2>
<p>
	Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, Anda dapat menghubungi kami
	melalui email di: <a
		class="text-{data.color}-500 hover:underline"
		href="mailto:support@kingplay.com">support@kingplay.com</a
	>.
</p>

<style>
	p {
		margin-bottom: 15px;
	}
	ul {
		margin-bottom: 15px;
	}
</style>
