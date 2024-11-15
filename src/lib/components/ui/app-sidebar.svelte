<script lang="ts">
	import Instagram from 'lucide-svelte/icons/instagram';
	import Search from 'lucide-svelte/icons/search';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Home from '../icons/Home.svelte';
	import Explore from '../icons/Explore.svelte';
	import Reels from '../icons/Reels.svelte';
	import Messenger from '../icons/Messenger.svelte';
	import Logo from '../icons/Logo.svelte';
	import Notifications from '../icons/Notifications.svelte';
	import Bell from 'lucide-svelte/icons/bell';
	import ActivitySquare from 'lucide-svelte/icons/square-activity';
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import Menu from 'lucide-svelte/icons/menu';
	import Settings from 'lucide-svelte/icons/settings';
	import NewPost from '../icons/NewPost.svelte';
	import CircleUser from 'lucide-svelte/icons/user-round';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import Media from '../icons/media.svelte';
	// import Settings from '../icons/Settings.svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { mode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	let openModal = $state(false);

	// Menu items.
	const items = [
		{
			title: 'home',
			icon: Home
		},
		{
			title: 'search',
			icon: Search
		},
		{
			title: 'explore',
			icon: Explore
		},
		{
			title: 'reels',
			icon: Reels
		},
		{
			title: 'messages',
			icon: Messenger
		},
		{
			title: 'notification',
			icon: Bell
		},
		{
			title: 'create',
			icon: NewPost
		},
		{
			title: 'profile',
			url: '/',
			icon: CircleUser
		}
	];

	let fileInput: { click: () => void };

	const handleSelectFile = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		fileInput.click();
	};
</script>

<Sidebar.Root>
	<Sidebar.Content class="flex flex-col items-end justify-between">
		<Sidebar.Group>
			<!-- <Sidebar.GroupLabel
				><Logo class="h-full w-full border" /></Sidebar.GroupLabel
			> -->
			<div class="mx-auto py-4">
				<div class="hidden md:block">
					<Logo />
				</div>
				<Instagram class="md:hidden" />
			</div>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-y-8 px-6 ">
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<!-- <a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a> -->
									<svelte:element
										this={item.url ? 'a' : item.title === 'create' ? 'button' : 'div'}
										{...props}
										onclick={() => {
											if (item.title === 'create') {
												openModal = true;
											}
										}}
										role="none"
									>
										<item.icon />
										<span
											class={`${item.title === 'home' ? 'px-4 text-base font-bold capitalize ' : 'px-4 text-base  '} `}
											>{item.title}</span
										>
									</svelte:element>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="mx-auto flex w-full cursor-pointer items-center gap-1 rounded-md p-3 px-8 text-sm capitalize hover:bg-muted"
			>
				<Menu />
				<div class="ml-4 hidden md:inline-block">More</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w w-[300px]  rounded-xl p-3 shadow-lg">
				<DropdownMenu.Group>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<Settings />
						<a href="/">Setting</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3"
						><ActivitySquare /> your activity</DropdownMenu.Item
					>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<Bookmark /> Saved</DropdownMenu.Item
					>
					<DropdownMenu.Item
						onclick={toggleMode}
						class="flex cursor-pointer items-center gap-2 p-3"
					>
						{#if $mode === 'dark'}
							<Sun />
							light mode
						{:else if $mode === 'light'}
							<Moon />
							dark mode
						{/if}
					</DropdownMenu.Item>

					<DropdownMenu.Separator class="h-2" />

					<DropdownMenu.Item class="p-3">
						<form action="/?/logOut" method="POST">
							<button type="submit" class="h-full w-full">Log out</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Content>
</Sidebar.Root>

<Dialog.Root bind:open={openModal}>
	<Dialog.Content class="max-w-[450px]">
		<Dialog.Header>
			<Dialog.Title>Create a new post</Dialog.Title>
		</Dialog.Header>
		<form action="?/createPost" enctype="multipart/form-data" method="POST" use:enhance>
			<div class="grid h-[500px] place-items-center bg-gray-100">
				<label
					for="fileInput"
					class="flex cursor-pointer flex-col items-center space-y-3 text-center"
				>
					<div class="mx-auto w-fit rounded-full bg-gray-300 p-4">
						<Media />
					</div>
					<p class="text-gray-600">Drag photos and videos here</p>
				</label>
				<Button onclick={() => handleSelectFile} class=" bg-blue-500 font-medium text-white"
					>Select from computer</Button
				>
				<input
					type="file"
					name="imageUrl"
					accept="image/png, image/jpeg"
					class="hidden"
					id="fileInput"
				/>
			</div>
		</form>

		<Form.Button class="bg-blue-500">Submit</Form.Button>
	</Dialog.Content>
</Dialog.Root>
