import { SupportedDatabases } from "~/server/types";
import { changeDatabase } from "../utils/util";

export default defineEventHandler<{ query: { name?: string } }>(async (event) => {
    const { name } = getQuery(event);
    try {
        await changeDatabase(name as SupportedDatabases);
        return { success: true };
    } catch (error) {
        return error;
    }
});
