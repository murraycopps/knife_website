<script>
	let data = [];
	async function fetchData() {
		try {
			const response = await fetch('/api/data/projects');
			data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	fetchData();
</script>

<div class="grid grid-cols-3 gap-4 text-center p-4">
	{#if data.length == 0}
		<h1 class="text-3xl font-bold text-base text-center">No projects displayed</h1>
	{/if}
</div>
