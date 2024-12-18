<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toasts } from 'svoast';
	import { setMode } from 'mode-watcher';

	setMode('dark');
</script>

<main
	class="max-w-screen-2xl min-h-dvh flex flex-col justify-between items-center gap-1 mx-auto p-4 z-50"
>
	<Navbar />
	<slot />
	<Footer />
	<Toasts />
</main>
