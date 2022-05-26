<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let clazz: string = '';

	export let href: string = '';
	export let target: string = '';
	export { clazz as class };
</script>

{#if href}
	<a
		class="{clazz} rounded-md p-2 h-10 text-white flex items-center justify-center"
		rel={target === '_blank' ? 'noopener noreferrer nofollow' : ''}
		{href}
		{target}
	>
		<slot />
	</a>
{:else}
	<button
		class="{clazz} rounded-md p-2 h-10 text-white flex items-center justify-center"
		on:click={e => dispatch('click', e)}
	>
		<slot />
	</button>
{/if}
