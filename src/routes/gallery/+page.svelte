<script>
	import KnifeBox from './KnifeBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getGallery();
	}

	onMount(fetchData);
</script>

<div class="grid grid-cols-3 gap-4 p-4 text-center">
	{#each data as item}
		<KnifeBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-base">No knives displayed</h1>
	{/if}
</div>
