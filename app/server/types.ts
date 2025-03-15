export interface ServerData {
    version: string;
    tools: {
        email: string | null;
        databaseUrl: string | null;
        redis: string | null;
    };
    serverConfig: ServerConfig;
}

export interface ServerState {
    roles: string[] & ["admin", "user"];
}

export interface CloudinaryResource {
    resources: CloudinaryImageInfo[];
}

export interface CacheInvalidators {
    shouldDoGetTypes: boolean;
    shouldGetImages: boolean;
}

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

interface ServerConfig {
    allow_emails: boolean;
    allow_image: boolean;
    refresh_time: number;
    current_database_name: string;
    private_session_key: string;
    secret_key: string;
}

export interface ServerProhibitors {
    canMigrate: boolean;
}

export interface ServerUtils {
    invalidators: CacheInvalidators;
    prohibitors: ServerProhibitors;
}