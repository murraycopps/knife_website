<script>
	export let images;
	export let name;
	export let description;
	export let link;
	let numberOfImages = images.length;

	let currentImageIndex = 0;

	const moveToNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % numberOfImages;
	};

	const moveToPreviousImage = () => {
		currentImageIndex = (currentImageIndex - 1 + numberOfImages) % numberOfImages;
	};
</script>

<div class="flex flex-col justify-start gap-4 mx-auto knife-box">
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
			<button on:click={moveToPreviousImage} class="w-8 h-8 z-10 rounded-full left bg-light-base"
				>{'<'}</button
			>
			<button on:click={moveToNextImage} class="w-8 h-8 z-10 rounded-full right bg-light-base"
				>{'>'}</button
			>
		{/if}
	</div>
	<h2 class="text-2xl font-bold text-oglala">{name}</h2>
	<p class="text-white whitespace-pre-line">{description}</p>
	{#if link}
		<a
			href={link}
			target="_blank"
			class="self-center py-2 text-2xl rounded-full text-oglala hover:text-oglala-400"
			>Purchase at: {link}</a
		>
	{/if}
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
</style>
