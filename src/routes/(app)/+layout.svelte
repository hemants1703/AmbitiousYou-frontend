<script lang="ts">
	import DashboardMenubar from '$lib/components/afterAuth/DashboardMenubar.svelte';
	import DashboardNavbar from '$lib/components/afterAuth/DashboardNavbar.svelte';
	import AmbitiousDock from '$lib/components/AmbitiousDock.svelte';
	import { Toasts } from 'svoast';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;
	const { userData } = data;
</script>

<main class="min-h-dvh flex flex-col w-full h-[calc(100vh-5.1rem)]">
	<Toasts />
	<div class="fixed left-0 right-0 top-0 w-full z-50">
		<DashboardMenubar {userData} />
	</div>
	<div class="flex h-[calc(100vh-5.1rem)]">
		<div class="w-full max-w-7xl md:min-w-5xl mx-auto my-10 px-20 py-16 max-md:px-5 text-start">
			<slot />
		</div>
		<!-- <div class="h-full flex justify-center items-center z-40">
			<DashboardNavbar />
		</div> -->
	</div>
	<div class="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-auto z-50">
		<AmbitiousDock />
	</div>
</main>
