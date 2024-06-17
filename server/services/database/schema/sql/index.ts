import { mysqlTable, varchar, mysqlEnum, serial, text } from "drizzle-orm/mysql-core";

export const backendUsers = mysqlTable("backend_users", {
    id: mysqlEnum("id", ["user", "admin"]),
    iserName: varchar("user_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const users = mysqlTable("users", {
    userId: serial("user_id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email_address", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }),
    mobileNumber: varchar("mobile_number", { length: 20 }),
    profilePic: text("profile_picture_url"),
});
