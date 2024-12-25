<script>
	export let href = '/';
</script>

<a
	{href}
	id="primaryButton"
	class="text-xl
      relative
      inline-flex
      items-center
      justify-center
      overflow-hidden
      before:absolute
      before:inset-[2px]
      before:bg-gradient-to-r
      before:from-[#64ccc5]/0
      before:via-[#64ccc5]/50
      before:to-[#64ccc5]/0
      before:animate-[borderGlow_2s_ease-in-out_infinite]
      hover:before:via-[#64ccc5]/70
      hover:shadow-[0_0_25px_#64ccc5]
      active:before:via-[#64ccc5]/40
      active:shadow-[0_0_15px_#64ccc5]
      transition-all
      duration-300"
>
	<span class="relative z-10">
		<slot />
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
