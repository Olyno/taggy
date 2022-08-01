<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import type { DiscordUser } from '$types';
	import Button from './form/Button.svelte';

	export let user: DiscordUser | null = null;

	function loginWithDiscord() {
		const scopes = ['identify']
		return supabaseClient?.auth.signIn({
			provider: 'discord',
		}, { scopes: scopes.join(' ') })
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
				<Button class="bg-accent" href="/dashboards">
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
