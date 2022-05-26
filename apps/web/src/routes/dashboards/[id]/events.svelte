<script lang="ts">
	import DashboardMessage from '$components/DashboardMessage.svelte';
	import { dashboard } from '$lib/stores';
	import { sortBy } from 'lodash';
</script>

{#if $dashboard}
	{#each $dashboard.events as event}
		<section>
			<h1 class="text-2xl font-bold">{event.name}</h1>
			<section class="overflow-x-auto mt-7">
				{#each event.message_groups as group}
					<h2 class="text-xl font-semibold">{group.name}</h2>
					{#if group.messages.length > 0}
						<div class="flex flex-wrap gap-10">
							{#each sortBy(group.messages, 'processed_at').reverse() as message}
								<DashboardMessage {message} />
							{/each}
						</div>
					{:else}
						<h3 class="text-base text-red-500 mt-7">No messages added yet!</h3>
					{/if}
				{/each}
			</section>
		</section>
	{/each}
{:else}
	<h1 class="text-2xl text-red-500">An error happened, please retry later</h1>
{/if}
