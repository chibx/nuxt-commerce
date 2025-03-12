import type {
    // ServerData, 
    ServerUtils
} from "~~/server/types";

// import { createRemoteJWKSet } from "jose";
// export const appleJwksClient = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

// export const googleJwksClient = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export { redis } from '../cache/redis';
export { db } from '../db/index'


export function convertMustache(str: string, opts: Record<string, string>) {
    let newStr = str;
    newStr = newStr.replace(/{{\s?(\w+)\s?}}/g, (match, word: string) => {
        const val = opts[word];
        return val || match;
    });
    return newStr;
}

// Server Invalidators
export const serverUtils /*#__PURE__*/ = {
    invalidators: {
        shouldDoGetTypes: true,
        shouldGetImages: true,
    },
    prohibitors: {
        canMigrate: true,
    }
} as ServerUtils;

export function toArray<T>(val: T | T[]): T[] {
    return Array.isArray(val) ? val : [val];
}


/** Join argument to match folder path for cloudinary */
export const joinImagePath = (...args: string[]) => {
    const cloudFolder = "";
    return [cloudFolder, ...args].join("/");
};
