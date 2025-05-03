<script>
	export let images;
	export let name;
	export let link;
	export let pageName;
	let numberOfImages = images.length;

	let currentImageIndex = 0;

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % numberOfImages;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + numberOfImages) % numberOfImages;
	};
</script>

<a class="flex flex-col justify-start mx-auto knife-box bg-base text-light-base" href={link}>
	<div class="relative flex gap-4 text-2xl text-base-800 text-bold">
		{#if numberOfImages > 1}
			<button on:click={moveToPreviousImage} class="w-8 h-8 rounded-full left bg-light-base"
				>{'<'}</button
			>
			{/if}
		<img src={images[currentImageIndex] + '.jpeg'} alt={name} class="w-full h-full" />
		{#if numberOfImages > 1}
			<button on:click={moveToNextImage} class="w-8 h-8 rounded-full right bg-light-base"
				>{'>'}</button
			>
		{/if}
		<h3 class="absolute bottom-0 w-full text-2xl font-bold bg-base text-light-base">{name}</h3>
	</div>
	<h2 class="p-4 text-xl font-bold text-center">Go to {pageName}</h2>
</a>

<style>
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

	h3 {
		transition: all 0.5s ease-in-out;
		opacity: 0;
	}

	.knife-box:hover h3 {
		opacity: 1;
	}
</style>
