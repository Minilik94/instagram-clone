<script>
	import { randomGender, randomNumber } from '$lib/utils';
</script>

<div class="flex flex-wrap items-center gap-4">
	{#each { length: 8 } as _}
		<div class="flex size-16 rounded-full bg-slate-400">
			<img
				src={`https://xsgames.co/randomusers/assets/avatars/${randomGender()}/${randomNumber()}.jpg`}
				class="aspect-auto cursor-pointer rounded-full object-scale-down hover:blur-sm"
				alt="random Imgage"
			/>
		</div>
	{/each}
</div>
