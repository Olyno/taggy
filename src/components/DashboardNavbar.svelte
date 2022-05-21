<script lang="ts">
	import Dropdown from './form/Dropdown.svelte';
</script>

<nav class="flex justify-between w-full bg-accent p-5 text-white">
	<ul />
	<ul class="flex items-center">
		<li>
			<Dropdown
				class="bg-primary w-60"
				items={[
					{
						name: 'test',
						value: 'test',
						image:
							'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*'
					},
					{
						name: 'test2',
						value: 'test2',
						image:
							'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*'
					}
				]}
			/>
		</li>
	</ul>
</nav>
