import { sql } from "drizzle-orm";
import { bigserial, integer, json, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

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
	password: varchar("password", { length: 256 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }),
	profilePic: text("profile_picture_url"),
});

export const products = pgTable("products", {
	id: serial("product_id").primaryKey(),
	sku: varchar("SKU", { length: 50 }).unique("unique_sku").notNull(),
	name: text("name").notNull(),
	price: numeric("price", { scale: 2, precision: 15 }).default(sql`0.00::numeric`),
	quantity: integer("quantity").default(0),
	url: text("product_url").notNull().unique(),
	related: json("related_products").$type<string[]>().default([]),
	upsell: json("up-selling_products").$type<string[]>().default([]),
	cross_sell: json("cross-selling_products").$type<string[]>().default([]),
});
