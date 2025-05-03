<script>
	import ProjectBoxDisplay from './ProjectBoxDisplay.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	async function fetchData() {
		data = await Data.getProjects();
		data = data.filter((item) => item.display);
	}

	onMount(fetchData);
</script>

<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
	{#if data.length == 0}
		<h1 class="text-center text-baseld">No projects displayed</h1>
	{:else}
		<ProjectBoxDisplay
			images={data[0].images}
			name={data[0].name}
			description={data[0].description}
			link="/projects/spoons"
			pageName="Spoons"
		/>
		<ProjectBoxDisplay
			images={data[1].images}
			name={data[1].name}
			description={data[1].description}
			link="/projects/leather"
			pageName="Leather"
		/>
		<ProjectBoxDisplay
			images={data[2].images}
			name={data[2].name}
			description={data[2].description}
			link="/projects/other"
			pageName="Other Projects"
		/>
	{/if}
</div>
