import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./app/server/db/schema.ts",
	dbCredentials: { url: process.env.NUXT_DATABASE_URL || "", ssl: "prefer" },
	strict: true,
	out: "./drizzle",
});
