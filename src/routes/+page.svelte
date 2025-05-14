<script>
	import DisplayBox from './DisplayBox.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	import CircleDance from '$lib/images/CircleDance.png';
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

<div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="grid grid-cols-1 sm:grid-cols-5 sm:col-span-2  lg:col-span-3 gap-4 p-10">
		<img
			src={CircleDance}
			loading="lazy"
			alt="circle dance logo"
			class="mx-auto w-full sm:col-span-2"
		/>
		<div class="flex flex-col gap-4 p-4 justify-evenly sm:col-span-3">
			<h1 class="text-5xl font-bold text-center text-oglala-500 ">Circle Dance Tools</h1>

			<p class="text-2xl enter text-l text-white sm:col-span-3">
				Inspired by years of carving and bushcraft in the woods, Circle Dance knives are built for
				real work—simple, reliable, and ready to be used hard. Each blade is handcrafted from
				premium steels paired with durable wood or micarta handles, and designed to deliver top-tier
				performance whether you're deep in the forest or carving at home.
			</p>
		</div>
	</div>
	{#if knives.length == 0 || projects.length == 0}
		<h1 class="text-3xl text-center text-white ">Loading...</h1>
	{:else}
		<DisplayBox
			images={knives[1].images}
			name={knives[1].name}
			description={knives[1].description}
			link="/gallery"
			pageName="Gallery"
		/>
		<DisplayBox
			images={knives[0].images}
			name={knives[0].name}
			description={knives[0].description}
			link="/gallery/available"
			pageName="Available knives"
		/>
		<DisplayBox
			images={projects[0].images}
			name={projects[0].name}
			description={projects[0].description}
			link="/projects"
			pageName="Other Projects"
		/>
	{/if}
</div>

<style>
	img {
		max-width: 20vw;
	}
	@media (max-width: 640px) {
		img {
			max-width: 50vw;
		}
	}
</style>
