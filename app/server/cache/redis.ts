import { createClient } from "redis";

// const client = createClient({
//     password: "obiwezy",
// });

// client.on("error", (err) => {
//     console.log(err);
// });

// await client.connect();
// const value = await client.hGetAll("session:012345678");
// console.log(value);
// await client.quit();

export async function createRedisClient() {
	const url = await getRedisUrl();

	const client = createClient({ url });
	client.on("error", (err) => {
		// TODO: Improve this
		console.error(err);
	});
	if (import.meta.prerender !== true) {
		await client.connect();
	}
	return client;
}

async function getRedisUrl() {
	const { redisUrl } = useRuntimeConfig();
	if (redisUrl === undefined) {
		throw createError({
			statusCode: 511,
			statusMessage: `No URL found for Redis`,
		});
	}
	return redisUrl;
}

export const redis = await createRedisClient();
