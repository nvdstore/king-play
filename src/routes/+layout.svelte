<script>
	import '../app.css';

	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { navigating } from '$app/stores';

	const toastOpts = {};

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

<SvelteToast options={toastOpts} />

<slot />
