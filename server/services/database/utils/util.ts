import { serverErrors } from "~/server/utils/errors";

/**
 *
 * @param name The name of the database.
 * @param env The environment variable to get.
 */
export async function getDatabaseUrl(name: string, env = ""): Promise<string | string[]> {
    const serverData = await getServerData();
    const databases = serverData.tools.database;
    const key = Object.values(databases).find((key) => key.name === name);
    if (key === undefined) {
        throw createError({
            statusCode: 511,
            statusMessage: `No Key field found for ${name}`,
        });
    }
    const result = key[env];
    if (result === undefined || result.trim().length === 0) {
        throw createError({
            statusCode: 520,
            statusMessage: `${serverErrors[520]} - ${name}`,
        });
    }
    return result;
}

export async function loadPostgres() {
    const { default: $drizzle, migrator } = await import("../../../services/database/providers/dev/pg");
    const { drizzle, disconnector } = await $drizzle();
    if (serverUtils.disconnector) {
        await serverUtils.disconnector();
    }
    if (disconnector) {
        await disconnector();
    }
    serverUtils.database = drizzle;
    serverUtils.migrate = migrator;
    serverUtils.disconnector = disconnector as () => Promise<void>;
}

export async function loadMySQL() {
    const { default: $drizzle, migrator } = await import("../../../services/database/providers/dev/mysql");
    const { drizzle, disconnector } = await $drizzle();
    if (serverUtils.disconnector) {
        await serverUtils.disconnector();
    }
    if (disconnector) {
        await disconnector();
    }
    serverUtils.database = drizzle;
    serverUtils.migrate = migrator;
    serverUtils.disconnector = disconnector as () => Promise<void>;
}

export async function loadPlanetScale() {
    const { default: $drizzle, migrator } = await import("../../../services/database/providers/planetscale");
    const { drizzle, disconnector } = await $drizzle();
    if (serverUtils.disconnector) {
        await serverUtils.disconnector();
    }
    if (disconnector) {
        await disconnector();
    }
    serverUtils.database = drizzle;
    serverUtils.migrate = migrator;
    serverUtils.disconnector = disconnector as () => Promise<void>;
}

export async function loadSupabase() {
    const { default: $drizzle, migrator } = await import("../../../services/database/providers/supabase");
    const { drizzle, disconnector } = await $drizzle();
    if (serverUtils.disconnector) {
        await serverUtils.disconnector();
    }
    if (disconnector) {
        await disconnector();
    }
    serverUtils.database = drizzle;
    serverUtils.migrate = migrator;
    serverUtils.disconnector = disconnector as () => Promise<void>;
}
