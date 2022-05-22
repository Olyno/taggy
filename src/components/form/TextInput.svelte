<script lang="ts">
	let clazz: string = '';

	export let value: string = '';
	export let placeholder: string = '';
	export { clazz as class };
</script>

<input
	type="text"
	{placeholder}
	bind:value
	class="{clazz} border-2 rounded-md p-2 border-gray-300 border-solid outline-none"
/>
