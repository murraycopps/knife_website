<script>
	import ProjectBox from '../ProjectBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getProjects();
		data = data.filter(
			(item) => item.type != 'leather' && item.type != 'spoons' && !item.displayOnly
		);
	}

	onMount(fetchData);
</script>

<svelte:head>
	<title>Other Projects</title>
</svelte:head>
<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Other Projects</h1>
		<p class="text-2xl enter text-l text-white">
			Gallery of projects which are not leather work or spoons including utensil and kuksa carving
		</p>
	</div>
	{#each data as item}
		<ProjectBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-center text-oglala">No projects displayed</h1>
	{/if}
</div>
