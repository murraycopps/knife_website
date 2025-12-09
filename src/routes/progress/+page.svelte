<script>
	import ProgressBox from './ProgressBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getProgress();
	}

	onMount(fetchData);
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-evenly sm:col-span-2 lg:col-span-3 gap-8 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Upcoming knives and more</h1>
	</div>
	{#each data as item}
		<ProgressBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-white">Nothing displayed</h1>
	{/if}
</div>

<style>
	a {
		transition: all 0.5s ease-in-out;
	}
</style>
