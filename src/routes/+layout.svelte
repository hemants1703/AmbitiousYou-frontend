<script lang="ts">
	import { Toasts } from 'svoast';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';

	inject({ mode: dev ? 'development' : 'production' });

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js').then((reg) => {
				// console.log('Service worker registered', reg);
			});
		}
	});
</script>

<ModeWatcher />
<Toasts />
<slot />
