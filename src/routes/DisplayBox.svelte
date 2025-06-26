<script>
	export let images;
	export let name;
	export let link;
	export let pageName;
	let numberOfImages = images.length;
	let hovered = false;

	let currentImageIndex = 0;

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % numberOfImages;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + numberOfImages) % numberOfImages;
	};
</script>

<a class="flex flex-col justify-start mx-auto knife-box bg-oglala-800 hover:bg-oglala-700 text-white" on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)} href={link}>
	<div class="relative flex gap-4 text-2xl text-oglala-900 text-bold">
		{#each images as img, i}
			<img
				src={img + '.jpeg'}
				alt={name}
				class="w-full h-full {i !== currentImageIndex ? 'opacity-0 z-0' : ' z-10'} {i == 0
					? 'relative'
					: 'absolute'} object-contain"
			/>
		{/each}
		{#if numberOfImages > 1}
			<button on:click|preventDefault={moveToPreviousImage} class="w-8 h-8 z-10 rounded-full left bg-white"
				>{'<'}</button
			>
			<button on:click|preventDefault={moveToNextImage} class="w-8 h-8 z-10 rounded-full right bg-white"
				>{'>'}</button
			>
		{/if}
		<h3 class="absolute bottom-0 w-full text-2xl font-bold {hovered ? "bg-oglala-700 opacity-1" : "bg-oglala-800 opacity-0"} text-white">{name}</h3>
	</div>
	<h2 class="p-4 text-xl font-bold text-center">Go to {pageName}</h2>
</a>

<style>
	img {
		transition: all 0.5s ease-in-out;
	}

	.knife-box {
		width: min(100%, 400px);
	}
	button {
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
	*{
		transition: all 0.5s ease-in-out;
	}
</style>
