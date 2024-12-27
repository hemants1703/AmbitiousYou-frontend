<script>
	import BlurFade from '$lib/components/svelte_magicui/BlurFade.svelte';
	import SvelteSeo from 'svelte-seo';
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import InteractiveLinkButton from '$lib/components/InteractiveLinkButton.svelte';
	import { onMount } from 'svelte';
</script>

<SvelteSeo
	title="AmbitiousYou - Get ready to become a superhuman!"
	description="Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!"
	canonical="https://www.ambitiousyou.pro"
	keywords="superhuman, ambitions, goals, plans, ambitions management, ambitions planner, ambitions tracker, ambitions manager, ambitions organizer, ambitions scheduler, ambitions calendar, ambitions reminder, ambitions notification, ambitions tracker, ambitions progress, ambitions completion, ambitions achievement, ambitions success, ambitions failure, ambitions motivation, ambitions inspiration, ambitions encouragement, ambitions support, ambitions help, ambitions assistance, ambitions guidance, ambitions mentor, ambitions coach, ambitions consultant, ambitions advisor"
	openGraph={{
		title: 'AmbitiousYou - Get ready to become a superhuman!',
		description:
			'Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!',
		url: 'https://www.ambitiousyou.pro',
		type: 'website',
		images: [
			{
				url: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png',
				width: 1200,
				height: 630,
				alt: 'AmbitiousYou - Get ready to become a superhuman!'
			}
		],
		site_name: 'AmbitiousYou!'
	}}
	twitter={{
		card: 'summary_large_image',
		creator: '@hemants1703',
		title: 'AmbitiousYou - Get ready to become a superhuman!',
		description:
			'Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!',
		image: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png'
	}}
/>

<!-- <Particles className="fixed inset-0 -z-50" /> -->

<div class="flex flex-col gap-8 max-sm:my-20 justify-center items-center">
	<div class="flex gap-2 font-bold text-center max-w-5xl mx-auto">
		<!-- <h1
			class="selection:text-black tracking-tight bg-gradient-to-br from-black dark:from-white to-[--custom-secondary] text-transparent bg-clip-text"
		>
			AmbitiousYou
		</h1>
		🚩 -->
		<BlurFade delay={0}>
			<h1 class="text-5xl sm:text-6xl md:text-7xl">For Those Who Dare to Dream Beyond Limits.</h1>
		</BlurFade>
	</div>
	<h2 class="font-medium mt-10 sm:text-3xl text-xl text-center">
		<BlurFade delay={0.5}
			>Get Ready to Become a <span class="relative z-10 px-1"
				><span
					class="absolute -z-10 inset-0 h-full w-0 bg-[--custom-light] opacity-50 animate-highlight [animation-delay:_1.2s]"
				></span>Superhuman</span
			>!</BlurFade
		>
	</h2>
	<BlurFade delay={1}>
		<p class="text-center my-10 max-w-2xl font-light text-muted-foreground max-sm:text-md">
			Life is full of ambitions, but managing them all can be overwhelming. AmbitiousYou brings all
			your goals together in one powerful platform. Whether it's short-term targets or long-term
			dreams, we help you stay focused and organized. Transform your busy schedule into a structured
			path to success. Start achieving more, with less mental load. 🚀
		</p>
	</BlurFade>
	<!-- <a
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
	</a> -->

	<BlurFade delay={1}>
		<!-- <a
			id="primaryButton"
			class="text-xl
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    after:absolute
    after:inset-0
    after:bg-gradient-to-r
    after:from-transparent
    after:via-[#64ccc5]/30
    after:to-transparent
    after:translate-x-[-200%]
    after:animate-[shine_3s_ease-in-out_infinite]
    before:absolute
    before:inset-[2px]
    before:bg-gradient-to-r
    before:from-[#64ccc5]/0
    before:via-[#64ccc5]/50
    before:to-[#64ccc5]/0
    before:animate-[borderGlow_2s_ease-in-out_infinite]
    hover:shadow-[0_0_15px_#64ccc5]
    transition-all
    duration-300"
			href="/features">Explore AmbitiousYou!</a
		> -->
		<InteractiveLinkButton href="/features">Explore AmbitiousYou!</InteractiveLinkButton>
	</BlurFade>
	<!-- <div class="flex justify-center items-center gap-2">
			<a id="secondaryButton" href="/signup">Sign Up</a>
			<a id="primaryButton" href="/login">Login</a>
		</div> -->
</div>
