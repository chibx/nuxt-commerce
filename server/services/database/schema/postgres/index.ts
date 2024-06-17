import { pgTable, varchar, bigserial, serial, text } from "drizzle-orm/pg-core";

export const backendUsers = pgTable("backend_users", {
    id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const users = pgTable("users", {
    userId: serial("user_id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email_address", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }),
    mobileNumber: varchar("mobile_number", { length: 20 }),
    profilePic: text("profile_picture_url"),
});
