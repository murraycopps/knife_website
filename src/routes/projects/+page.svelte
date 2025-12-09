<script>
	import DisplayBox from '../DisplayBox.svelte';
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

<svelte:head>
	<title>Projects</title>
</svelte:head>

<div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center sm:col-span-2 lg:col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-oglala">Other Projects</h1>
		<p class="text-2xl enter text-l text-white">
			Gallery of my spoons and other projects including carving and leather work
		</p>
	</div>
	{#if data.length == 0}
		<h1 class="text-3xl text-center text-oglala">No projects displayed</h1>
	{:else}
		<DisplayBox
			images={data[0].images}
			name={data[0].name}
			link="/projects/spoons"
			label="Handcarved Spoons"
		/>
		<DisplayBox
			images={data[1].images}
			name={data[1].name}
			link="/projects/leather"
			label="Leather Work"
		/>
		<DisplayBox
			images={data[2].images}
			name={data[2].name}
			link="/projects/other"
			label="Various Other Projects"
		/>
		<div class="w-full h-4 sm:col-span-2 lg:col-span-3 rounded-full bg-oglala" />
		{#each projects as item}
			<ProjectBox images={item.images} name={item.name} description={item.description} />
		{/each}
	{/if}
</div>
