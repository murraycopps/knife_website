<script>
	import KnifeBoxLink from './KnifeBoxLink.svelte';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		try {
			const response = await fetch('/api/data/gallery');
			data = await response.json();
			// data = data.filter((item) => item.available == true);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	onMount(fetchData);
</script>

<svelte:head>
	<title>Available knives</title>
</svelte:head>

<div class="grid grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Available knives</h1>
		<p class="text-2xl enter text-l text-white">Gallery of knives available for purchase</p>
	</div>
	{#each data as item}
		<a href={item.link}>
			<KnifeBoxLink images={item.images} name={item.name} description={item.description} link={item.link} /></a
		>
	{/each}
	{#if data.length == 0}
		<h1 class="col-span-3 text-3xl text-center text-oglala">No knives available</h1>
	{/if}
</div>
