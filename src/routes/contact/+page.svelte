<script>
	//use the api keys for both email accounts
	let data = {
		access_key: '848fbb6e-fc42-4751-bc62-b0031d8359a4',
		name: '',
		email: '',
		subject: '',
		message: '',
        form_name: 'Knife Store Contact Form'
	};
	const other_key = "7e0d51f0-8151-4612-ad56-954302bf0d6b";

	let status = '';
	const handleSubmit = async () => {
		if (status == 'Submitting...') return;
		status = 'Submitting...';
		data.subject = 'Contact Form Submission Knife Store: ' + data.subject;
		const other_data = {
			access_key: other_key,
			name: data.name,
			email: data.email,
			subject: data.subject,
			message: data.message,
			form_name: 'Knife Store Contact Form'
		};

		const json = JSON.stringify(data);
		const other_json = JSON.stringify(other_data);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});
		const other_response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: other_json
		});

		
		const result = await response.json();
		const other_result = await other_response.json();

		if (result.success || other_result.success) {
			status = result.message || 'Success';
			data = {
				access_key: '848fbb6e-fc42-4751-bc62-b0031d8359a4',
				name: '',
				email: '',
				subject: '',
				message: ''
			};
		} else {
			console.log(result, other_result);
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
				If you would like to get in touch with me, please fill out the form or email me at circledancetools@gmail.com and I will get back to you as soon as possible. Please note that I am not currently accepting custom orders at this
				time but feel free to reach out with your ideas and I will see what I can do.
				<br /> <br />
				Purchases are generally done through etsy but feel free to reach out with any questions you may have regarding
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
