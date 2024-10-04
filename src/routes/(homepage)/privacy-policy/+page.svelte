<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Kebijakan Privasi - {data.store.name}</title>
</svelte:head>

<h1 class="text-xl text-{data.color}-500 font-medium mb-5">Kebijakan Privasi</h1>
<p>
	Di KingPlay, kami sangat menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
	mengumpulkan, menggunakan, dan melindungi informasi pribadi yang Anda berikan melalui situs web
	kami. Dengan menggunakan layanan kami, Anda setuju dengan pengumpulan dan penggunaan informasi
	sesuai dengan kebijakan ini.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">1. Informasi yang Kami Kumpulkan</h2>
<p>
	Kami mengumpulkan beberapa jenis informasi untuk berbagai tujuan, termasuk untuk menyediakan dan
	meningkatkan layanan kami kepada Anda. Jenis informasi yang kami kumpulkan meliputi:
</p>
<ul class="list-decimal ml-5">
	<li>
		<strong>Informasi Pribadi:</strong> Saat Anda mendaftar di KingPlay, kami mungkin meminta Anda untuk
		memberikan informasi pribadi seperti nama, alamat email, dan informasi kontak lainnya.
	</li>
	<li>
		<strong>Data Penggunaan:</strong> Kami juga dapat mengumpulkan informasi tentang bagaimana situs
		web diakses dan digunakan, seperti alamat IP, jenis browser, halaman yang dilihat, dan waktu kunjungan.
	</li>
</ul>

<h2 class="text-md text-{data.color}-500 font-medium">2. Penggunaan Informasi</h2>
<p>KingPlay menggunakan data yang kami kumpulkan untuk tujuan berikut:</p>
<ul class="list-decimal ml-5">
	<li>Menyediakan dan memelihara layanan kami.</li>
	<li>Mengirimkan pembaruan, penawaran, dan informasi lainnya yang relevan kepada pengguna.</li>
	<li>Menganalisis bagaimana situs kami digunakan agar dapat meningkatkan layanan.</li>
	<li>
		Menjaga keamanan situs web dan melindungi pengguna dari penipuan atau aktivitas yang tidak sah.
	</li>
</ul>

<h2 class="text-md text-{data.color}-500 font-medium">3. Perlindungan Data</h2>
<p>
	Kami mengambil langkah-langkah yang wajar untuk melindungi informasi pribadi Anda dari akses yang
	tidak sah, penggunaan yang tidak sah, atau pengungkapan. Namun, perlu diingat bahwa tidak ada
	metode transmisi data melalui internet yang 100% aman. Oleh karena itu, kami tidak dapat menjamin
	keamanan absolut.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">4. Pembagian Informasi</h2>
<p>
	Kami tidak akan menjual, menukar, atau memberikan informasi pribadi Anda kepada pihak ketiga tanpa
	persetujuan Anda, kecuali dalam keadaan tertentu seperti memenuhi kewajiban hukum atau untuk
	melindungi hak-hak kami.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">5. Cookies</h2>
<p>
	KingPlay menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file kecil
	yang disimpan di perangkat Anda dan memungkinkan situs web mengenali browser Anda. Anda dapat
	mengatur browser Anda untuk menolak semua cookies atau memberi tahu ketika cookies sedang dikirim.
	Namun, beberapa bagian dari situs mungkin tidak berfungsi dengan baik jika Anda menonaktifkan
	cookies.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">6. Perubahan Kebijakan Privasi</h2>
<p>
	Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu. Kami akan memberi tahu Anda tentang
	perubahan tersebut dengan memposting kebijakan yang diperbarui di halaman ini. Kami sarankan Anda
	meninjau Kebijakan Privasi ini secara berkala untuk mengetahui perubahan apa pun.
</p>

<h2 class="text-md text-{data.color}-500 font-medium">7. Kontak Kami</h2>
<p>
	Jika Anda memiliki pertanyaan atau masalah mengenai Kebijakan Privasi ini, Anda dapat menghubungi
	kami melalui email di: <a
		class="text-{data.color}-500 hover:underline"
		href="mailto:privacy@kingplay.id">privacy@kingplay.id</a
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
