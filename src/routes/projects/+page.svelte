<script>
	import ProjectBoxDisplay from './ProjectBoxDisplay.svelte';
	import ProjectBox from './ProjectBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';

	let data = [];
	let projects = [];
	async function fetchData() {
		data = await Data.getProjects();
		projects = data.filter((item) => !item.displayOnly);
		data = data.filter((item) => item.display);
	}

	onMount(fetchData);
</script>

<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-base-800">Other Projects</h1>
		<p class="text-2xl enter text-l text-base-800">
			Gallery of other projects including carving and leather work
		</p>
	</div>
	{#if data.length == 0}
		<h1 class="text-3xl text-center text-base-800">No projects displayed</h1>
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
		<div class="w-full h-4 col-span-3 rounded-full bg-base-800" />
		{#each projects as item}
			<ProjectBox images={item.images} name={item.name} description={item.description} />
		{/each}
	{/if}
</div>
