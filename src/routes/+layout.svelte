<script lang="ts">
	import { Toasts } from 'svoast';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Toasts />
<slot />
