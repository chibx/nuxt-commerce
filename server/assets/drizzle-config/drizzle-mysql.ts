import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    dbCredentials: {
        url: "",
        ssl: "prefer",
    },
    strict: true,
});

// drizzle-kit introspect --out=migrations/ --connectionString=postgresql://user:pass@host:port/db_name
