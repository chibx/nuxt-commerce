import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: './server/db/schema.ts',
    dbCredentials: {
        url: process.env.NUXT_DATABASE_URL || '',
        ssl: "prefer",
    },
    strict: true,
});
