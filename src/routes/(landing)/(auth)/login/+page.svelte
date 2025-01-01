<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import type { ActionData } from '../signup/$types';
	import { Eye } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';
	import SvelteSeo from 'svelte-seo';
	import { fly } from 'svelte/transition';

	export let form: ActionData;

	$: if (form) {
		console.log(form);

		if (!form.success) {
			toast.error(form.message);
			loginFormSubmitted = false;
		} else {
			toast.success(form.message);
		}
	}

	let passwordInputElement: HTMLInputElement;
	let revealInputPassword: boolean = false;

	function handleRevealInputPassword() {
		revealInputPassword = !revealInputPassword;
		passwordInputElement.type = revealInputPassword ? 'text' : 'password';
	}

	let loginFormSubmitted = false;
</script>

<SvelteSeo
	title="Login - AmbitiousYou"
	description="Log in to your AmbitiousYou account to continue managing your ambitions and tracking your journey to becoming superhuman."
	canonical="https://ambitious-you.vercel.app/login"
	keywords="login, sign in, access account, ambitiousyou login, ambitions management, goal tracking"
	openGraph={{
		title: 'Login - AmbitiousYou',
		description:
			'Log in to your AmbitiousYou account to continue managing your ambitions and tracking your journey to becoming superhuman.',
		url: 'https://ambitious-you.vercel.app/login',
		type: 'website',
		images: [
			{
				url: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png',
				width: 1200,
				height: 630,
				alt: 'Login to AmbitiousYou'
			}
		],
		site_name: 'AmbitiousYou!'
	}}
	twitter={{
		card: 'summary_large_image',
		creator: '@hemants1703',
		title: 'Login - AmbitiousYou',
		description:
			'Log in to your AmbitiousYou account to continue managing your ambitions and tracking your journey to becoming superhuman.',
		image: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png'
	}}
/>

<svelte:head>
	<title>Login to your AmbitiousYou account</title>
</svelte:head>

<div
	class={`flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto min-h-svh`}
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
	<div class="sm:max-w-sm w-3/4">
		<h1 class="font-bold text-7xl text-end max-md:text-start">🔐 Login</h1>
		<p class="text-xl mt-5 text-end max-md:text-start">
			Log in to pursue your ambitions and start your journey to greatness!
		</p>
	</div>
	<div class="sm:w-1/2 border bg-background shadow-sm p-5 rounded-2xl sm:max-w-sm w-3/4 z-10">
		<form
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
			use:enhance={() => {
				loginFormSubmitted = true;
			}}
		>
			<input
				required
				placeholder="Email"
				type="email"
				name="email"
				class="text-lg font-geist-mono bg-transparent border rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<div class="relative">
				<input
					required
					placeholder="Password"
					type="password"
					name="password"
					bind:this={passwordInputElement}
					class="w-full text-lg font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
				/>
				<button
					type="button"
					on:click={handleRevealInputPassword}
					class="absolute right-1 top-1 bottom-1 p-2 flex place-items-center text-muted-foreground {revealInputPassword
						? 'bg-foreground bg-opacity-20'
						: ''} hover:bg-foreground hover:bg-opacity-10 rounded-sm"
				>
					{#if revealInputPassword}
						<Eye />
					{:else}
						<EyeClosed />
					{/if}
				</button>
			</div>
			<button
				id="primaryButton"
				type="submit"
				disabled={loginFormSubmitted}
				class="flex justify-center items-center gap-2"
			>
				{#if loginFormSubmitted}
					<span class="animate-spin"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path
								d="m16.2 16.2 2.9 2.9"
							/><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path
								d="m4.9 4.9 2.9 2.9"
							/></svg
						></span
					>
					<span> Logging you in... </span>
				{:else}
					<span>Login</span>
				{/if}
			</button>
		</form>
	</div>
</div>
