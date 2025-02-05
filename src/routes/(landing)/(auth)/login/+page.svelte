<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import { Eye, SquareAsterisk } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';
	import SvelteSeo from 'svelte-seo';
	import { fly } from 'svelte/transition';

	let passwordInputElement: HTMLInputElement;
	let passwordResetEmailInputElement: HTMLInputElement;
	let forgotPasswordFormSubmitButton: HTMLButtonElement;
	let revealInputPassword = false;
	let loginFormSubmitted = false;
	let showForgotPasswordModal = false;

	function handleRevealInputPassword() {
		revealInputPassword = !revealInputPassword;
		passwordInputElement.type = revealInputPassword ? 'text' : 'password';
	}

	function toggleForgotPasswordModal() {
		showForgotPasswordModal = !showForgotPasswordModal;
	}
</script>

<svelte:document on:keydown={(e) => {
	if (showForgotPasswordModal && e.key === 'Escape') {
		showForgotPasswordModal = false;
	}
}} />

<SvelteSeo
	title="Login - AmbitiousYou"
	description="Log in to your AmbitiousYou account to continue managing your ambitions and tracking your journey to becoming superhuman."
	canonical="https://www.ambitiousyou.pro/login"
	keywords="login, sign in, access account, ambitiousyou login, ambitions management, goal tracking"
	openGraph={{
		title: 'Login - AmbitiousYou',
		description:
			'Log in to your AmbitiousYou account to continue managing your ambitions and tracking your journey to becoming superhuman.',
		url: 'https://www.ambitiousyou.pro/login',
		type: 'website',
		images: [
			{
				url: 'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png',
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
		image:
			'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png'
	}}
/>

<svelte:head>
	<title>Login to your AmbitiousYou account</title>
</svelte:head>

{#if showForgotPasswordModal}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-50">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-lg">
				<h1 class="text-xl font-bold flex gap-2 justify-between items-center w-full">
					Forgot Password?
					<SquareAsterisk class="text-lime-500" size="30" />
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					Enter your email address to receive a password reset link.
				</h2>
				<form
					action="?/forgotPassword"
					method="POST"
					use:enhance={() => {
						if (passwordResetEmailInputElement.value === '') {
							toast.warning('Please enter your email address to receive a password reset link.', {
								closable: true
							});
							return;
						}

						return async ({ result }) => {
							console.log('Check this data from actions response: ', result);
							if (result.data.status === 200) {
								toast.success(result.data.message, { closable: true });
							} else {
								toast.error(result.data.message, { closable: true });
							}
						};
					}}
				>
					<div class="flex flex-col gap-5 mt-5">
						<div class="flex flex-col gap-2">
							<div class="relative">
								<input
									placeholder="Email"
									type="email"
									name="email"
									required
									bind:this={passwordResetEmailInputElement}
									on:keydown={(e) => {
										if (e.key === 'Enter') {
											forgotPasswordFormSubmitButton.click();
										}
									}}
									class="text-lg w-full bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
								/>
							</div>
						</div>
						<div class="flex justify-end gap-2">
							<button
								class="hover:bg-[--custom-dark] px-4 py-1 text-foreground rounded-lg active:scale-95 transition-all ease-in-out"
								on:click|preventDefault={() => {
									showForgotPasswordModal = false;
								}}
							>
								Cancel
							</button>
							<button id="primaryButton" type="submit" tabindex="0" bind:this={forgotPasswordFormSubmitButton}> Email Link </button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<div
	class="flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto min-h-svh"
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
	<div class="sm:max-w-sm w-3/4">
		<h1 class="font-bold text-7xl text-end max-md:text-start">🔐 Login</h1>
		<p class="text-xl mt-5 text-end max-md:text-start">
			Log in to pursue your ambitions and start your journey to greatness!
		</p>
	</div>
	<div
		class="flex flex-col gap-5 sm:w-1/2 border bg-background shadow-sm p-5 rounded-2xl sm:max-w-sm w-3/4 z-10"
	>
		<form
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
			use:enhance={() => {
				loginFormSubmitted = true;

				return async ({ result }) => {
					console.log('Check this data from actions response: ', result);
					if (result.data.success) {
						toast.success(result.data.message, { closable: true });
					} else {
						toast.error(result.data.message, { closable: true });
						loginFormSubmitted = false;
					}
				};
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
				class="flex justify-center items-center gap-2 disabled:cursor-progress"
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
		<button
			on:click={toggleForgotPasswordModal}
			class="inline text-center sm:text-end text-sm text-[--custom-light] hover:underline"
			>Forgot Password?</button
		>
	</div>
</div>
