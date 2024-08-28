<script>
	import '../app.css';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	const toastOpts = {};
</script>

<SvelteToast options={toastOpts} />
<slot />
