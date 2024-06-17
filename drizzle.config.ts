import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: "",
        ssl: "prefer",
    },
    strict: true,
});
