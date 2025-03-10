import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const { databaseUrl } = useRuntimeConfig();
const client = postgres(databaseUrl, { prepare: false, max: 1 });

await migrate(drizzle(client, { schema }), { migrationsFolder: "" });

await client.end();
