<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TextInput from './TextInput.svelte';

	let clazz: string = '';
	const dispatch = createEventDispatcher();

	export let value: string = '';
	export let placeholder: string = '';
	export { clazz as class };
</script>

<div class={clazz + ' relative'}>
	<TextInput
		class="w-full"
		{placeholder}
		bind:value
		on:input={event => dispatch('input', event.detail)}
	/>

	{#if value}
		<div
			class="bg-white border-solid cursor-pointer border-2 border-gray-300 w-full min-h-15 z-2 absolute"
			on:click={() => dispatch('select', value)}
		>
			<slot />
		</div>
	{/if}
</div>
