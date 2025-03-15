export default defineEventHandler<{ query: { key: string; value: string } }>(async (event) => {
    const { key, value } = getQuery(event);
    if (!key || key.trim().length === 0 || !value || value.trim().length === 0) {
        throw createError({ statusCode: 400, statusMessage: "Bad request" });
    }
    const a = await redis.set(key, value);
    return { success: true, value: a };
});
