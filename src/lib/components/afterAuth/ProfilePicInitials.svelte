<script lang="ts">
	export let fullName = '';

	let firstInitial = fullName.charAt(0);
	let secondInitial = fullName.charAt(fullName.indexOf(' ') + 1);
</script>

<div
	class="bg-[--custom-light] text-background p-2 rounded-full w-10 h-10 flex items-center justify-center"
>
	{firstInitial}{secondInitial}
</div>
