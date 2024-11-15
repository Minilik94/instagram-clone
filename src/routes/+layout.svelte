<script lang="ts">
	// Supports weights 100-900
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
