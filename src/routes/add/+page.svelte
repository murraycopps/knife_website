<!-- src/routes/items/ItemForm.svelte -->
<script>
	let formData = {
		name: '',
		description: '',
		images: [''], // Start with one empty image URL
		password: '',
		collection: 'gallery'
	};

	const collectionOptions = [
		{ value: 'gallery', label: 'Gallery' },
		{ value: 'projects', label: 'Projects' },
		{ value: 'available', label: 'Available' },
		{ value: 'leather', label: 'Leather' },
		{ value: 'spoons', label: 'Spoons' }
	];

	function addImageField() {
		formData.images = [...formData.images, ''];
	}

	function removeImageField(index) {
		formData.images = formData.images.filter((_, i) => i !== index);
	}

	async function handleSubmit() {
		try {
			// Filter out empty image strings
			const cleanImages = formData.images.filter((url) => url.trim() !== '');

			const response = await fetch('/api/data', {
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

<form on:submit|preventDefault={handleSubmit}>
	<div class="form-group">
		<label>Item Name</label>
		<input type="text" bind:value={formData.name} required />   
	</div>

	<div class="form-group">
		<label>Description</label>
		<textarea bind:value={formData.description} rows="4" placeholder="Knives Only" />
	</div>

	<div class="form-group">
		<label>Image URLs</label>
		{#each formData.images as _, index}
			<div class="image-input">
				<input
					type="url"
					bind:value={formData.images[index]}
					placeholder="https://example.com/image.jpg"
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
		<label>Collection</label>
		<select bind:value={formData.collection}>
			{#each collectionOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
	<div class="form-group">
		<label>Password</label>
		<input type="password" bind:value={formData.password} required />
	</div>

	<button type="submit">Create Item</button>
</form>

<style>
	.form-group {
		margin-bottom: 1.5rem;
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
		margin-bottom: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
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
	}
</style>
