<script>
	export let value = '';
	export let label = '';

	/**
	 * @type {{value: string, label: string}[] | []}
	 */
	export let options = [];
</script>

<div class="input-group">
	{#if label}
		<label class="input-label">{label}</label>
	{/if}
	<select class="input" bind:value on:click on:input {...$$restProps}>
		{#each options as item}
			<option value={item.value}>{item.label}</option>
		{/each}
	</select>
</div>
