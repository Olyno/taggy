<script context="module" lang="ts">
	import { page } from '$app/stores';
	import EventIcon from '$components/icons/Event.svelte';
	import SettingIcon from '$components/icons/Setting.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import { dashboards as dashboards_store } from '$lib/stores';
	import type { DashboardType } from '$types';
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ session, fetch, url }: LoadInput) {
		// @ts-ignore
		if (!session.authenticated) {
			return { status: 302, redirect: '/' };
		}
		const response = await fetch('/api/dashboards');
		const data = response.ok && (await response.json());
		return {
			status: 200,
			props: {
				dashboards: data || []
			}
		};
	}
</script>

<script lang="ts">
	export let dashboards: DashboardType[] = [];

	if (dashboards.length > 0) {
		dashboards_store.set(dashboards);
	}

	const sidebar_items = (params: Record<string, string>) => {
		if (params.id) {
			return [
				{
					name: 'Events',
					href: `/dashboards/${params.id}/events`,
					icon: EventIcon
				},
				{
					name: 'Settings',
					href: `/dashboards/${params.id}/settings`,
					icon: SettingIcon
				}
			];
		}
		return [
			{
				name: 'Dashboards',
				href: `/dashboards`
			}
		];
	};
</script>

<svelte:head>
	<title>Taggy Dashboard</title>
</svelte:head>

<section class="flex gap-10">
	{#if $dashboards_store.length > 0}
		<Sidebar items={sidebar_items($page.params)} />
	{/if}

	<section class="w-full h-screen overflow-auto pb-30">
		<main class="p-10 w-full">
			<slot />
		</main>
	</section>
</section>

<style>
	:global(body) {
		overflow-y: hidden;
	}
</style>
