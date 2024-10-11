<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import DotPattern from '$lib/components/svelte_magicui/DotPattern.svelte';
	import { Toasts } from 'svoast';
</script>

<main
	class="max-w-screen-2xl min-h-dvh flex flex-col justify-between items-center gap-20 mx-auto p-4"
>
	<DotPattern
		width={20}
		height={20}
		cx={10}
		cy={10}
		cr={2}
		class="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
	/>
	<Navbar />
	<slot />
	<Footer />
	<Toasts />
</main>
