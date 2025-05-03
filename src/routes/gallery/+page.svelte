<script>
	import KnifeBox from './KnifeBox.svelte';
	let data = [];
	async function fetchData() {
		try {
			const response = await fetch('/api/data/gallery');
			data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	fetchData();
</script>

<div class="grid grid-cols-3 gap-4 text-center p-4">
	{#each data as item}
		<KnifeBox images={item.images} name={item.name} description={item.description} />
	{/each}
</div>
