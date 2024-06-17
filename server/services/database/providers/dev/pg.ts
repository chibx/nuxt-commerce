import { serverErrors } from "~/server/utils/errors";
import { getDatabaseUrl } from "../../utils/util";
import { sql } from "drizzle-orm";
import { DBPluginMain } from "~/types/server";

export default async function () {
    const { default: postgres } = await import("postgres");
    const { drizzle } = await import("drizzle-orm/postgres-js");
    const schema = await import("../../schema/postgres/");

    const url = await getDatabaseUrl("PostgreSQL - Local", "DEV_POSTGRES_URL");
    // console.log("url is " + url);
    const client = postgres(toArray(url)[0]);
    const $drizzle = drizzle(client, { schema });
    await $drizzle.execute(sql`SELECT 1+1 AS result;`).catch(() => {
        throw createError({
            statusCode: 521,
            statusMessage: `${serverErrors[521]} - PostgreSQL - Local`,
        });
    });

    return { drizzle: $drizzle, disconnector: async () => client.end({ timeout: 1000 }) } as unknown as DBPluginMain;
}

export async function migrator() {
    const { drizzle } = await import("drizzle-orm/postgres-js");
    const schema = await import("../../schema/postgres/");
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const { default: postgres } = await import("postgres");
    const url = await getDatabaseUrl("PostgreSQL - Local", "DEV_POSTGRES_URL");
    const client = postgres(toArray(url)[0], { prepare: false, max: 1 });

    await migrate(drizzle(client, { schema }), { migrationsFolder: "" });

    await client.end();
}
