import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";

const { databaseUrl } = useRuntimeConfig();
const client = postgres(databaseUrl, { prepare: false, max: 1 });

await migrate(drizzle(client, { schema }), { migrationsFolder: "./drizzle" });

await client.end();
