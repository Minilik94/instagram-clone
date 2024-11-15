import { userTable } from '$lib/schema';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const registerSchema = createInsertSchema(userTable, {
	email: (s) => s.email.email(),
	firstName: (s) => s.firstName.min(1, { message: 'First name must be at least 1 character' }),
	lastName: (s) => s.lastName.min(1, { message: 'Last name must be at least 1 character' })
})
	.extend({
		password: z.string().min(8, { message: 'Password must be at least 8 characters' })
	})
	.omit({
		id: true
	});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});
