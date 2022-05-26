<script lang="ts">
	import { session } from '$app/stores';
	import type { DashboardMemberType } from '$types';
	import { createEventDispatcher } from 'svelte';
	import CrossIcon from './icons/Cross.svelte';

	const dispatch = createEventDispatcher();

	export let member: DashboardMemberType;
	export let is_autocomplete_data: boolean = false;

	const avatar = member.avatar
		? `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`
		: '/images/discord_default_icon.png';

	// @ts-ignore
	const logged_user = $session.user;
</script>

<div
	class="flex items-center gap-5 relative h-30 {is_autocomplete_data ? 'ml-3' : 'mt-5'}"
	on:click={() => dispatch('click', member)}
>
	<img
		src={avatar}
		alt="User avatar"
		loading="lazy"
		class="rounded-full {is_autocomplete_data ? 'w-12 h-12' : 'w-20 h-20'}"
	/>
	<span>
		{member.username}
	</span>
	{#if member.id !== logged_user.id}
		<button class="absolute top-3 right-3" on:click={() => dispatch('delete', member)}>
			<CrossIcon width={30} height={30} class="fill-red-500" />
		</button>
	{/if}
</div>
