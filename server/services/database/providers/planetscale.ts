// import { drizzle } from 'drizzle-orm/planetscale-serverless';
// import * as schema from '../schema/sql';

import { serverErrors } from "~/server/utils/errors";
import { getDatabaseUrl } from "../utils/util";
import { toArray } from "~/server/utils/util";
import { DBPluginMain } from "~/types/server";

export default async function () {
    const { drizzle } = await import("drizzle-orm/planetscale-serverless");
    const { Client } = await import("@planetscale/database");
    const schema = await import("../schema/sql");
    const url = await getDatabaseUrl("PlanetScale", "PLANETSCALE_DATABASE_URL");
    const client = new Client({ url: toArray(url)[0] });
    const $drizzle = drizzle(client, { schema });
    await client
        .connection()
        .execute("SELECT 1+1 AS result;")
        .catch(() => {
            throw createError({
                statusCode: 520,
                statusMessage: `${serverErrors[521]} - PlanetScale`,
            });
        });
    return { drizzle: $drizzle, disconnector: async () => {} } as unknown as DBPluginMain;
}

export async function migrator() {
    const { drizzle } = await import("drizzle-orm/planetscale-serverless");
    const schema = await import("../schema/sql/");
    const { migrate } = await import("drizzle-orm/planetscale-serverless/migrator");
    const { Client } = await import("@planetscale/database");
    const url = await getDatabaseUrl("PlanetScale", "PLANETSCALE_DATABASE_URL");
    const client = new Client({ url: toArray(url)[0] });

    await migrate(drizzle(client, { schema }), { migrationsFolder: "" });
}
