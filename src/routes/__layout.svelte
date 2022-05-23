<script context="module" lang="ts">
	import { browser } from '$app/env';
	import GlobalNavbar from '$components/GlobalNavbar.svelte';
	import { dashboards as dashboards_store, socket, socket_listening } from '$lib/stores';
	import type { DiscordUser } from '$types';
	import type { LoadInput } from '@sveltejs/kit';
	import { onDestroy } from 'svelte';
	import 'virtual:windi.css';

	export async function load({ fetch, url, session }: LoadInput) {
		const { searchParams } = url;
		// @ts-ignore
		if (searchParams && searchParams.get('code') && !session.authenticated) {
			const response = await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({
					code: searchParams.get('code')
				})
			});
			const data = response.ok && (await response.json());
			if (!data) return { status: 400 };
			return {
				status: 302,
				redirect: '/dashboards'
			};
		}
		return {
			status: 200,
			props: {
				// @ts-ignore
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	export let user: DiscordUser | null = null;

	if (browser) {
		// @ts-ignore
		import('virtual:windi-devtools');
	}

	socket?.on('create.dashboard', newDashboard => {
		dashboards_store.update(dashboards => [...dashboards, newDashboard]);
	});
	socket?.on('delete.dashboard', oldDashboard => {
		dashboards_store.update(dashboards =>
			dashboards.filter(dashboard => dashboard.id !== oldDashboard.id)
		);
	});

	const unsubscribe = socket_listening.subscribe(is_listening => {
		if (!is_listening) return;
		socket?.emit('connection', { id: user?.id, data: user });
	});

	onDestroy(unsubscribe);
</script>

<GlobalNavbar {user} />

<slot />
