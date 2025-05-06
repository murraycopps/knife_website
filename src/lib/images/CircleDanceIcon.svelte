<script>
	export let size;
	export let class_name = '';
	export let bold = false;
	export let fill = 'none';
	let sizeString = `${size / 4}rem`;
	let style = `width: ${sizeString}; height: ${sizeString};${bold && 'bold'}`;
</script>

<svg
	viewBox={bold ? '-2.5 -2.5 205 205' : '0 0 200 200'}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={class_name}
	{style}
>
	<circle
		cx="100"
		cy="100"
		r="97.5"
		stroke="currentColor"
		stroke-width={bold ? '10' : '5'}
		{fill}
	/>
	<circle cx="99.0523" cy="47" r="23" stroke="currentColor" stroke-width={bold ? '8' : '4'} />
	<path
		d="M99.5381 72.1179C102.309 113.52 96.68 136.058 74.5381 175.118"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
	/>
	<path
		d="M96.4794 124.74C116.954 139.978 123.868 149.826 124.479 170.74"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
	/>
	<path
		d="M54.1978 77.5216C75.0908 100.366 124.052 77.5217 146.198 105.522"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
	/>
</svg>
