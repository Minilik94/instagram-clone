<script>
	import { generateRandomPeople, randomGender, randomNumber } from '$lib/utils';
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Heart from 'lucide-svelte/icons/heart';
	import MessageCircle from 'lucide-svelte/icons/message-circle';
	import Send from 'lucide-svelte/icons/send';
	import { Separator } from '$lib/components/ui/separator';

	const fiveRandomPeople = generateRandomPeople(1);
	const timestamp = new Date().toLocaleString(); // Placeholder timestamp
	const location = 'San Francisco, CA'; // Placeholder location
</script>

<div
	class="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-none dark:bg-black"
>
	<div class="flex items-center p-3">
		{#each fiveRandomPeople as person}
			<div class="flex items-center">
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src={`https://xsgames.co/randomusers/assets/avatars/${person.gender}/${randomNumber()}.jpg`}
					alt="Profile Picture"
					class="mr-3 h-10 w-10 rounded-full object-cover"
				/>
				<div>
					<p class="text-sm font-bold">{person.name}</p>
					<p class="text-xs text-gray-500">{person.city},<span class="px-1">{person.state}</span></p>
				</div>
			</div>
		{/each}
		<Ellipsis class="ml-auto h-5 w-5 text-gray-500" />
	</div>

	<!-- svelte-ignore a11y_img_redundant_alt -->
	<img
		src={`https://xsgames.co/randomusers/assets/avatars/${randomGender()}/${randomNumber()}.jpg`}
		alt="Post Image"
		class="h-[400px] w-full object-cover"
	/>

	<div class="px-3 py-2">
		<div class="mb-2 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<button class="focus:outline-none">
					<Heart class="h-6 w-6 text-gray-600 hover:text-red-500" />
				</button>
				<button class="focus:outline-none">
					<MessageCircle class="h-6 w-6 text-gray-600 hover:text-gray-800" />
				</button>
				<button class="focus:outline-none">
					<Send class="h-6 w-6 text-gray-600 hover:text-gray-800" />
				</button>
			</div>
			<button class="focus:outline-none">
				<Bookmark class="h-6 w-6 text-gray-600 hover:text-gray-800" />
			</button>
		</div>

		<p class="mb-1 text-sm font-bold">100,000 likes</p>

		{#each fiveRandomPeople as person}
			<p class="mb-2 text-sm">
				<span class="font-bold">{person.name.toLocaleLowerCase()}</span> this is a caption
			</p>
		{/each}

		<p class="mb-2 text-xs text-gray-500">{timestamp}</p>

		<button class="mb-3 text-sm text-gray-500">View all 24 comments</button>

		<div class="flex items-center">
			<input
				type="text"
				placeholder="Add a comment..."
				class="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
			/>
			<button class="ml-2 rounded-md px-3 py-2 font-medium text-blue-500 focus:outline-none"
				>Post</button
			>
		</div>
	</div>
</div>
