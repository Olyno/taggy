<script lang="ts" context="module">
	export const load: Load = async ({ session }) => {
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
	import DashboardMember from '$components/DashboardMember.svelte';
	import DashboardSearchMember from '$components/DashboardSearchMember.svelte';
	import AutocompleteInput from '$components/form/AutocompleteInput.svelte';
	import { searchMembers } from '$lib/socket';
	import { dashboard as dashboard_store, socket_listening } from '$lib/stores';
	import type { DashboardMemberType, DiscordUser } from '$types';
	import type { Load } from '@sveltejs/kit';
	import { onDestroy } from 'svelte';

	export let user: DiscordUser;

	let members: DashboardMemberType[] = [];
	let id_members = $dashboard_store?.id_members.filter(id => id !== user.id) || [];
	let autocomplete_members: DashboardMemberType[] = [];
	let search_query: string;
	let search_timer: NodeJS.Timeout;

	const member = user as unknown as DashboardMemberType;

	async function loadMembers() {
		if (id_members.length === 0) return;
		members = await searchMembers(user.id, id_members, true);
	}

	async function addMember(member: DashboardMemberType) {
		id_members = [...id_members, member.id];
		members = [...members, member];
	}

	async function removeMember(member: DashboardMemberType) {
		id_members = id_members.filter(id => id !== member.id);
		members = members.filter(m => m.id !== member.id);
	}

	async function searchMember(query: string) {
		if (query.length === 0) return;
		if (search_timer) clearTimeout(search_timer);
		let members_found = await searchMembers(user.id, query);
		if (members_found.length > 5) members_found = members_found.slice(0, 5);
		autocomplete_members = members_found.filter(m => {
			return !id_members.some(id => id === m.id);
		});
	}

	async function addMemberToDashboard(value: CustomEvent<DashboardMemberType>) {
		const member = value.detail;
		search_query = '';
		addMember(member);
		fetch('/api/dashboards/' + $dashboard_store?.id, {
			method: 'PATCH',
			body: JSON.stringify({ id_members: [...id_members, user.id] })
		})
			.then(res => res.json())
			.then(res => dashboard_store.set(res));
	}

	async function removeMemberFromDashboard(value: CustomEvent<DashboardMemberType>) {
		if (confirm('Are you sure you want to remove this member?')) {
			const member = value.detail;
			removeMember(member);
			fetch('/api/dashboards/' + $dashboard_store?.id, {
				method: 'PATCH',
				body: JSON.stringify({ id_members: [...id_members, user.id] })
			})
				.then(res => res.json())
				.then(res => dashboard_store.set(res));
		}
	}

	const unsubscribe = socket_listening.subscribe(is_listening => {
		if (!is_listening) return;
		loadMembers();
	});

	onDestroy(unsubscribe);
</script>

<section class="flex flex-col">
	<label for="user_query" class="text-lg font-bold">Add a new moderator</label>
	<AutocompleteInput
		on:input={value => searchMember(value.detail)}
		bind:value={search_query}
		placeholder="Search a user by name, id..."
		class="w-1/3 mt-5"
	>
		{#each autocomplete_members as member}
			<DashboardSearchMember {member} on:click={addMemberToDashboard} />
		{/each}
	</AutocompleteInput>

	<section class="mt-5 flex flex-wrap gap-5 children:w-1/5">
		<DashboardMember {member} />
		<!-- TODO: Add loading placeholders -->
		{#each members as m}
			<DashboardMember member={m} on:delete={removeMemberFromDashboard} />
		{/each}
	</section>
</section>
