<script>
	export let horizontal = false;
</script>
{#if horizontal}
<div class="w-2/3 h-0.5 my-auto rounded-sm" />
{:else}
<div class="h-12 w-0.5 my-auto rounded-sm" />
{/if}

<style>

	div {
		background-color: currentColor;
	}
</style>
