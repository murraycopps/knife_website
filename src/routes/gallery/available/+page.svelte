<script>
	import KnifeBox from '../KnifeBox.svelte';
	import { onMount } from 'svelte';
    
	let data = [];
	async function fetchData() {
		try {
			const response = await fetch('/api/data/gallery');
			data = await response.json();
			data = data.filter((item) => item.available == true);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	onMount(fetchData);
</script>

<div class="grid grid-cols-3 gap-4 p-4 text-center">
	{#each data as item}
		<a href={item.link}>
			<KnifeBox images={item.images} name={item.name} description={item.description} /></a
		>
	{/each}
	{#if data.length == 0}
		<h1 class="text-baseld text-center">No knives available</h1>
	{/if}
</div>
