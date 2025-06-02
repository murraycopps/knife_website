<script>
	import { onMount } from 'svelte';
	import Data from '$lib/scripts/Data.js';
	let admin = true;
	let password = '';
	let value = '';
	let gallery = [];
	let projects = [];
	let inGallery = true;
	let loading = true;

	const check = () => {
		console.log(password);
		console.log(value);
		if (password == value && password != '') {
			admin = true;
		}
	};
	const load = async () => {
		const response = await fetch('/api/data/edit');
		const data = await response.json();
		password = data.password;

		await loadData();
		loading = false;
	};

	const loadData = async () => {
		Data.reload();
		gallery = await Data.getGallery();
		projects = await Data.getProjects();

		gallery = gallery.map((item, index) => {
			const id = item._id;
			delete item._id;
			return {
				id,
				item: item
			};
		});

		projects = projects.map((item, index) => {
			const id = item._id;
			delete item._id;
			return {
				id,
				item: item
			};
		});
	};

	const updateOne = async (item) => {
		loading = true;
		const response = await fetch('/api/data/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				item: item.item,
				id: item.id,
				collectionName: inGallery ? 'gallery' : 'projects'
			})
		});
		const result = await response.json();
		if (result.success) {
			console.log('Item updated successfully');
		} else {
			console.error('Error updating item:', result.error);
		}
		loading = false;
		loadData();
	};

	onMount(load);
</script>

{#if loading}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
		<div class="text-white text-2xl">Loading...</div>
	</div>
{/if}

{#if admin}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-center">
	<div class="flex flex-col justify-evenly gap-8  text-white">
			<button
				on:click={(e) => {
					inGallery = !inGallery;
				}}
				class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
			>
				Toggle Gallery/Projects
			</button>
			<button 
				on:click={(e) => {
					e.preventDefault();
					if (inGallery) {
						gallery.forEach((item) => {
							updateOne(item);
						});
					} else {
						projects.forEach((item) => {
							updateOne(item);
						});
					}
				}}
				class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
			>
				Update All
			</button>

		</div>
	{#if inGallery}
			{#each gallery as item}
					<div class="w-full relative aspect-square">

						<textarea class="absolute inset-0 bg-gray-800 text-white rounded">{JSON.stringify(item.item, null, 8)}</textarea>
						<button
						on:click={(e) => {
							e.preventDefault();
							updateOne(item);
						}}
						class="mt-2 bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-0 hover:bg-blue-600 transition-colors"
						>
						Update
					</button>
				</div>
			{/each}
	{:else}
			{#each projects as item}
				<div class="w-full relative aspect-square">
					<textarea class="absolute inset-0 bg-gray-800 text-white rounded">{JSON.stringify(item.item, null, 8)}</textarea>
					<button
						on:click={(e) => {
							e.preventDefault();
							updateOne(item);
						}}
						class="mt-2 bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-0 hover:bg-blue-600 transition-colors"
					>
						Update
					</button>
				</div>
			{/each}
	{/if}
	</div>
{:else}
	<div class="text-white h-full flex justify-center items-center">
		<input bind:value type="password" />
		<button
			on:click={(e) => {
				check();
			}}
		>
			Check password
		</button>
	</div>
{/if}
