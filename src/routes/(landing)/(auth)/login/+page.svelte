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
		<form action="?/login" method="POST" class="flex flex-col gap-4" use:enhance>
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
			<button id="primaryButton" type="submit">Login</button>
		</form>
	</div>
</div>
