<script>
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	import CircleDanceIcon from '$lib/images/CircleDanceIcon.svelte';

	let images = [];
	let currentImageIndex = 0;

	const cycleImages = () => {
		currentImageIndex = (currentImageIndex + 1) % images.length;
		setTimeout(cycleImages, 3000);
	};

	async function fetchData() {
		images = await Data.getImages();
		images = images.sort(() => Math.random() - 0.5);
		cycleImages();
	}

	onMount(fetchData);
</script>

<div class="grid grid-cols-5 gap-8 p-8">
	<div class="flex flex-col col-span-2 gap-2 relative">
		<h1 class="text-5xl font-bold text-center text-base-800 z-10">About Me</h1>
		{#each images as img, i}
			<img
				src={img + '.jpeg'}
				alt={'about'}
				class="w-full h-full rounded-3xl {i !== currentImageIndex ? 'opacity-0' : 'opacity-95'} absolute "
			/>
		{/each}
		<CircleDanceIcon size={24} class_name="absolute bottom-4 right-1/2 translate-x-1/2 z-20 text-base-800" shadow="0px 0px 1rem #e0e6f5" bold={true}/>
	</div>
	<p class="text-xl enter text-l text-base-800 col-span-3">
		When I was ten, I was given another name. At Night Eagle, a summer camp deep in the woods, I
		received the name Circle Dance—a name that reflected who I was and the qualities others saw in
		me. This camp, where carving, bushcraft, and survival weren’t just pastimes but everyday
		practices, became a formative part of my life. It taught me skills, values, and a deep
		appreciation for tools that work hard without compromise. Frustrated by the knives I had back
		then, I began making my own—to do better with less.
		<br /><br />
		My philosophy is simple: make high-quality knives that can take a beating, stay sharp, and feel right
		in your hand. I lean toward traditional blade shapes and handle styles, often inspired by bushcraft,
		puukko, and sloyd knives—hard users built to be compact, comfortable, and capable of serious work,
		or carving knives refined for high-level performance. As the saying goes, “the smaller the knife,
		the better the woodsman.” I aim to squeeze maximum capability out of every inch.
		<br /><br />
		Each blade is shaped through stock removal, finished by hand, and rigorously tested through real
		use—especially during carving, where subtle flaws can’t hide. I prefer tough stainless steels like
		14C28N and AEB-L for their reliability and value, while also exploring high-performance super steels
		like CPM M4. Handles are made from wood or micarta, and all blades are heat-treated professionally
		to precise specifications for optimal durability and edge retention.
		<br /><br />
		Circle Dance isn’t just a name—it’s a part of me. A reminder of where I started, and the mindset
		that guides every tool I make.
	</p>
</div>

<style>
	img {
		transition: all 0.5s ease-in-out;
		max-width: 25vw;
		/* need to center it as an absolute */
		left: 50%;
		transform: translate(-50%, 0);
	}

	h1 {
		text-shadow: 0px 0px 1rem #e0e6f5;
	}
</style>
