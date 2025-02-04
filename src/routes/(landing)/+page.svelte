<script>
	import BlurFade from '$lib/components/svelte_magicui/BlurFade.svelte';
	import SvelteSeo from 'svelte-seo';
	import InteractiveLinkButton from '$lib/components/InteractiveLinkButton.svelte';
	import { CircleCheckBig } from 'lucide-svelte';
	import AmbitionCard from './features/AmbitionCard.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import ExploreAmbitionSection from './features/ExploreAmbitionSection.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import AmbitionTasksContainer from '$lib/components/AmbitionTasksContainer.svelte';
	import AmbitionDetailsContainer from '$lib/components/AmbitionDetailsContainer.svelte';

	const keyFeatures = [
		{
			icon: '🎯',
			title: 'Ambitions Management',
			description:
				'Manage all your ambitions at a single place. Keep track of your goals, plans, and progress. Get notifications and reminders to stay on track.'
		},
		{
			icon: '🔥',
			title: 'Motivational Streaks',
			description:
				'Stay consistent with daily nudges and streak trackers to keep your momentum alive.'
		},
		{
			icon: '📈',
			title: 'Progress Insights',
			description:
				'Get insights into your progress. Analyze your achievements and failures. Learn from your mistakes and improve your performance.'
		},
		{
			icon: '📝',
			title: 'Customizable Ambitions',
			description:
				'Shape your goals your way—flexible timelines, tasks, and notes for complete control.'
		}
	];

	const sampleAmbitionTasks = [
		{
			name: 'Complete an online course on AI',
			description:
				'Enroll in and complete a comprehensive online course on AI and Machine Learning.',
			checked: false
		},
		{
			name: 'Read key research papers',
			description:
				'Read and summarize key research papers in the field of AI and Machine Learning.',
			checked: true
		},
		{
			name: 'Build a machine learning project',
			description:
				'Develop a project that applies machine learning algorithms to solve a real-world problem.',
			checked: false
		},
		{
			name: 'Participate in AI competitions',
			description: 'Join and compete in AI and Machine Learning competitions such as Kaggle.',
			checked: false
		}
	];

	const sampleAmbition = {
		ambitionName: 'Master AI and Machine Learning',
		ambitionDefinition:
			'Acquire deep knowledge and practical skills in AI and machine learning to develop cutting-edge solutions.',
		ambitionCategory: 'Learning',
		ambitionStatus: 'Ongoing',
		ambitionPriority: 'High',
		ambitionStartDate: new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString(),
		ambitionEndDate: new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString(),
		ambitionCompletionDate: new Date().toLocaleDateString(),
		percentageCompleted: 50,
		ambitionTasks: sampleAmbitionTasks,
		ambitionNotes: [
			{
				content: 'Need to accomplish this one.',
				created_at: new Date().toISOString()
			},
			{
				content: "It might take some time but it's worth it!",
				created_at: new Date().toISOString()
			}
		]
	};

	const benefits = [
		{
			icon: '🧠',
			title: 'Reduce Mental Overload',
			description:
				'Manage all your ambitions at a single place. Keep track of your goals, plans, and progress. Get notifications and reminders to stay on track.'
		},
		{
			icon: '🚀',
			title: 'Stay Focused and Organized',
			description:
				'Shape your goals your way—flexible timelines, tasks, and notes for complete control.'
		},
		{
			icon: '🍵',
			title: 'Achieve More with Less Mental Load',
			description:
				'Stay consistent with daily nudges and streak trackers to keep your momentum alive.'
		},
		{
			icon: '📅',
			title: 'Transform Your Busy Schedule',
			description:
				'Get insights into your progress. Analyze your achievements and failures. Learn from your mistakes and improve your performance.'
		}
	];

	const faq = [
		{
			question: 'What is AmbitiousYou?',
			answer:
				"AmbitiousYou is a platform that helps you manage all your ambitions at a single place. Whether it's short-term targets or long-term dreams, we help you stay focused and organized."
		},
		{
			question: 'How can I get started with AmbitiousYou?',
			answer:
				'Sign up for a free account and start managing your ambitions. Get access to a powerful platform that helps you stay focused and organized.'
		},
		{
			question: 'What are the benefits of using AmbitiousYou?',
			answer:
				'Reduce your mental overload and manage all your ambitions at a single place. Stay consistent with daily nudges and streak trackers to keep your momentum alive.'
		},
		{
			question: 'How can I contact the support team?',
			answer:
				"If you have any questions or need assistance, feel free to contact our support team. We're here to help you with any queries you may have."
		}
	];
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
				url: 'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png',
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
		image:
			'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png'
	}}
/>

