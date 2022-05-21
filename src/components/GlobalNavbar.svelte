<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DiscordUser } from '$types';
	import Button from './form/Button.svelte';

	export let user: DiscordUser | null = null;

	function createDiscordLoginLink() {
		const scopes = ['identify'];
		const redirect_uri = window.location.origin;
		const client_id = import.meta.env.VITE_DISCORD_CLIENT_ID;
		return `https://discord.com/oauth2/authorize?response_type=code&client_id=${client_id}&scope=${scopes.join(
			'%20'
		)}&state=15773059ghq9183habn&redirect_uri=${redirect_uri}&prompt=consent"`;
	}

	function loginWithDiscord() {
		return goto(createDiscordLoginLink());
	}
</script>

<nav class="flex justify-between items-center p-5 bg-accent text-white">
	<ul />
	<ul>
		{#if !user}
			<li>
				<Button class="bg-accent" on:click={loginWithDiscord}>Login with Discord</Button>
			</li>
		{:else}
			<li>
				<Button class="bg-accent" on:click={() => goto('/dashboard')}>
					<img
						class="w-12 h-12 rounded-full"
						src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png"
						alt="Avatar of {user.username}"
						loading="lazy"
					/>
				</Button>
			</li>
		{/if}
	</ul>
</nav>
