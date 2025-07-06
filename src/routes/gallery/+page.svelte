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

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-evenly sm:col-span-2 lg:col-span-3 gap-8 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Gallery of past knives</h1>
		<a
			href="/gallery/available"
			class="self-center lg:w-1/3 py-2 text-2xl rounded-full text-white hover:text-oglala-400"
			>View knives available for purchase</a
		>
	</div>
	{#each data as item}
		<KnifeBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-white">No knives displayed</h1>
	{/if}
</div>

<style>
	a {
		transition: all 0.5s ease-in-out;
	}
</style>
