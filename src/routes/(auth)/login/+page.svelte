<script lang="ts">
	import Logo from '$lib/components/icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/validation';
	import { Loader } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { enhance, delayed, errors, form: formData } = form;
</script>

<Card.Root class=" w-full max-w-sm">
	<Card.Header>
		<div class="mx-auto w-fit">
			<Logo />
		</div>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									placeholder="e@example.com"
									type="email"
									bind:value={$formData.email}
								/>
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input {...props} type="password" bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full">
					{#if $delayed}
						<Loader class="size-4 animate-spin" />
					{:else}
						Login
					{/if}</Button
				>
			</div>
		</form>

		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/register" class="underline"> Register </a>
		</div>
	</Card.Content>
</Card.Root>
