import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../db/schema";
import postgres from "postgres";

const { databaseURl: databaseUrl } = useRuntimeConfig();
const client = postgres(databaseUrl);
export const db = drizzle(client, { schema });

await db.execute(sql`SELECT 1+1 AS result;`).catch(() => {
    throw createError({
        statusCode: 521,
        statusMessage: `Database failed to respond - PostgreSQL`,
    });
});
