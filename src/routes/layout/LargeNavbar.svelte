<script>
	import CircleDanceIcon from '$lib/images/CircleDanceIcon.svelte';
	import Divider from './Divider.svelte';
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 flex flex-row items-center gap-2 p-2 text-xl sm:h-auto align-middle bg-oglala text-white"
>
	<a class=" items-center px-4 flex" href="/">
		<CircleDanceIcon size={12} />
	</a>

	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/">Home</a>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/gallery">Gallery</a>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/gallery/available"
		>Available</a
	>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/projects"
		>Other Projects</a
	>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/progress">In Progress</a>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/about">About</a>
	<Divider />
	<a class="flex items-center px-8 py-2 rounded-sm hover:bg-oglala-600" href="/contact">Contact</a>
	<div class="flex-1" />
	<h2 class="mr-4 text-xl">Circle Dance Tools</h2>
</header>

<style>
	header {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		z-index: 1000;
	}

	header::after {
		content: '';
		position: absolute;
		bottom: -19px;
		left: 0;
		width: 100%;
		height: 20px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 20' preserveAspectRatio='none'%3E%3Cpath d='M0 0h2000v12.5c-50 0-50-6.25-100-6.25s-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25S50 12.5 0 12.5V0z' fill='%23A50021'/%3E%3C/svg%3E");
		background-repeat: repeat-x;
	}
</style>
