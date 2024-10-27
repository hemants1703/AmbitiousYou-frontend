<script>
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlurFade from '$lib/components/svelte_magicui/BlurFade.svelte';
</script>

<svelte:head>
	<title>AmbitiousYou</title>
	<MetaTags
		metaOgTitle="AmbitiousYou"
		metaOgDescription="Manage all your ambitions at a single place!"
		metaOgImage="https://ambitiousyou.pro/og-image.png"
		metaOgUrl="https://ambitiousyou.pro"
	/>
</svelte:head>

<div class="flex flex-col gap-8 max-sm:mb-20 justify-center items-center">
	<div class="flex gap-2 font-bold sm:text-5xl md:text-7xl lg:text-9xl text-4xl text-center">
		<h1
			class="selection:text-black tracking-tight bg-gradient-to-br from-black dark:from-white to-[--custom-secondary] text-transparent bg-clip-text"
		>
			AmbitiousYou
		</h1>
		🚩
	</div>
	<h2 class="font-semibold sm:text-3xl text-xl text-center">Get Ready to Become a Superhuman!</h2>
	<p class="text-center my-10 max-w-2xl font-light text-muted-foreground max-sm:text-md">
		Imagine an app that let&apos;s you manage all your ambitions at a single place, you might have a
		lot of ambitions in your life but due to the time constraint and busy schedule you might be
		facing issues and cumbersomeness for the ambitions and plans you had for yourself in the short
		term or sometimes even in the long term, AmbitiousYou helps you solve this issue!
	</p>
	<a
		href="/features"
		class="relative inline-flex overflow-hidden rounded-xl p-px text-xl shadow-lg hover:shadow-xl active:shadow-md active:translate-y-1"
	>
		<span
			class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#64CCC5_50%,#bebebe_100%)]"
		/>
		<span
			class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-background px-4 py-2 font-medium text-foreground backdrop-blur-3xl"
		>
			Explore AmbitiousYou!
		</span>
	</a>
	<!-- <div class="flex justify-center items-center gap-2">
			<a id="secondaryButton" href="/signup">Sign Up</a>
			<a id="primaryButton" href="/login">Login</a>
		</div> -->
</div>
