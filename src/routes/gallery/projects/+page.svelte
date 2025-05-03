<script>
    import ProjectBox from './ProjectBox.svelte';
	let data = [];
	async function fetchData() {
		try {
			const response = await fetch('/api/data/projects');
			data = await response.json();
			console.log(data);
            data = data.filter((item) => !item.displayOnly);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	fetchData();
</script>

<div class="grid w-full grid-cols-3 gap-4 p-4 text-center">
    {#each data as item}
        <ProjectBox images={item.images} name={item.name} description={item.description} />
    {/each}
	{#if data.length == 0}
		<h1 class="text-base text-3xl font-bold text-center">No projects displayed</h1>
	{/if}
</div>
