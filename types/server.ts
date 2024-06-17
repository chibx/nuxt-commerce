import type { MySql2Database } from "drizzle-orm/mysql2";
import type { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { RedisClientType } from "redis";

export type ServerData = {
    name: string;
    version: string;
    plugins: ServerPlugins[];
    tools: {
        email: {
            [index: string]: ServerPrivateKeys;
        };
        database: {
            [index in SupportedDatabases]: ServerPrivateKeys;
        };
        redis: ServerPrivateKeys;
    };
    server_config: ServerConfig;
};

export type ServerState = {
    roles: string[] & ["admin", "user"];
};

export type CloudinaryResource = {
    resources: CloudinaryImageInfo[];
};

export type CacheInvalidators = {
    shouldDoGetTypes: boolean;
    shouldGetImages: boolean;
};

export interface CloudinaryImageInfo {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    folder: string;
    url: string;
    secure_url: string;
}

type ServerPlugins = {
    name: string;
    version: string;
    path: string;
    owner_url: string;
};

type ServerPrivateKeys = {
    name: string;
    [index: string]: string;
};

type ServerConfig = {
    allow_emails: boolean;
    allow_image: boolean;
    refresh_time: number;
    current_database_name: string;
    private_session_key: string;
    secret_key: string;
};

export type ServerProhibitors = {
    canMigrate: boolean;
};

export type ServerUtils = {
    database: ServerDatabase;
    redis: RedisClientType;
    migrate: () => Promise<void>;
    disconnector: () => Promise<void>;
    invalidators: CacheInvalidators;
    prohibitors: ServerProhibitors;
};

export type SupportedDatabases = "MySQL - Local" | "PostgreSQL - Local" | "Supabase" | "PlanetScale";

type ServerDatabase = MySql2Database | PlanetScaleDatabase | PostgresJsDatabase;

export type DBPluginMain = {
    drizzle: ServerDatabase;
    disconnector?: () => Promise<void>;
};
