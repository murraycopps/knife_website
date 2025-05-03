<script>
	import CircleDanceIcon from './layout/CircleDanceIcon.svelte';
	import Divider from './layout/Divider.svelte';
	import './styles.css';
</script>

<header
	class="bg-base w-full flex align-middle items-center gap-2 top-0 flex-row fixed z-50 text-light-base text-xl p-2"
>
	<a class="flex items-center px-4" href="/">
		<CircleDanceIcon size={12} />
	</a>
	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/">Home</a>
	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/gallery">Gallery</a>
	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/gallery/available"
		>Available</a
	>
	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/gallery/projects">Other Projects</a>

	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/about">About</a>
	<Divider />
	<a class="flex items-center py-2 px-8 hover:bg-base-750 rounded-sm" href="/contact">Contact</a>
	<div class="flex-1" />
	<h2 class="text-xl mr-4">Circle Dance Tools</h2>
</header>

<main class="mt-20">
	<slot />
</main>

<style>
	header {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	header::after {
		content: '';
		position: absolute;
		bottom: -19px;
		left: 0;
		width: 100%;
		height: 20px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 20' preserveAspectRatio='none'%3E%3Cpath d='M0 0h2000v12.5c-50 0-50-6.25-100-6.25s-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25-50 6.25-100 6.25-50-6.25-100-6.25S50 12.5 0 12.5V0z' fill='%23051A4F'/%3E%3C/svg%3E");
		background-repeat: repeat-x;
	}
</style>
