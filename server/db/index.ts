import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

const { databaseURl: databaseUrl } = useRuntimeConfig();
const client = postgres(databaseUrl);
export const db = drizzle(client, { schema });

await db.execute(sql`SELECT 1+1 AS result;`).catch(() => {
	throw createError({
		statusCode: 521,
		statusMessage: `[Database Error]: PostgreSQL failed to respond`,
	});
});
