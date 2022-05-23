<script lang="ts">
	import type { DashboardMemberType } from '$types';
	import { createEventDispatcher } from 'svelte';

	export let member: DashboardMemberType;

	const dispatch = createEventDispatcher();

	const avatar = member.avatar
		? `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`
		: '/images/discord_default_icon.png';
</script>

<div
	class="flex items-center gap-5 px-5 py-2 hover:bg-gray-100"
	on:click={() => dispatch('click', member)}
>
	<img src={avatar} alt="User avatar" loading="lazy" class="rounded-full w-10 h-10" />
	<span>
		{member.username}
	</span>
</div>
