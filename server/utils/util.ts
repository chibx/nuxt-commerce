// import { Resend } from "resend";
import { createRemoteJWKSet } from "jose";
import { ServerData, ServerUtils, SupportedDatabases } from "~/types/server";
import { serverErrors } from "./errors";
import { loadMySQL, loadPlanetScale, loadPostgres, loadSupabase } from "../services/database/utils/util";

export const appleJwksClient = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

export const googleJwksClient = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

// Resend
// export const resend = new Resend(resendApiKey);

export function convertMustache(str: string, opts: Record<string, string>) {
    let newStr = str;
    newStr = newStr.replace(/{{\s?(\w+)\s?}}/g, (match, word: string) => {
        const val = opts[word];
        return val || match;
    });
    return newStr;
}

export async function getServerData(): Promise<ServerData> {
    try {
        const serverData = await useStorage("assets:server").getItem<ServerData>("comx.json");
        if (serverData) {
            return serverData;
        } else {
            console.warn("Error: no such asset <comx.json>");
        }
    } catch (error) {
        throw createError({
            statusCode: 510,
            statusMessage: serverErrors[510],
        });
    }
    throw createError({
        statusCode: 511,
        statusMessage: serverErrors[511],
    });
}

// Server Invalidators
export const serverUtils /*#__PURE__*/ = {
    database: undefined,
    redis: undefined,
    invalidators: {
        shouldDoGetTypes: true,
        shouldGetImages: true,
    },
    prohibitors: {
        canMigrate: true,
    },
    migrate: async () => {},
    disconnector: undefined,
} as unknown as ServerUtils;

// TODO - remove later
export async function changeDatabase(dbName: SupportedDatabases) {
    if (dbName === "PostgreSQL - Local") {
        await loadPostgres();
    } else if (dbName === "MySQL - Local") {
        await loadMySQL();
    } else if (dbName === "Supabase") {
        await loadSupabase();
    } else if (dbName === "PlanetScale") {
        await loadPlanetScale();
    } else {
        throw createError(`Database: ${dbName} not found`);
    }
}

export function toArray<T>(val: T | T[]): T[] {
    return Array.isArray(val) ? val : [val];
}

export function useRedis() {
    return serverUtils.redis;
}
