<script>
	import '../app.css';

	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { navigating } from '$app/stores';

	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}
</script>

<SvelteToast options={{}} />

<slot />

<style>
	:root {
		--toastBackground: #efadabec;
		--toastBarBackground: #ef4444;
		--toastColor: #123456;
		--toastPadding: 5px 10px 5px 10px;
		--toastBorderRadius: 0.5rem;
	}
</style>
