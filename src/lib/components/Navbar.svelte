<script lang="ts">
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	import SwitchThemeToggler from './SwitchThemeToggler.svelte';

	let pagePathname = $page.url.pathname;

	let navbarMenu: HTMLDivElement;
	let navbarToggled: boolean = false;

	function toggleNavbar() {
		navbarMenu.classList.toggle('max-sm:hidden');
		navbarMenu.classList.toggle('max-sm:animate-dropDown');
		navbarToggled = !navbarToggled;
	}

	afterUpdate(() => {
		pagePathname = $page.url.pathname;
	});
</script>

<nav
	class="absolute top-0 right-0 left-0 flex justify-center items-center w-full h-fit p-4 max-w-screen-2xl mx-auto z-50"
>
	<div class="flex justify-between items-center w-full">
		<div class="flex justify-center items-center gap-2">
			<a
				href="/"
				on:click={() => {
					if (navbarToggled) toggleNavbar();
				}}
				class="flex justify-center items-center gap-2 tracking-tighter h-auto z-50"
			>
				<img
					src={'/logo.svg'}
					alt="AmbitiousYou Logo"
					class="w-fit h-fit max-w-14 max-h-14 aspect-square"
				/>
				<span class="sm:text-5xl text-4xl">
					<span class="font-light">Ambitious</span><span class="font-bold">You</span>
				</span>
			</a>
		</div>

		<div
			class="max-sm:hidden max-sm:fixed max-sm:inset-0 max-sm:bg-background flex max-sm:flex-col justify-center items-center gap-4 z-40"
			bind:this={navbarMenu}
		>
			<span class="sm:hidden sm:my-10 sm:scale-150">
				<SwitchThemeToggler />
			</span>
			<div
				class="sm:space-x-6 max-sm:space-y-10 text-center flex justify-center items-center max-sm:flex-col"
			>
				<a
					href="/"
					on:click={toggleNavbar}
					class="{pagePathname === '/' ? 'sm:hidden block' : ''} active:opacity-80">Home</a
				>
				<a href="/features" on:click={toggleNavbar} class="active:opacity-80">Features</a>
				<!-- <a href="/pricing" on:click={toggleNavbar} class="hover:brightness-110 active:brightness-90"
					>Pricing</a
				> -->
			</div>
			<div class="flex max-sm:flex-col justify-center items-center gap-2 max-sm:gap-10">
				<a id="secondaryButton" href="/login" on:click={toggleNavbar}>Login</a>
				<a id="primaryButton" href="/signup" on:click={toggleNavbar}>Signup</a>
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
