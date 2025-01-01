<script>
	import { ChevronRight, Minus } from 'lucide-svelte';
	export let href = '/';
</script>

<a
	{href}
	id="primaryButton"
	class="text-xl
      inline-flex
      items-center
      justify-center
      overflow-hidden
      hover:before:via-[#64ccc5]/70
      hover:shadow-[0_0_25px_#64ccc5]
      active:before:via-[#64ccc5]/40
      active:shadow-[0_0_15px_#64ccc5]
      transition-all
      duration-300
      !pr-0
      group"
>
	<span class="z-10">
		<span
			class="flex justify-center items-center group-hover:pr-3 transition-all duration-100 ease-in-out"
		>
			<slot />
			<Minus
				class="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-4 transition-all duration-100 ease-in-out"
				size={20}
				strokeWidth={3}
			/>
			<ChevronRight
				class="-translate-x-4 group-hover:translate-x-0 transition-all duration-100 ease-in-out"
				size={20}
				strokeWidth={3}
			/>
		</span>
	</span>
</a>

<style>
	@keyframes borderGlow {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
