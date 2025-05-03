<script>
	import ProjectBoxDisplay from './projects/ProjectBoxDisplay.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	let knives = [];
	let projects = [];

	onMount(async () => {
		knives = await Data.getGallery();
		projects = await Data.getProjects();
		knives = knives.filter((item) => item.display);
		projects = projects.filter((item) => item.display);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-center col-span-3 gap-4 p-10">
		<h1 class="text-5xl font-bold text-center text-base-800">Other Projects</h1>
		<p class="text-2xl enter text-l text-base-800">
			Gallery of other projects including carving and leather work
		</p>
	</div>
	{#if knives.length == 0 || projects.length == 0}
		<h1 class="text-3xl text-center text-base-800">Loading...</h1>
	{:else}
		<ProjectBoxDisplay
			images={knives[1].images}
			name={knives[1].name}
			description={knives[1].description}
			link="/gallery"
			pageName="Gallery"
		/>
		<ProjectBoxDisplay
			images={knives[0].images}
			name={knives[0].name}
			description={knives[0].description}
			link="/gallery/available"
			pageName="Available knives"
		/>
		<ProjectBoxDisplay
			images={projects[0].images}
			name={projects[0].name}
			description={projects[0].description}
			link="/projects"
			pageName="Other Projects"
		/>
	{/if}
</div>

<style>
</style>
