<script>
	import CircleDance from '$lib/images/CircleDance.png';
	import Divider from './Divider.svelte';
	import { clickOutside } from '$lib/utils/clickOutside.js';

	let out = false;
</script>

<header
	class="fixed top-0 left-0 z-50 h-screen align-middle text-white"
	use:clickOutside
	on:outsideclick={() => (out = false)}
>
	<button class=" fixed top-0 left-0 z-50 items-center p-4 flex" on:click={() => (out = !out)}>
		<img src={CircleDance} alt="Circle Dance" class="w-12 h-12" />
	</button>
	<div
		class="fixed top-0 left-0 right-1/3 flex flex-col items-center gap-2 p-2 pt-20 text-xl h-full align-middle bg-oglala {out
			? 'circle-clip-visible'
			: 'circle-clip-hidden'}"
	>
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/"
			on:click={() => (out = false)}>Home</a
		>
		<Divider horizontal />
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/gallery"
			on:click={() => (out = false)}>Gallery</a
		>
		<Divider horizontal />
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/gallery/available"
			on:click={() => (out = false)}>Available</a
		>
		<Divider horizontal />
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/projects"
			on:click={() => (out = false)}>Other Projects</a
		>
		<Divider horizontal />
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/about"
			on:click={() => (out = false)}
		>
			About</a
		>
		<Divider horizontal />
		<a
			class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600"
			href="/contact"
			on:click={() => (out = false)}>Contact</a
		>
		<div class="flex-1" />
		<h2 class="mr-4 text-xl">Circle Dance Tools</h2>
	</div>
</header>

<style>
	.circle-clip-hidden {
		clip-path: circle(0% at 0 0);
	}

	.circle-clip-visible {
		clip-path: circle(150% at 0 0);
	}
	* {
		transition: all 0.5s ease-in-out;
	}
</style>
