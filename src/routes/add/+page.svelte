<!-- src/routes/items/ItemForm.svelte -->
<script>
	import Data from '$lib/scripts/Data.js';
	let formData = {
		name: '',
		description: '',
		images: [''],
		link: '',
		password: '',
		collection: 'gallery'
	};

	const collectionOptions = [
		{ value: 'gallery', label: 'Gallery' },
		{ value: 'projects', label: 'Projects' },
		{ value: 'available', label: 'Available' },
		{ value: 'leather', label: 'Leather' },
		{ value: 'spoons', label: 'Spoons' },
		{ value: 'progress', label: 'Progress' }
	];

	function addImageField() {
		formData.images = [...formData.images, ''];
	}

	function removeImageField(index) {
		formData.images = formData.images.filter((_, i) => i !== index);
	}

	async function handleSubmit() {
		try {
			// increase every other item by 1
			if (formData.collection === 'gallery' || formData.collection === 'available') {
				let gallery = await Data.getGallery();
				gallery = gallery.map((item, index) => {
					const id = item._id;
					delete item._id;
					item.number = item.number + 1;
					return {
						id,
						item: item
					};
				});

				const updateOne = async (item) => {
					const response = await fetch('/api/data/edit', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							collectionName: 'gallery',
							item: item.item,
							id: item.id
						})
					});
					return response.json();
				};
				const updateAll = async () => {
					await Promise.all(gallery.map(updateOne));
					await Data.reload();
				};
				updateAll();
			} else {
				let projects = await Data.getProjects();
				projects = projects.map((item, index) => {
					const id = item._id;
					delete item._id;
					item.number = item.number + 1;
					return {
						collection: 'projects',
						id,
						item: item
					};
				});

				const updateOne = async (item) => {
					const response = await fetch('/api/data/edit', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							item: item.item,
							id: item.id
						})
					});
					return response.json();
				};
				const updateAll = async () => {
					await Promise.all(projects.map(updateOne));
					await Data.reload();
				};
				updateAll();
			}

			// Filter out empty image strings
			const cleanImages = formData.images.filter((url) => url.trim() !== '');

			const response = await fetch('/api/data/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					images: cleanImages
				})
			});

			const result = await response.json();

			if (result.success) {
				alert(`Item "${formData.name}" created successfully!`);
				// Reset form
				formData = {
					name: '',
					description: '',
					images: [''],
					password: formData.password,
					collection: formData.collection
				};
			} else {
				alert(`Error: ${result.error}`);
			}
		} catch (error) {
			console.error('Submission error:', error);
		}
	}
</script>

<svelte:head>
	<title>Add</title>
</svelte:head>
<form
	on:submit|preventDefault={handleSubmit}
	class="fixed left-0 w-screen p-2 overflow-y-auto text-white top-20"
>
	<div class="form-group">
		<label for="name">Item Name</label>
		<input type="text" bind:value={formData.name} required class="bg-white" />
	</div>

	<div class="form-group">
		<label for="description">Description</label>
		<textarea bind:value={formData.description} rows="4" placeholder="Knives Only" class="bg-white"/>
	</div>

	<div class="form-group">
		<label for="images">Image URLs</label>
		{#each formData.images as _, index}
			<div class="image-input">
				<input
					type="url"
					bind:value={formData.images[index]}
					placeholder="https://example.com/image.jpg"
					class="bg-white"
				/>
				{#if formData.images.length > 1}
					<button
						type="button"
						on:click|preventDefault={() => removeImageField(index)}
						class="remove-btn">×</button
					>
				{/if}
			</div>
		{/each}
		<button type="button" on:click|preventDefault={addImageField}> Add Another Image </button>
	</div>

	<div class="form-group">
		<label for="link">Link</label>
		<input type="url" bind:value={formData.link} placeholder="https://example.com" class="bg-white" />
	</div>

	<div class="form-group">
		<label for="collection">Collection</label>
		<select bind:value={formData.collection} class="text-black bg-white">
			{#each collectionOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" bind:value={formData.password} required class="bg-white"/>
	</div>

	<button type="submit">Create Item</button>
</form>

<style>
	form {
		height: calc(100vh - 5rem);
	}
	form::-webkit-scrollbar {
		width: 0.5rem;
		background-color: transparent;
	}

	form::-webkit-scrollbar-thumb {
		background-color: #323d58;
		opacity: 0.75;
		border-radius: 0.5rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		color: black;
	}

	.image-input {
		position: relative;
		margin-bottom: 0.5rem;
	}

	.remove-btn {
		position: absolute;
		right: 0;
		top: 0;
		background: #ff4444;
		color: white;
		border: none;
		padding: 0 0.5rem;
		cursor: pointer;
	}

	button[type='submit'] {
		background: #4caf50;
		color: white;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		color: black;
	}
</style>
