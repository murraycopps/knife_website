<script>
	export let images;
	export let name;
	export let description;

	let currentImageIndex = 0;

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % images.length;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	};
</script>

<div class="flex flex-col gap-4 justify-start knife-box">
	<div class="flex gap-4 relative text-base text-2xl text-bold">
		<button on:click={moveToPreviousImage} class="left bg-light-base w-8 h-8 rounded-full">{'<'}</button>
		<img src={images[currentImageIndex] + '.jpeg'} alt={name} class="w-full h-full" />
		<button on:click={moveToNextImage} class="right bg-light-base w-8 h-8 rounded-full">{'>'}</button>
	</div>
	<h2 class="text-2xl font-bold">{name}</h2>
	<p>{description}</p>
</div>

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
</style>
