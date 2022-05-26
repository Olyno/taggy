<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let clazz: string = '';
	const dispatch = createEventDispatcher();

	async function onInput(event: any) {
		const value = event.target.value;
		dispatch('input', value);
	}

	export let value: string = '';
	export let placeholder: string = '';
	export { clazz as class };
</script>

<input
	type="text"
	{placeholder}
	on:input={onInput}
	bind:value
	class="{clazz} border-2 rounded-md p-2 border-gray-300 border-solid outline-none"
/>
