import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/validation';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize, Lucia, Scrypt } from 'lucia';
import { db } from '$lib/server/db/index.js';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/schema';
import { lucia } from '$lib/server/db/auth';

export const load = async (event) => {
	const form = await superValidate(zod(registerSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, firstName, lastName, password } = form.data;

		const scrypt = new Scrypt();
		const passwordHash = await scrypt.hash(password);

		const userId = generateIdFromEntropySize(10);
		const user = await db
			.select({ email: userTable.email })
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1);

		console.log(user, 'from register');

		if (user.length > 0) {
			return setError(form, 'email', 'Email already exists');
		}

		try {
			await db.insert(userTable).values({
				id: userId,
				email,
				firstName,
				lastName,
				passwordHash
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			console.log(err, 'error in register');
			throw err;
		}

		redirect(302, '/');
	}
};
