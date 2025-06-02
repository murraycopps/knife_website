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

	let start = 1;
	let end = 0;

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
		end = gallery[gallery.length - 1]?.item?.number || 0;
	};

	const loadData = async () => {
		Data.reload();
		gallery = await Data.getGallery();
		projects = await Data.getProjects();

		gallery = gallery.map((item, index) => {
			const id = item._id;
			delete item._id;
			const text = JSON.stringify(item, null, 8);
			return {
				id,
				item: item,
				text: text
			};
		});
		
		end = gallery[gallery.length - 1]?.item?.number || 0;

		projects = projects.map((item, index) => {
			const id = item._id;
			delete item._id;
			const text = JSON.stringify(item, null, 8);
			return {
				id,
				item: item,
				text: text
			};
		});
	};

	const updateOne = async (item) => {
		console.log('Updating item:', item);
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
		await loadData();
		loading = false;
	};
	const updateItem = async (item) => {
		item.item = JSON.parse(item.text);
		updateOne(item);
	};

	const deleteOne = async (item) => {
		console.log('Deleting item:', item);
		loading = true;
		const response = await fetch('/api/data/edit', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: item.id,
				collectionName: inGallery ? 'gallery' : 'projects'
			})
		});
		const result = await response.json();
		if (result.success) {
			console.log('Item deleted successfully');
			await loadData();
		} else {
			console.error('Error deleting item:', result.error);
		}
		loading = false;
	};

	const increment = async (start, end) => {
		console.log('Incrementing from', start, 'to', end);
		if( !end ) {
			end = gallery[gallery.length - 1].item.number;
		}
		gallery.forEach((item) => {
			if (item.item.number >= start && item.item.number <= end) {
				item.item.number += 1;
			}
		});
		gallery.sort((a, b) => a.item.number - b.item.number);
		
	}

	const decrement = async (start, end) => {
		console.log('Decrementing from', start, 'to', end);
		if( !end ) {
			end = gallery[gallery.length - 1].item.number;
		}
		gallery.forEach((item) => {
			if (item.item.number >= start && item.item.number <= end) {
				item.item.number -= 1;
			}
		});
	}

	

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
			 <div class="grid grid-cols-2 gap-2">
				<input
					type="number"
					placeholder="Start Number"
					class="bg-gray-800 text-white px-4 py-2 rounded"
					bind:value={start}
				/>
				<input
					type="number"
					placeholder="End Number"
					class="bg-gray-800 text-white px-4 py-2 rounded"
					bind:value={end}
				/>
				<button
					on:click={(e) => {
						e.preventDefault();
						increment(start, end);
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
					class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
				>
					Increment
				</button>
				<button
					on:click={(e) => {
						e.preventDefault();
						decrement(start, end);
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
					class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
				>
					Decrement
				</button>
			</div>

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

						<textarea class="absolute p-2 pt-6 inset-0 bg-gray-800 text-white rounded" bind:value={item.text}/>
						<div class="grid absolute top-0 right-0 grid-cols-2 gap-2">

							<button
							on:click={(e) => {
								e.preventDefault();
								updateItem(item);
							}}
						class=" bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 transition-colors"
						>
						Update
					</button>
					<button
						on:click={(e) => {
							e.preventDefault();
							deleteOne(item);
						}}
						class=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
					>
						Delete
					</button>
				</div>
				</div>
			{/each}
	{:else}
			{#each projects as item}
				<div class="w-full relative aspect-square">
					<textarea class="absolute p-2 inset-0 bg-gray-800 text-white rounded" bind:value={item.text}/>
					<button
						on:click={(e) => {
							e.preventDefault();
							updateItem(item);
						}}
						class=" bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-0 hover:bg-blue-600 transition-colors"
					>
						Update
					</button>
					<button
						on:click={(e) => {
							e.preventDefault();
							deleteOne(item);
						}}
						class=" bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-20 hover:bg-red-600 transition-colors"
					>
						Delete
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
