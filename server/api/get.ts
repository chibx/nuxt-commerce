export default defineEventHandler<{ query: { key: string } }>(async (event) => {
    const { key } = getQuery(event);
    const redis = useRedis();
    if (!key || !key.trim().length) {
        throw createError({ statusCode: 400, statusMessage: "Bad request" });
    }
    const a = await redis.get(key);
    return { success: true, value: a };
});
