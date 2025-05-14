<script>
	import ProjectBox from '../ProjectBox.svelte';
	import Data from '$lib/scripts/Data.js';

	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getProjects();
		data = data.filter((item) => item.type == 'spoons' && !item.displayOnly);
	}
	onMount(fetchData);
</script>

<svelte:head>
	<title>Spoons</title>
</svelte:head>

<div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center sm:col-span-2 lg:col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Carved Spoons</h1>
		<p class="text-2xl enter text-l text-white">Wooden spoons carved by hand and finished with tung oil</p>
	</div>
	{#each data as item}
		<ProjectBox images={item.images} name={item.name} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-oglala">No projects displayed</h1>
	{/if}
</div>
