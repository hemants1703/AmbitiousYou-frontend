<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toasts } from 'svoast';
</script>

<Navbar />
<main
	class="max-w-screen-2xl min-h-svh flex flex-col justify-between items-center mx-auto p-4 z-50 overflow-x-hidden"
>
	<span
		class="absolute -z-50 inset-0 bg-gradient-to-b from-[--custom-background-gradient-start] to-transparent"
	></span>
	<slot />
</main>
<Toasts />
<Footer />
