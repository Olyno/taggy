<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import GlobalNavbar from '$components/GlobalNavbar.svelte';
	import { supabaseClient } from '$lib/db';
	import { dashboards as dashboards_store, socket, socket_listening } from '$lib/stores';
	import type { DiscordUser } from '$types';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
	import type { Load } from '@sveltejs/kit';
	import { onDestroy } from 'svelte';
	import 'virtual:windi.css';

	export const load: Load = async ({ fetch, url, session }) => {
		// console.log('User:', session.user);
		return {
			status: 200,
			props: {
				// @ts-ignore
				user: session.user
			}
		};
	};
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

<SupaAuthHelper {supabaseClient} {session}>
	<slot />
</SupaAuthHelper>
