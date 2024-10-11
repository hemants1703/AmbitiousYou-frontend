<script lang="ts">
	import { toast } from 'svoast';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Eye } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';

	export let form: ActionData;
	$: console.log('Signup form response from server:', form);

	$: if (form) {
		if (form.success) {
			toast.success(form.message);
		} else {
			toast.error(form.message);
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
	<title>Signup on AmbitiousYou!</title>
</svelte:head>

<div
	class={`flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto`}
>
	<div class="w-1/2 max-w-96 text-center">
		<h1 class="font-bold text-7xl text-end max-md:text-center">📑 Signup</h1>
		<p class="text-2xl mt-5 text-end max-md:text-center">Create an account to get started</p>
		<p class="text-lg mt-5 text-end text-[--custom-dark] max-md:text-center">
			You're about to be a superhuman and fulfil all your big dreams and ambitions in life!
		</p>
	</div>
	<div class="sm:w-1/2 border p-5 rounded-2xl sm:max-w-sm w-3/4 z-10">
		<form action="?/createAccount" method="POST" class="flex flex-col gap-4" use:enhance>
			<input
				placeholder="Full Name"
				type="text"
				name="fullName"
				required
				class="bg-transparent border rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<input
				placeholder="Email"
				type="email"
				name="email"
				required
				class="bg-transparent border rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<div class="relative">
				<input
					placeholder="Password"
					type="password"
					name="password"
					required
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
			<button id="primaryButton" type="submit">Create Free Account</button>
		</form>
	</div>
</div>
