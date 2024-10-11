<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../signup/$types';

	export let data: ActionData;
	export let form: ActionData;

	let email: FormDataEntryValue | null = form?.data?.email || '';
	let password: FormDataEntryValue | null = form?.data?.password || '';
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
	<div class="sm:w-1/2 border border-[--custom-secondary] p-5 rounded-2xl sm:max-w-sm w-3/4 z-10">
		<form action="?/login" method="POST" class="flex flex-col gap-4" use:enhance>
			<input
				placeholder="email"
				type="email"
				name="email"
				required
				bind:value={email}
				class="font-geist-mono bg-transparent border border-[--custom-secondary] rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<input
				placeholder="password"
				type="password"
				name="password"
				required
				bind:value={password}
				class="font-geist-mono bg-transparent border border-[--custom-secondary] rounded-lg py-1 px-2 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
			/>
			<button id="primaryButton" type="submit">Login</button>
		</form>
	</div>
</div>
