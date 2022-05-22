<script lang="ts">
	import { page } from '$app/stores';
	import LogoutButton from './form/LogoutButton.svelte';

	interface SidebarItem {
		name: string;
		href: string;
		icon?: any;
	}

	export let items: SidebarItem[] = [];

	$: current_page = $page.url.pathname;
</script>

<aside class="<md:hidden w-2/15 bg-primary text-white h-screen p-3 flex justify-between flex-col">
	<section class="flex flex-col gap-2 children:(flex items-center p-2)">
		{#each items as item}
			<a class="rounded-md {item.href === current_page && 'bg-accent'}" href={item.href}>
				{#if item.icon}
					<div class="w-2/5">
						<svelte:component this={item.icon} width={30} height={30} class="fill-white" />
					</div>
				{/if}
				<p class={item.icon ? 'w-4/5' : 'w-full ml-2'}>
					{item.name}
				</p>
			</a>
		{/each}
	</section>
	{#if current_page === '/dashboards'}
		<footer class="mb-20 w-full">
			<LogoutButton class="w-full py-2" />
		</footer>
	{/if}
</aside>

<style>
	a p {
		font-size: 18px;
	}
</style>
