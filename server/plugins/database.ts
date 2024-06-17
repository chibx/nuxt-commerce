import { serverUtils } from "../utils/util";
import { loadMySQL, loadPostgres, loadSupabase, loadPlanetScale } from "../services/database/utils/util";

export default defineNitroPlugin(async () => {
    if (import.meta.db === "PostgreSQL - Local") {
        await loadPostgres();
    } else if (import.meta.db === "MySQL - Local") {
        await loadMySQL();
    } else if (import.meta.db === "Supabase") {
        await loadSupabase();
    } else if (import.meta.db === "PlanetScale") {
        await loadPlanetScale();
    } else {
        throw createError(`Database: ${import.meta.db} not found`);
    }
    if (import.meta.dev) {
        console.log(`Database: ${import.meta.db} and ${serverUtils.database}`);
    }
});
