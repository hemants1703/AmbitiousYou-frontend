<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import type { ActionData } from '../signup/$types';
	import { Eye } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';

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

<svelte:head>
	<title>Login to your AmbitiousYou account</title>
</svelte:head>

<div
	class={`flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto`}
>
	<div>
		<h1 class="font-bold text-7xl text-end max-md:text-center">🔐 Login</h1>
		<p class="text-2xl mt-5 text-end max-md:text-center">Create an account to get started</p>
	</div>
	<div class="sm:w-1/2 border border-[--custom-secondary]s p-5 rounded-2xl sm:max-w-sm w-3/4 z-10">
		<form
			action="?/login"
			method="POST"
			class="flex flex-col gap-4"
			use:enhance={() => {
				loginFormSubmitted = true;
			}}
		>
			<input
				placeholder="Email"
				type="email"
				name="email"
				class="font-geist-mono bg-transparent border border-[--custom-secondary]s rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<div class="relative">
				<input
					placeholder="Password"
					type="password"
					name="password"
					bind:this={passwordInputElement}
					class="w-full font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="#000"
						viewBox="0 0 256 256"
						class="animate-spin"
					>
						<path
							d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
						></path>
					</svg>
					<span> Logging you in... </span>
				{:else}
					<span>Login</span>
				{/if}
			</button>
		</form>
	</div>
</div>
