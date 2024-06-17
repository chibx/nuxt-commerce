import { serverErrors } from "~/server/utils/errors";
import { getDatabaseUrl } from "../../utils/util";
import { toArray } from "~/server/utils/util";
import { DBPluginMain } from "~/types/server";

export default async function () {
    const { drizzle } = await import("drizzle-orm/mysql2");
    const { createConnection } = await import("mysql2/promise");
    const schema = await import("../../schema/sql");
    const url = await getDatabaseUrl("MySQL - Local", "DEV_SQL_URL");
    const client = await createConnection(toArray(url)[0]);
    const $drizzle = drizzle(client, { schema, mode: "default" });
    await client.execute("SELECT 1+1 AS result;").catch(() => {
        throw createError({
            statusCode: 520,
            statusMessage: `${serverErrors[521]} - Dev:SQL`,
        });
    });
    return { drizzle: $drizzle, disconnector: async () => client.end() } as unknown as DBPluginMain;
}

export async function migrator() {
    const { drizzle } = await import("drizzle-orm/mysql2");
    const schema = await import("../../schema/sql/");
    const { migrate } = await import("drizzle-orm/mysql2/migrator");
    const { createConnection } = await import("mysql2/promise");
    const url = await getDatabaseUrl("MySQL - Local", "DEV_SQL_URL");
    const client = await createConnection(toArray(url)[0]);

    await migrate(drizzle(client, { schema, mode: "default" }), { migrationsFolder: "" });

    await client.end();
}
