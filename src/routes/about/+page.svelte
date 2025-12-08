<script>
	import Data from '$lib/scripts/Data.js';
	import { onMount } from 'svelte';
	import CircleDanceIcon from '$lib/images/CircleDanceIcon.svelte';

	let images = [];
	let currentImageIndex = 0;
	let size = 'xs';

	const cycleImages = () => {
		currentImageIndex = (currentImageIndex + 1) % images.length;
		setTimeout(cycleImages, 3000);
	};

	async function fetchData() {
		images = await Data.getImages();
		images = images.sort(() => Math.random() - 0.5);
		cycleImages();
	}

	const handleResize = () => {
		if (window.innerWidth > 1024) {
			size = 'lg';
		} else if (window.innerWidth > 640) {
			size = 'sm';
		} else {
			size = 'xs';
		}
	};

	onMount(fetchData);

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<svelte:head>
	<title>About</title>
</svelte:head>
<div class="grid grid-cols-2 lg:grid-cols-6 gap-8 p-8">
	<div class="flex flex-col lg:col-span-2 gap-2 relative justify-center">
		<h1 class="text-5xl font-bold text-center text-oglala z-10">About Me</h1>
		{#if size == 'lg'}
			<div class="relative">
				{#each images as img, i}
					<img
						src={img + '.jpeg'}
						alt={'about'}
						class="w-full rounded-3xl {i !== currentImageIndex
							? 'opacity-0 z-0'
							: 'opacity-95 z-10'} top-0 {i === 0 ? 'relative' : 'absolute'} "
					/>
				{/each}
			</div>
		{/if}
	</div>
	<div class="grid items-center justify-center">
		<CircleDanceIcon size={32} class_name="text-white " fill="#a50021" bold={true} />
	</div>
	<p class="text-xl enter text-l text-white col-span-2 lg:col-span-3">
		When I was ten, I was given another name. At Night Eagle, a summer camp in the woods of Vermont, I
		received the name Circle Dance, a name shaped by the qualities others saw in
		me using Lakota definitions. This camp, where carving, bushcraft, and survival skills were everyday activities, became a formative part of my life. It taught me skills, values, and a deep
		appreciation for simple tools that do hard work without compromise. Frustrated by the knives I had back
		then, I began making my own, trying to make them correctly by improving the simplist, most basic parts first.
		<br /><br />
		My goal is simple: make high-quality knives that can take a beating, stay sharp, and feel right
		in your hand. I lean toward traditional blade shapes and handle styles, and am often inspired by bushcraft,
		puukko, and sloyd knives. They are hard users built to be compact, comfortable, and capable of serious work,
		or carving knives refined for high-level performance. As the saying goes, “the smaller the knife,
		the better the woodsman.” I aim to squeeze maximum capability out of every inch and make knives meant for skilled users.
		<br /><br />
		Each blade is shaped through stock removal, finished by hand, and rigorously tested through real
		use—especially during carving, where subtle flaws can’t hide. I prefer tough stainless steels like
		14C28N and AEB-L for their reliability and value, while also exploring high-performance super steels
		like CPM M4. Normally I avoid most simple carbon steels due to poor properity balance however some are great high toughness steels and Pops Procut is a new steel with great properties which is easy to work with. My handles are made from wood or micarta, and all blades, aside from my Procut knives, are heat-treated professionally
		to precise specifications for optimal durability and edge retention.
		<br /><br />
		Circle Dance isn’t just a name, it’s a part of me. A reminder of where I started, and the mindset
		that guides every tool I make.
	</p>
</div>

<style>
	img {
		transition: all 0.5s ease-in-out;
		left: 50%;
		transform: translate(-50%, 0);
	}
</style>
