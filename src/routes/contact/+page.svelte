<script>
	let data = {
		access_key: '848fbb6e-fc42-4751-bc62-b0031d8359a4',
		name: '',
		email: '',
		subject: '',
		message: '',
        form_name: 'Knife Store Contact Form'
	};
	let status = '';
	const handleSubmit = async () => {
		if (status == 'Submitting...') return;
		status = 'Submitting...';
		data.subject = 'Contact Form Submission Knife Store: ' + data.subject;
		const json = JSON.stringify(data);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});

		const result = await response.json();
		if (result.success) {
			status = result.message || 'Success';
			data = {
				access_key: '848fbb6e-fc42-4751-bc62-b0031d8359a4',
				name: '',
				email: '',
				subject: '',
				message: ''
			};
		} else {
			console.log(result);
			status = result.message || 'Error';
		}
	};
</script>
<svelte:head>
    <title>Contact</title>
</svelte:head>
<div class="flex flex-col justify-center h-full">
	<div class="grid lg:grid-cols-2 gap-4 p-8">
		<div>
			<h2 class="text-3xl text-center mb-4 text-oglala">Contact me</h2>
			<p class="text-2xl text-white">
				If you would like to get in touch with me, please fill out the form and I will get back to
				you as soon as possible. Please note that I am not currently accepting custom orders at this
				time but feel free to reach out with your ideas and I will see what I can do.
				<br /> <br />
				Purchases are done through etsy but feel free to reach out with any questions you may have regarding
				my knives.
				<br /> <br />
				Thanks for stopping by!
			</p>
		</div>
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex flex-col justify-center align-center gap-2 text-base-800 text-xl"
		>
			<input
				type="text"
				name="name"
				required
				placeholder="Name"
				class="p-2 rounded-lg border "
				bind:value={data.name}
			/>
			<input
				type="email"
				name="email"
				required
				placeholder="Email"
				class="p-2 rounded-lg border"
				bind:value={data.email}
			/>
			<input
				type="text"
				name="subject"
				required
				placeholder="Subject"
				class="p-2 rounded-lg border"
				bind:value={data.subject}
			/>
			<textarea
				name="message"
				required
				rows="3"
				placeholder="Message"
				class="p-2 rounded-lg border"
				bind:value={data.message}
			/>
			<button type="submit" class="p-2 rounded-lg bg-oglala text-white hover:bg-oglala-400"
				>Submit</button
			>
			<div class="text-center text-white">{status}</div>
		</form>
	</div>
</div>
