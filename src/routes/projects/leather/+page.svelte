<script>
	import ProjectBox from '../ProjectBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getProjects();
		data = data.filter((item) => item.type == 'leather' && !item.displayOnly);
	}

	onMount(fetchData);
</script>

<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
	{#each data as item}
		<ProjectBox images={item.images} name={item.name} description={item.description} />
	{/each}
	{#if data.length == 0}
		<h1 class="text-basetext-3xl font-bold text-center">No projects displayed</h1>
	{/if}
</div>
