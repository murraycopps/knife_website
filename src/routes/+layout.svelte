<script>
	import { onMount } from 'svelte';
	import './styles.css';
	import SmallNavbar from './layout/SmallNavbar.svelte';
	import LargeNavbar from './layout/LargeNavbar.svelte';
	let large = false;

	onMount(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				large = true;
			} else {
				large = false;
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

{#if large}
	<LargeNavbar />
{:else}
	<SmallNavbar />
{/if}

<main class="lg:mt-16 lg:pt-4 overflow-y-scroll {large ? 'large' : ''}">
	<slot />
</main>

<style>
	.large {
		height: calc(100vh - 4rem);
	}
	* {
		transition: all 0.5s ease-in-out;
	}
</style>
