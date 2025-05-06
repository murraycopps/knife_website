<script>
	export let size;
	export let class_name = '';
	export let shadow = '';
	export let bold = false;
	let sizeString = `${size / 4}rem`;
	let style = `width: ${sizeString}; height: ${sizeString};${bold && 'bold'}`;
	let elementShadow = 'shadow: ' + shadow;
</script>

<svg
	viewBox={bold ? '-5 -5 210 210' : '0 0 200 200'}
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
		style={elementShadow}
	/>
	<circle
		cx="99.0523"
		cy="47"
		r="23"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
		style={elementShadow}
	/>
	<path
		d="M99.5381 72.1179C102.309 113.52 96.68 136.058 74.5381 175.118"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
		style={elementShadow}
	/>
	<path
		d="M96.4794 124.74C116.954 139.978 123.868 149.826 124.479 170.74"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
		style={elementShadow}
	/>
	<path
		d="M54.1978 77.5216C75.0908 100.366 124.052 77.5217 146.198 105.522"
		stroke="currentColor"
		stroke-width={bold ? '8' : '4'}
		style={elementShadow}
	/>
</svg>
