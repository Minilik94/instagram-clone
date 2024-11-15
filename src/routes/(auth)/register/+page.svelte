<script lang="ts">
	import Logo from '$lib/components/icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerSchema } from '$lib/validation';
	import { Loader } from "lucide-svelte"
	import * as Form from '$lib/components/ui/form';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});

	const { enhance, delayed, errors, form: formData } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<div class="mx-auto w-fit">
			<Logo />
		</div>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2">
						<Form.Field {form} name="firstName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>First Name</Form.Label>
									<Input {...props} placeholder="robert" bind:value={$formData.firstName} />
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<Form.Field {form} name="lastName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Last Name</Form.Label>
									<Input {...props} placeholder="junior" bind:value={$formData.lastName} />
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
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
						Create an account
					{/if}
				</Button>
				<Button variant="outline" class="w-full">Sign up with GitHub</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
