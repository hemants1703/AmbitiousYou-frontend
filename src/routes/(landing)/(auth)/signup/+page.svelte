<script lang="ts">
	import { toast } from 'svoast';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Eye } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';
	import { Client, Account } from 'appwrite';
	import { PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
	import { goto } from '$app/navigation';
	import SvelteSeo from 'svelte-seo';
	import { fly } from 'svelte/transition';

	export let form: ActionData;
	// $: console.log('Signup form response from server:', form);

	const signUpDetails = {
		fullName: '',
		email: '',
		password: ''
	};

	$: if (form) {
		if (form.success) {
			toast.success(form.message);
		} else {
			if (form.body?.response?.type === 'user_already_exists')
				toast.error(
					"Email already exists. Please login or try another email if you don't have an account."
				);

			if (form.message === 'Invalid Password') {
				toast.error('Invalid Password');
				handleInvalidPassword(form);
			}

			signupFormSubmitted = false;
		}
	}

	function handleInvalidPassword(form: ActionData) {
		signUpDetails.fullName = form!.body.formData.fullName;
		signUpDetails.email = form!.body.formData.email;
		signupFormSubmitted = false;
	}

	let passwordInputElement: HTMLInputElement;
	let revealInputPassword: boolean = false;

	function handleRevealInputPassword() {
		revealInputPassword = !revealInputPassword;
		passwordInputElement.type = revealInputPassword ? 'text' : 'password';
	}

	let signupFormSubmitted = false;
</script>

<SvelteSeo
	title="Sign Up - AmbitiousYou"
	description="Create your free AmbitiousYou account and start your journey to becoming superhuman. Manage your ambitions and achieve your goals."
	canonical="https://www.ambitiousyou.pro/signup"
	keywords="sign up, create account, free account, register, join ambitiousyou, ambitions management, goal tracking, become superhuman"
	openGraph={{
		title: 'Sign Up - AmbitiousYou',
		description:
			'Create your free AmbitiousYou account and start your journey to becoming superhuman. Manage your ambitions and achieve your goals.',
		url: 'https://www.ambitiousyou.pro/signup',
		type: 'website',
		images: [
			{
				url: 'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png',
				width: 1200,
				height: 630,
				alt: 'Sign up for AmbitiousYou'
			}
		],
		site_name: 'AmbitiousYou!'
	}}
	twitter={{
		card: 'summary_large_image',
		creator: '@hemants1703',
		title: 'Sign Up - AmbitiousYou',
		description:
			'Create your free AmbitiousYou account and start your journey to becoming superhuman. Manage your ambitions and achieve your goals.',
		image:
			'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png'
	}}
/>

<div
	class={`flex max-md:flex-col lg:gap-40 gap-10 py-36 justify-center items-center w-full h-full mx-auto min-h-svh`}
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
	<div class=" max-w-96 w-3/4 max-md:text-start">
		<h1 class="font-bold text-7xl text-end max-md:text-start">📑 Signup</h1>
		<p class="text-2xl mt-5 text-end max-md:text-start">Create an account to get started</p>
		<p class="text-lg mt-5 text-end text-[--custom-light] dark:text-[--custom-dark] max-md:text-start">
			You're about to be a superhuman and fulfil all your big dreams and ambitions in life!
		</p>
	</div>
	<div class="sm:w-1/2 border p-5 rounded-2xl sm:max-w-sm w-3/4 z-10 bg-background shadow-sm">
		<form
			action="?/createAccount"
			method="POST"
			class="flex flex-col gap-4"
			use:enhance={() => {
				signupFormSubmitted = true;
			}}
		>
			<input
				bind:value={signUpDetails.fullName}
				placeholder="Full Name"
				type="text"
				name="fullName"
				required
				class="text-lg bg-transparent border rounded-lg py-1 px-2 active:outline-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-primary)] focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-100 ease-in-out"
			/>
			<input
				bind:value={signUpDetails.email}
				placeholder="Email"
				type="email"
				name="email"
				required
				class="text-lg bg-transparent border rounded-lg py-1 px-2 active:outline-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-primary)] focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-100 ease-in-out"
			/>
			<div class="relative">
				<input
					placeholder="Password"
					type="password"
					name="password"
					required
					bind:this={passwordInputElement}
					class="text-lg w-full font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-primary)] focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-100 ease-in-out"
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
			<div class="flex items-center gap-2">
				<input type="checkbox" id="agree" name="agree" required class="mr-2" />
				<label for="agree" class="text-sm text-gray-400">
					By signing up, you agree to our
					<a href="/terms_and_conditions" class="text-[#64ccc5] hover:underline">T&C</a>
					and
					<a href="/privacy_policy" class="text-[#64ccc5] hover:underline">Privacy Policy</a>.
				</label>
			</div>
			<div
				class={`${form && !form.success && form.message === 'Invalid Password' ? 'animate-shake text-red-500 opacity-65' : 'opacity-50'} font-extralight`}
			>
				Password must contain at least:
				<ul class="mt-2">
					<li>1 uppercase letter</li>
					<li>1 lowercase letter</li>
					<li>1 number</li>
					<li>1 special character [@ $ ! % * ? &]</li>
					<li>8 characters long</li>
				</ul>
			</div>
			<button
				id="primaryButton"
				type="submit"
				disabled={signupFormSubmitted}
				class="flex justify-center items-center gap-2"
			>
				{#if signupFormSubmitted}
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
					<span>Creating Free Account!</span>
				{:else}
					Create Free Account!
				{/if}
			</button>
		</form>
	</div>
</div>
