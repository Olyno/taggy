<script lang="ts" context="module">
	import { dashboard as dashboard_store } from '$lib/stores';
	import type { DashboardType } from '$types';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const dashboard_response = await fetch('/api/dashboards/' + params.id);
		const dashboard = dashboard_response.ok && (await dashboard_response.json());
		if (!dashboard) {
			return {
				status: 302,
				redirect: '/dashboards'
			};
		}
		return {
			status: 200,
			props: {
				dashboard
			}
		};
	};
</script>

<script lang="ts">
	export let dashboard: DashboardType;

	dashboard_store.set(dashboard);
</script>

<slot />
