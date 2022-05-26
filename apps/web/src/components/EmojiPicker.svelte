<script lang="ts">
	import { isMobile } from '$lib/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import EmojiIcon from './icons/Emoji.svelte';

	export let selectedEmoji: string | null = null;
	export { clazz as class };

	let clazz: string = '';
	let container: HTMLDivElement;

	const dispatch = createEventDispatcher();

	function togglePicker() {
		container.style.display = container.style.display === 'none' ? 'block' : 'none';
		if (container.style.display === 'block') {
			const child = container.firstChild as HTMLElement;
			if (child) {
				child.style.position = 'absolute';
			}
		}
	}

	onMount(() => {
		container.style.display = 'none';
		Promise.all([import('picmo'), import('@picmo/renderer-twemoji')]).then(
			([{ createPicker }, { TwemojiRenderer }]) => {
				const picker = createPicker({
					rootElement: container,
					renderer: new TwemojiRenderer(),
					emojiSize: isMobile ? '1.5em' : '2em'
				});
				picker.addEventListener('emoji:select', event => {
					selectedEmoji = event.emoji;
					togglePicker();
					dispatch('select', event.emoji);
				});
			}
		);
	});
</script>

<button class="{clazz} text-2xl flex items-center justify-center" on:click={togglePicker}>
	{#if !selectedEmoji}
		<EmojiIcon width={30} height={30} />
	{:else}
		{selectedEmoji}
	{/if}
</button>

<div bind:this={container} class="w-1/2" />
