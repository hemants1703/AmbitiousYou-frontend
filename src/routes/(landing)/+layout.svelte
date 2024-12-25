<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toasts } from 'svoast';
	import { setMode } from 'mode-watcher';
	import BlurFade from '$lib/components/svelte_magicui/BlurFade.svelte';

	setMode('dark');
</script>

<main
	class="max-w-screen-2xl min-h-dvh flex flex-col justify-between items-center mx-auto p-4 z-50 overflow-x-hidden"
>
	<Navbar />
	<slot />
	<Footer />
	<Toasts />
	<div
		class="absolute -z-50 inset-0 bg-gradient-to-b from-[--custom-background-gradient-start] to-black"
	></div>
</main>
