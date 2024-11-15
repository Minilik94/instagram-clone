import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/validation';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize, Lucia, Scrypt } from 'lucia';
import { db } from '$lib/server/db/index.js';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/schema';
import { lucia } from '$lib/server/db/auth';

export const load = async (event) => {
	const form = await superValidate(zod(loginSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email))
			.limit(1);

		if (!user) {
			return setError(form, 'email', 'Invalid email');
		}

		const scrypt = new Scrypt();
		const valid = await scrypt.verify(user.passwordHash, form.data.password);

		if (!valid) {
			return setError(form, 'password', 'Invalid password');
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
