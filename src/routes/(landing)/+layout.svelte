<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import { Toasts } from 'svoast';
	import { setMode } from 'mode-watcher';

	setMode('dark');
</script>

<Particles className="fixed inset-0 -z-50" />
<main
	class="max-w-screen-2xl min-h-dvh flex flex-col justify-between items-center gap-20 mx-auto p-4 z-50"
>
	<Navbar />
	<slot />
	<Footer />
	<Toasts />
</main>
