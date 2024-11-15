<script>
	import { Stories, PostCards } from '$lib/components/post_components/';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import {
		randomGender,
		randomNumber,
		generateRandomPerson,
		generateRandomPeople
	} from '$lib/utils';
	const fiveRandomPeople = generateRandomPeople(5);

	const person = generateRandomPerson();
</script>

<div class="flex gap-5">
	<div class="flex-1 flex-shrink">
		<div class="mx-auto w-full max-w-[630px] space-y-8">
			<!-- stories -->
			<Stories />
			<div class="mt-5 space-y-5 px-10 md:px-12">
				<!-- postcards -->
				<PostCards />
				<PostCards />
				<PostCards />
				<PostCards />
				<PostCards />
				<PostCards />
			</div>
		</div>
	</div>

	<div class="mx-16 hidden w-[319px] px-3 text-sm xl:inline-block">
		<div class="flex items-center gap-3">
			<CircleUser size="24" />
			<div>
				<p class="font-medium">Minilik Zeru</p>
				<p class="text-muted-foreground">minilikzeru@gmail.com</p>
			</div>
		</div>

		<div class="mb-3 mt-8 flex items-center justify-between">
			<p class="capitalize text-muted-foreground">suggestd for you</p>
			<p class="text-xs font-medium">see all</p>
		</div>

		<div class="space-y-4">
			{#each fiveRandomPeople as person}
				<div class="flex w-full items-center gap-3">
					<div class="flex size-16 rounded-full bg-slate-400">
						<img
							src={`https://xsgames.co/randomusers/assets/avatars/${person.gender}/${randomNumber()}.jpg`}
							class="aspect-auto cursor-pointer rounded-full object-scale-down hover:blur-sm"
							alt="random Imgage"
						/>
					</div>

					<div>
						<p class="flex items-center gap-1 font-medium">
							{person.name}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="none"
								class="h-4 w-4"
							>
								<circle cx="10" cy="10" r="9" fill="#2563EB" />
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293z"
									clip-rule="evenodd"
									fill="white"
									transform="translate(3, 3) scale(0.7)"
								/>
							</svg>
						</p>
						<p class="text-muted-foreground">{person.name.toLocaleLowerCase()}@gmail.com</p>
					</div>
					<a href="/" class="ml-auto text-blue-500">follow</a>
				</div>
			{/each}
		</div>
	</div>
</div>
