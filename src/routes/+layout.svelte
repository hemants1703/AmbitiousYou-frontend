<script lang="ts">
	import { Toasts } from 'svoast';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { inject } from '@vercel/analytics';

	// Injecting the analytics script from Vercel
	inject();
</script>

<ModeWatcher />
<Toasts />
<slot />
