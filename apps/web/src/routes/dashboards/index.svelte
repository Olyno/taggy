<script context="module" lang="ts">
	import Button from '$components/form/Button.svelte';
	import LogoutButton from '$components/form/LogoutButton.svelte';
	import TextInput from '$components/form/TextInput.svelte';
	import { dashboards as dashboards_store } from '$lib/stores';
	import type { DiscordApplication } from '$types';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, fetch }) => {
		return {
			status: 200,
			props: {
				// @ts-ignore
				application: session.application
			}
		};
	};
</script>

<script lang="ts">
	export let application: DiscordApplication;

	let query: string = '';

	$: dashboards = $dashboards_store.filter(dashboard => {
		return (
			dashboard.guild_name.toLowerCase().includes(query.toLowerCase()) ||
			dashboard.id_guild === query
		);
	});

	const bot_link =
		'https://discord.com/oauth2/authorize?client_id=934959755691192431&scope=bot%20applications.commands&permissions=388762160192';

	const application_icon = application?.icon
		? `https://cdn.discordapp.com/avatars/${application.id}/${application.icon}.png`
		: '/images/discord_default_icon.png';
</script>

{#if $dashboards_store.length > 0}
	<TextInput
		bind:value={query}
		placeholder="Search a dashboard by guild name, id..."
		class="w-1/3"
	/>

	{#each dashboards as dashboard}
		<a
			class="flex items-center shadow-md p-5 w-1/4 mt-10 rounded-md hover:bg-gray-200"
			href={`/dashboards/${dashboard.id}/events`}
		>
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
			<Button class="bg-primary py-7 px-5 gap-5 w-4/5 <md:w-full" href={bot_link} target="_blank">
				<img src={application_icon} alt="Bot icon" loading="lazy" class="w-10 h-10 rounded-full" />
				Add Taggy to your server
			</Button>
			<LogoutButton class="w-1/5 py-7" />
		</div>
	</section>
{/if}
