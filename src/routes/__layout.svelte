<script context="module" lang="ts">
	import { browser } from '$app/env';
	import GlobalNavbar from '$components/GlobalNavbar.svelte';
	import { dashboards as dashboards_store, socket } from '$lib/stores';
	import type { DiscordUser } from '$types';
	import type { LoadInput } from '@sveltejs/kit';
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
				redirect: '/dashboard'
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
		if (socket) {
			socket.onmessage = event => {
				const message = JSON.parse(event.data);
				const channel = message.channel;
				const type = message.type;
				if (channel === user?.id) {
					if (type === 'create.dashboard') {
						dashboards_store.update(dashboards => [...dashboards, message.data]);
					} else if (type === 'delete.dashboard') {
						dashboards_store.update(dashboards =>
							dashboards.filter(dashboard => dashboard.id !== message.data.id)
						);
					}
				}
			};
			socket.onopen = () => {
				socket?.send(JSON.stringify({ channel: 'connection', id: user?.id, data: user }));
			};
		}
	}
</script>

<GlobalNavbar {user} />

<slot />
