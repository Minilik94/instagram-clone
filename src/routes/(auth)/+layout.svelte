<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-screen items-center justify-center border">
	{@render children()}
</div>
