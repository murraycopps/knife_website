<script>
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	export let slug;

	let knife = null;
	let numberOfImages = 0;
	let currentImageIndex = 0;
	let gridClass = 'grid-cols-5';
	let displayedImages = [];
	let displayedOffset = 0;
	async function fetchData() {
		const data = await Data.getGallery();
		knife = data.find((item) => item.id === slug);
		if (knife) {
			numberOfImages = knife.images.length;
			switch (numberOfImages) {
				case 2:
					gridClass = 'grid-cols-2';
					updateDisplayedImages(0, 1);
					break;
				case 3:
					gridClass = 'grid-cols-3';
					updateDisplayedImages(1, 1);
					displayedOffset = 1;
					break;
				case 4:
					gridClass = 'grid-cols-4';
					updateDisplayedImages(1, 2);
					displayedOffset = 1;
					break;
				default:
					gridClass = 'grid-cols-5';
					updateDisplayedImages(2, 2);
					displayedOffset = 2;
			}
		}
	}

	onMount(fetchData);

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % numberOfImages;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + numberOfImages) % numberOfImages;
	};

	const updateDisplayedImages = (leftOffset, rightOffset) => {
		displayedImages = [];
		for (let i = currentImageIndex - leftOffset; i <= currentImageIndex + rightOffset; i++) {
			let index = (i + numberOfImages) % numberOfImages;
			displayedImages.push(knife.images[index]);
		}
	};
</script>

<svelte:head>
	<title>{knife ? knife.name : 'Loading...'}</title>
</svelte:head>
{#if knife}
	<div class=" flex flex-col items-center gap-4 justify-center p-16">
		<h1 class="text-4xl font-bold  text-center">{knife.name}</h1>
		<p class="text-lg ">{knife.description}</p>
		<div class="relative max-w-96 w-full text-black">
			{#each knife.images as image, i}
				<img
					src={image}
					alt={knife.name}
					class="w-full h-full top-0 {i !== currentImageIndex ? 'opacity-0 z-0' : ' z-10'} {i == 0
						? 'relative'
						: 'absolute'} object-contain"
				/>
			{/each}

			{#if numberOfImages > 1}
				<button on:click={moveToPreviousImage} class="w-8 h-8 z-10 rounded-full left bg-white"
					>{'<'}</button
				>
				<button on:click={moveToNextImage} class="w-8 h-8 z-10 rounded-full right bg-white"
					>{'>'}</button
				>
			{/if}
		</div>
		{#if numberOfImages > 1}
			<div class="grid gap-1 max-w-lg  text-white {gridClass}">
				{#each displayedImages as img, i}
					<button
						on:click={() => {
							currentImageIndex =
								(currentImageIndex + i - displayedOffset + numberOfImages) % numberOfImages;
							updateDisplayedImages(displayedOffset, displayedOffset);
						}}
						class=" z-20 border-4 {img === knife.images[currentImageIndex]
							? 'border-oglala'
							: 'border-transparent'}"
					>
						<img src={img} alt={knife.name} class="object-cover w-full" />
					</button>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="max-w-4xl mx-auto p-4">
		<h1 class="text-4xl font-bold mb-4 text-center">Loading...</h1>
	</div>
{/if}

<style>
	img {
		transition: all 0.5s ease-in-out;
	}
	.left,
	.right {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.left {
		left: 1rem;
	}
	.right {
		right: 1rem;
	}
</style>