<div>
	<!-- HERO SECTION -->
	<section class="min-h-svh flex flex-col gap-2 sm:gap-8 justify-center items-center">
		<BlurFade delay={0}>
			<h1 class="font-semibold text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-center max-w-5xl mx-auto">
				For Those Who Dare to Dream Beyond Limits.
			</h1>
		</BlurFade>
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
			<p class="text-center my-10 max-w-2xl font-light sm:text-lg text-md px-10">
				Overwhelmed by your ambitions? AmbitiousYou consolidates your goals into one powerful
				platform, keeping you focused and organized. Start your journey to success with ease. 🚀
			</p>
		</BlurFade>

		<BlurFade delay={1}>
			<InteractiveLinkButton href="#keyFeaturesSection">Explore AmbitiousYou!</InteractiveLinkButton
			>
		</BlurFade>
	</section>

	<!-- KEY FEATURES SECTION -->
	<section id="keyFeaturesSection" class="pt-20 space-y-14">
		<h1 class="text-5xl font-bold">
			Key Features of <span
				class="bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
				>AmbitiousYou</span
			>!
		</h1>
		<p class="text-start my-10 max-w-2xl font-light text-muted-foreground max-sm:text-md">
			Life is full of ambitions, but managing them all can be overwhelming. AmbitiousYou brings all
			your goals together in one powerful platform. Whether it's short-term targets or long-term
			dreams, we help you stay focused and organized. Transform your busy schedule into a structured
			path to success. Start achieving more, with less mental load. 🚀
		</p>
		<div
			class="grid md:grid-cols-4 max-xl:grid-rows-2 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-10 max-w-5xl mx-auto"
		>
			{#each keyFeatures as { icon, title, description }, index}
				<div
					class="flex flex-col gap-5 justify-between border p-4 rounded-xl border-foreground border-opacity-10"
				>
					<span class="flex flex-col gap-5">
						<div
							class="flex justify-center items-center py-10 bg-gradient-{index} rounded-lg text-8xl select-none"
						>
							{icon}
						</div>

						<h2 class="text-xl lg:text-2xl font-bold">{title}</h2>
						<p class="text-lg font-light text-muted-foreground">{description}</p>
					</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- STEPS OF HOW IT WORKS -->
	<section class="mt-28 space-y-14">
		<h1 class="text-5xl font-bold">
			How <span
				class="bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
				>AmbitiousYou</span
			> Works?
		</h1>
		<div class="flex flex-col sm:gap-28 gap-20 max-w-5xl mx-auto">
			<div
				class="flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:border max-sm:p-4 justify-between items-start sm:gap-48 gap-10 max-sm:rounded-xl"
			>
				<span class="space-y-5">
					<h2 class="text-3xl font-bold">1. Create an Ambition 🎯</h2>
					<p class="text-lg font-light text-muted-foreground">
						Ambitions are the goals or dreams you aim to achieve in life, whether short-term or
						long-term. With AmbitiousYou, you can add and track your ambitions intuitively in one
						place. Focus on achieving your goals individually or simultaneously by monitoring your
						progress for each ambition.
					</p>
				</span>
				<div class="flex flex-col gap-5 max-w-96">
					<AmbitionCard
						ambitionName="Master AI and Machine Learning"
						ambitionDefinition="Acquire deep knowledge and practical skills in AI and machine learning to develop cutting-edge solutions."
						ambitionStatus="ongoing"
						customClass="transform -rotate-1 translate-x-2"
					/>

					<AmbitionCard
						ambitionName="Write and Publish a Book"
						ambitionDefinition="Author and publish a book in your field of expertise or passion, whether fiction or non-fiction."
						ambitionStatus="future"
						customClass="transform rotate-1 -translate-x-2"
					/>
					<AmbitionCard
						ambitionName="Run a Marathon"
						ambitionDefinition="Train for and complete a marathon as a testament to personal endurance and dedication to fitness."
						ambitionStatus="completed"
						customClass="transform -rotate-1 translate-x-2"
					/>
				</div>
			</div>
			<div
				class="flex max-sm:flex-col-reverse max-sm:justify-center max-sm:items-center max-sm:border max-sm:p-2 justify-between items-start sm:gap-48 gap-10 max-sm:rounded-xl"
			>
				<AmbitionTasksContainer ambitionTasks={sampleAmbitionTasks} />
				<span class="space-y-5 sm:text-end max-sm:p-2">
					<h2 class="text-3xl font-bold">2. Set Ambition Tasks 📝</h2>
					<p class="text-lg font-light text-muted-foreground">
						Ambition tasks are the steps needed to achieve your ambition. Add unlimited tasks to
						each ambition, track your progress, and mark them as completed. This helps you monitor
						your advancement toward your goals in a structured and well-defined manner.
					</p>
				</span>
			</div>
			<div
				class="flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:border max-sm:p-2 justify-between items-start sm:gap-48 gap-10 max-sm:rounded-xl"
			>
				<span class="space-y-5 max-sm:p-2">
					<h2 class="text-3xl font-bold">3. Set Ambition Details 🗒️</h2>
					<p class="text-lg font-light text-muted-foreground"></p>
					<p class="text-lg font-light text-muted-foreground">
						Ambition details encompass start, end, completion dates, status, priority, and category
						for each ambition in your account. Track and work towards your goals, and edit these
						details as needed.
					</p>
				</span>
				<AmbitionDetailsContainer ambitionData={sampleAmbition} />
			</div>
			<div class="space-y-10 p-2 rounded-lg">
				<h2 class="sm:text-5xl text-4xl font-bold flex flex-col text-center">
					<span>
						<span
							class="bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
							>Your Ambition</span
						>
						Perfectly Defined.
					</span>
					<span>Now go Conquer it!</span>
				</h2>
				<p class="text-lg font-light text-muted-foreground">
					Define your ambitions with clarity and purpose. Our platform provides the tools you need
					to outline, track, and achieve your goals efficiently. Empower yourself to conquer each
					milestone and transform your dreams into reality.
				</p>
				<ExploreAmbitionSection ambitionData={sampleAmbition} />
			</div>
		</div>
	</section>

	<!-- WHY AMBIIOUSYOU! -->
	<section class="mt-28 space-y-14">
		<h1 class="text-5xl font-bold">
			Why <span
				class="bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
				>AmbitiousYou</span
			>?
		</h1>
		<div class="grid md:grid-cols-2 grid-rows-2 gap-8 mt-10 max-w-5xl mx-auto">
			{#each benefits as { icon, title, description }, index}
				<div class="space-y-5 border p-4 rounded-lg border-foreground border-opacity-10">
					<div
						class="flex justify-center items-center py-10 bg-gradient-{index} rounded-lg text-8xl select-none"
					>
						{icon}
					</div>
					<h2 class="text-3xl font-bold">{title}</h2>
					<p class="text-lg font-light text-muted-foreground">{description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- FAQ -->
	<section class="mt-28 space-y-14">
		<h1 class="text-5xl font-bold">Frequently Asked Questions</h1>
		<div class="grid md:grid-cols-2 grid-rows-2 gap-8 mt-10 max-w-5xl mx-auto">
			{#each faq as { question, answer }, index}
				<Accordion.Root>
					<Accordion.Item value="item-{index}">
						<Accordion.Trigger class="text-xl">{question}</Accordion.Trigger>
						<Accordion.Content>
							{answer}
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			{/each}
		</div>
	</section>

	<!-- CTV -->
	<section class="mt-28 relative overflow-hidden">
		<div
			class="absolute inset-0 bg-gradient-to-br from-[#64ccc5]/10 via-transparent to-[#176b87]/10 pointer-events-none"
		/>

		<div class="max-w-5xl mx-auto p-8 rounded-2xl border border-foreground/10 backdrop-blur-sm">
			<div class="text-center mb-12">
				<h1 class="text-5xl font-bold mb-4">Ready to Transform Your Dreams into Reality?</h1>
				<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
					Join thousands of ambitious individuals who are already achieving their goals with
					AmbitiousYou.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 relative">
				<div class="group hover:scale-105 transition-all duration-300">
					<div
						class="p-8 h-full rounded-xl bg-gradient-to-br from-[#64ccc5]/20 to-transparent border border-foreground/10 hover:border-[#64ccc5]/50 transition-all"
					>
						<h2
							class="text-3xl font-bold mb-4 bg-gradient-to-br from-[#64ccc5] to-[#176b87] bg-clip-text text-transparent"
						>
							Start Your Journey
						</h2>
						<p class="text-lg text-muted-foreground mb-6">
							Create your free account today and get instant access to our powerful ambition
							management platform. Your future self will thank you.
						</p>
						<InteractiveLinkButton href="/signup">Get Started - It's Free!</InteractiveLinkButton>
					</div>
				</div>

				<div class="group hover:scale-105 transition-all duration-300">
					<div
						class="p-8 h-full rounded-xl bg-gradient-to-br from-[#176b87]/20 to-transparent border border-foreground/10 hover:border-[#176b87]/50 transition-all"
					>
						<h2
							class="text-3xl font-bold mb-4 bg-gradient-to-br from-[#176b87] to-[#64ccc5] bg-clip-text text-transparent"
						>
							Explore Features
						</h2>
						<p class="text-lg text-muted-foreground mb-6">
							Discover how AmbitiousYou can help you stay focused, organized, and motivated on your
							path to success.
						</p>
						<InteractiveLinkButton href="/features">See All Features</InteractiveLinkButton>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.bg-gradient-0 {
		background: linear-gradient(to top right, var(--custom-light), black, var(--custom-dark));
	}

	.bg-gradient-1 {
		background: linear-gradient(to bottom left, var(--custom-light), black, var(--custom-dark));
	}

	.bg-gradient-2 {
		background: linear-gradient(to top right, var(--custom-light), black, var(--custom-dark));
	}

	.bg-gradient-3 {
		background: linear-gradient(to bottom left, var(--custom-light), black, var(--custom-dark));
	}
</style>
