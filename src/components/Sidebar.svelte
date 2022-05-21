<script lang="ts">
	import { page } from '$app/stores';

	interface SidebarItem {
		name: string;
		href: string;
		icon: any;
	}

	export let items: SidebarItem[] = [];

	const current_page = $page.url.pathname;
</script>

<aside
	class="<md:hidden w-2/15 bg-primary text-white h-screen p-3 flex flex-col gap-2 children:(flex items-center p-2)"
>
	{#each items as item}
		<a class="rounded-md {item.href === current_page && 'bg-accent'}" href={item.href}>
			<div class="w-1/3">
				<svelte:component this={item.icon} width={30} height={30} class="fill-white" />
			</div>
			<p class="w-2/3">
				{item.name}
			</p>
		</a>
	{/each}
</aside>

<style>
	a p {
		font-size: 18px;
	}
</style>
