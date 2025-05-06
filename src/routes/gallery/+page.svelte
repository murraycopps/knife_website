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

<div class="grid grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-row justify-evenly col-span-3 gap-8 p-10">
		<h1 class="text-5xl font-bold text-center text-base-800">
			Gallery of past knives
			<a
				href="/gallery/available"
				class="self-center w-1/3 py-2 text-2xl rounded-full text-base-750 hover:text-base-700"
				>See knives available for purchase</a
			>
		</h1>
	</div>
	{#each data as item}
		<KnifeBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-base-800">No knives displayed</h1>
	{/if}
</div>
