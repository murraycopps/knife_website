<script>
	export let images;
	export let name;
	let numberOfImages = images.length;

	let currentImageIndex = 0;

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % numberOfImages;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + numberOfImages) % numberOfImages;
	};
</script>

<div
	class="relative flex flex-col justify-start w-full gap-4 mx-auto text-2xl text-oglala-900 knife-box text-bold"
>
	{#each images as img, i}
		<img
			src={img + '.jpeg'}
			alt={name}
			class="w-full h-full {i !== currentImageIndex ? 'opacity-0 z-0' : ' z-10'} {i == 0
				? 'relative'
				: 'absolute'} object-contain  "
		/>
	{/each}
	{#if numberOfImages > 1}
		<button on:click={moveToPreviousImage} class="w-8 h-8 z-10 rounded-full left bg-light-base">
			{'<'}
		</button>
		<button on:click={moveToNextImage} class="w-8 h-8 z-10 rounded-full right bg-light-base">
			{'>'}
		</button>
	{/if}

	<h2 class="absolute bottom-0 z-10 w-full text-2xl font-bold bg-oglala text-white">{name}</h2>
</div>

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

	h2 {
		transition: all 0.5s ease-in-out;
		opacity: 0;
	}

	.knife-box:hover h2 {
		opacity: 1;
	}
</style>
