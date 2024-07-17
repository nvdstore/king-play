<script>
	export let value = '';
	export let label = '';
</script>

<div class="input-group">
	{#if label}
		<label class="input-label">{label}</label>
	{/if}
	<input
		class="input"
		type="text"
		bind:value
		on:click
		on:input
		{...$$restProps}
	/>
</div>
