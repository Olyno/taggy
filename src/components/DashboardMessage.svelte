<script lang="ts">
	import { confetti, markdown } from '$lib/actions';
	import type { MessageType } from '$types';
	import dayjs from 'dayjs';
	import CheckMarkIcon from './icons/CheckMark.svelte';
	import LinkIcon from './icons/Link.svelte';

	export let message: MessageType;
	console.log('🚀 ~ file: DashboardMessage.svelte ~ line 9 ~ message', message);

	async function readMessage() {
		const body = {
			processed_at: new Date()
		};
		const new_message = await fetch('/api/messages/' + message.id, {
			method: 'PATCH',
			body: JSON.stringify(body)
		}).then(res => res.json());
		if (new_message) {
			message = new_message;
		}
	}

	const message_date = dayjs(message.bookmarked_at).format('DD/MM/YYYY');
</script>

<div class="border-2 rounded-md w-1/3 p-5 relative mt-5">
	<div class="flex justify-between">
		<div>
			<!-- TODO: Add avatar of author -->
			<!-- <img src="" alt="" /> -->
			<span class="font-bold">{message.author}</span>
		</div>
		<div class="flex gap-2">
			<a target="_blank" rel="noopener noreferrer nofollow" href={message.url}>
				<LinkIcon width={25} height={25} class="fill-blue-500" />
			</a>
			{#if !message.processed_at}
				<button use:confetti on:click={readMessage}>
					<CheckMarkIcon width={25} height={25} class="fill-primary" />
				</button>
			{/if}
		</div>
	</div>
	<p class="mt-5" use:markdown>{message.content}</p>
	<footer class="flex gap-2 text-xs mt-5">
		<p>{message.author}</p>
		<span> • </span>
		<p>{message_date}</p>
	</footer>
</div>
