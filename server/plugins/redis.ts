import { RedisClientType } from "redis";
import { createRedisClient } from "../cache/redis";
import { serverUtils } from "../utils/util";

export default defineNitroPlugin(async () => {
    const redisClient = await createRedisClient();
    if (import.meta.prerender) {
        await redisClient.quit();
    }
    return (serverUtils.redis = redisClient as RedisClientType);
});
