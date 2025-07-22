<script>
	import DisplayBox from '../DisplayBox.svelte';
	import DisplayBoxHardCoded from '../DisplayBoxHardCoded.svelte';
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	import SteelImage from '$lib/images/SteelImage.png';
	let knife;
	let spoon;

	onMount(async () => {
		let knives = await Data.getGallery();
		let projects = await Data.getProjects();
		knife = knives.filter((item) => item.display == 'a')[0];
		spoon = projects.filter((item) => item.display)[0];
	});
</script>

<svelte:head>
	<title>Resources</title>
</svelte:head>
<div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	{#if !knife || !spoon}
		<h1 class="text-3xl text-center text-white">Loading...</h1>
	{:else}
		<div class="flex flex-col gap-4 p-4 justify-evenly sm:col-span-2 lg:col-span-3">
			<h1 class="text-5xl font-bold text-center text-oglala-500"> Maintenance and Steel Resources</h1>
		</div>
		<DisplayBox
			images={knife.images}
			name={knife.name}
			description={knife.description}
			link="/resources/sharpening"
			label="Knife Sharpening"
			oneImage
		/>
		<DisplayBox
			images={spoon.images}
			name={spoon.name}
			description={spoon.description}
			link="/resources/spoons"
			label="Spoon Maintenance"
		/>
		<DisplayBoxHardCoded
			images={[SteelImage]}
			name="Steel"
			description="Met"
			link="https://knifesteelnerds.com/2021/10/19/knife-steels-rated-by-a-metallurgist-toughness-edge-retention-and-corrosion-resistance/"
			label="Knife Steels Rated by a Metallurgist"
			target="_blank"
			oneImage
		/>
	{/if}
</div>

<style>
</style>
