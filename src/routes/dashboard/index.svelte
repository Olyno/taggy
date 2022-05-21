<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Button from '$components/form/Button.svelte';
	import { dashboards as dashboards_store } from '$lib/stores';
	import type { DiscordApplication } from '$types';
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ session, fetch }: LoadInput) {
		return {
			status: 200,
			props: {
				// @ts-ignore
				application: session.application
			}
		};
	}
</script>

<script lang="ts">
	export let application: DiscordApplication;

	async function logout() {
		$session = {};
		const response = await fetch('/api/auth', { method: 'DELETE' });
		if (response.ok) {
			goto('/');
		}
	}

	const bot_link =
		'https://discord.com/oauth2/authorize?client_id=934959755691192431&scope=bot%20applications.commands&permissions=388762160192';

	const application_icon = application?.icon
		? `https://cdn.discordapp.com/avatars/${application.id}/${application.icon}.png`
		: '/images/discord_default_icon.png';
</script>

{#if $dashboards_store.length > 0}
	{#each $dashboards_store as dashboard}
		<a class="flex items-center p-5 hover:bg-primary" href={`/dashboard/${dashboard.id}/events`}>
			<img
				class="w-20 h-20 rounded-full"
				alt="Guild {dashboard.id_guild} image"
				src={dashboard.guild_image_url}
			/>
			<span class="ml-4">{dashboard.guild_name}</span>
		</a>
	{/each}
{:else}
	<section class="center flex-col md:p-10 text-center mt-10">
		<h1 class="text-2xl">No dashboard available</h1>
		<h2 class="mt-2 <md:mt-10">
			Add Taggy to your Discord server to get your personnalized dashboard!<br />Or ask to your
			Discord owner to add you as moderator!
		</h2>
		<div class="flex gap-5 items-center mt-10 justify-center <md:flex-col">
			<Button class="bg-primary py-7 px-5 gap-5 w-4/5 <md:w-full" href={bot_link}>
				<img src={application_icon} alt="Bot icon" loading="lazy" class="w-10 h-10 rounded-full" />
				Add Taggy to your server
			</Button>
			<Button class="bg-red-500 py-7 px-5 w-1/5 <md:w-full" on:click={logout}>Logout</Button>
		</div>
	</section>
{/if}
