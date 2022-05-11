<script lang="ts">
	import { browser } from '$app/env';
	import 'virtual:windi.css';

	// @ts-ignore
	if (browser) import('virtual:windi-devtools');
</script>

<slot />
