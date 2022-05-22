<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Button from './Button.svelte';

	let clazz: string = '';

	async function logout() {
		$session = {};
		const response = await fetch('/api/auth', { method: 'DELETE' });
		if (response.ok) {
			goto('/');
		}
	}

	export { clazz as class };
</script>

<Button class="bg-red-500 px-5 {clazz} <md:w-full" on:click={logout}>Logout</Button>
