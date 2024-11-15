import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/schema',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	dialect: 'postgresql',
	out: "./migrations"
});
