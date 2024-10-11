<script lang="ts">
	import ThemeToggler from './ThemeToggler.svelte';

	let navbarMenu: HTMLDivElement;
	let navbarToggled: boolean = false;

	function toggleNavbar() {
		navbarMenu.classList.toggle('max-sm:hidden');
		navbarToggled = !navbarToggled;
		document.documentElement.style.overflow = navbarToggled ? 'hidden' : 'auto';
	}
</script>

<nav class="flex justify-center items-center w-full h-fit">
	<div class="flex justify-between items-center w-full">
		<!-- <span><a href="/" class="font-bold text-4xl">AmbitiousYou 🚩</a></span> -->
		<a
			href="/"
			class="z-50"
			on:click={() => {
				if (navbarToggled) toggleNavbar();
			}}
			><img
				src={'/logo.svg'}
				alt="AmbitiousYou Logo"
				class="w-fit h-fit max-w-14 max-h-14 aspect-square"
			/></a
		>

		<div
			class="max-sm:hidden flex max-sm:flex-col justify-center items-center gap-10 max-sm:fixed max-sm:inset-0 max-sm:top-0 max-sm:bg-background max-sm:z-40"
			bind:this={navbarMenu}
		>
			<div class="space-x-6">
				<a id="primaryLink" href="/features" on:click={toggleNavbar}>Features</a>
				<!-- <a id="primaryLink" href="/pricing">Pricing</a> -->
			</div>

			<div class="flex max-sm:flex-col justify-center items-center gap-2 max-sm:gap-10">
				<ThemeToggler />
				<a id="secondaryButton" href="/signup" on:click={toggleNavbar}>Sign Up</a>
				<a id="primaryButton" href="/login" on:click={toggleNavbar}>Login</a>
			</div>
		</div>
		<button on:click={toggleNavbar} class="sm:hidden z-50">
			{#if navbarToggled}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-8 text-[--custom-secondary] cursor-pointer sm:hidden"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-8 text-[--custom-secondary] cursor-pointer sm:hidden"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			{/if}
		</button>
	</div>
</nav>
