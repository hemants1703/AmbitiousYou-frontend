<script lang="ts">
	import ThemeToggler from './ThemeToggler.svelte';
	import { page } from '$app/stores';

	let pagePathname = $page.url.pathname;

	let navbarMenu: HTMLDivElement;
	let navbarToggled: boolean = false;

	function toggleNavbar() {
		navbarMenu.classList.toggle('max-sm:hidden');
		navbarMenu.classList.toggle('max-sm:animate-dropDown');
		navbarToggled = !navbarToggled;
	}
</script>

<nav class="flex justify-center items-center w-full h-fit">
	<div class="flex justify-between items-center w-full">
		<div class="flex justify-center items-center gap-2">
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
			{#if pagePathname !== '/'}
				<span><a href="/" class="font-bold text-4xl">AmbitiousYou</a></span>
			{/if}
		</div>

		<div
			class="max-sm:hidden max-sm:fixed max-sm:inset-0 max-sm:bg-background flex max-sm:flex-col justify-center items-center gap-10 z-40"
			bind:this={navbarMenu}
		>
			<div
				class="sm:space-x-6 max-sm:space-y-10 text-center flex justify-center items-center max-sm:flex-col"
			>
				<a href="/" on:click={toggleNavbar} class={pagePathname === '/' ? 'sm:hidden block' : ''}
					>Home</a
				>

				<a
					href="/features"
					on:click={toggleNavbar}
					class="relative inline-flex overflow-hidden rounded-xl p-px {pagePathname === '/'
						? 'sm:hidden block'
						: ''}"
				>
					<span
						class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#64CCC5_50%,#bebebe_100%)]"
					/>
					<span
						class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-background px-4 py-2 text-sm font-medium text-foreground backdrop-blur-3xl"
					>
						Explore Features!
					</span>
				</a>
			</div>

			<div class="flex max-sm:flex-col justify-center items-center gap-2 max-sm:gap-10">
				<!-- <ThemeToggler /> -->
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
