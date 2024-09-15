<script>
	export let value = '';
	export let label = '';
</script>

<div class="input-group w-full">
	{#if label}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="input-label">{label}</label>
	{/if}
	<input class="input" type="text" bind:value on:click on:input {...$$restProps} />
</div>
