import { pgTable, index, foreignKey, serial, integer, date, numeric, text, unique, varchar, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const providerEnum = pgEnum('provider', ['google', 'apple', 'manual']);

export const reservations = pgTable("reservations", {
	reservationId: serial("reservation_id").primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.userId, { onDelete: "cascade" } ),
	parkId: integer("park_id").notNull().references(() => parks.parkId, { onDelete: "cascade" } ),
	createdAt: date("created_at").defaultNow(),
	setDate: date("set_date").notNull(),
	quantity: numeric("quantity", { precision: 6, scale:  2 }).notNull(),
},
(table) => {
	return {
		reservationIdIdx: index("reservation_id_index").on(table.reservationId),
		ownerIdIdx: index("owner_id_index").on(table.userId),
	}
});

export const reviews = pgTable("reviews", {
	reviewId: serial("review_id").primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.userId, { onDelete: "cascade" } ),
	parkId: integer("park_id").notNull().references(() => parks.parkId, { onDelete: "cascade" } ),
	rating: numeric("rating", { precision: 6, scale:  2 }).notNull(),
	comment: text("comment"),
	createdAt: date("created_at").defaultNow(),
},
(table) => {
	return {
		reviewUserIdIdx: index("review_user_id_index").on(table.userId),
		reviewParkIdIdx: index("review_park_id_index").on(table.parkId),
	}
});

export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	emailAddress: varchar("email_address", { length: 256 }).notNull().unique(),
	password: varchar("password", { length: 256 }),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	profilePic: text("profile_picture_url"),
	// didUseProvider: boolean("did_use_provider").default(false),
	provider: providerEnum('provider').default('manual'),
	walletAmount: numeric("wallet_amount", { precision: 10, scale:  2 }).default('0.00'),
	is2FaEnabled: boolean("is_2fa_enabled").default(false),
	ratedParks: jsonb("rated_parks").default([]),
	recentParks: jsonb("recent_parks").default([]),
	createdAt: date("created_at").defaultNow(),
},
(table) => {
	return {
		userIdIdx: index("user_id_index").on(table.userId),
		emailIdx: index("email_index").on(table.emailAddress),
		usersEmailAddressUnique: unique("users_email_address_unique").on(table.emailAddress),
	}
});

export const parks = pgTable("parks", {
	parkId: serial("park_id").primaryKey().notNull(),
	ownerId: integer("owner_id").notNull().references(() => users.userId, { onDelete: "cascade" } ),
	parkName: varchar("park_name", { length: 256 }).notNull(),
	location: text("location").notNull(),
	description: text("description"),
	imageUrl: text("image_url"),
	createdAt: date("created_at").defaultNow(),
},
(table) => {
	return {
		parkIdIdx: index("park_id_index").on(table.parkId),
		parkOwnerIdIdx: index("park_owner_id_index").on(table.ownerId),
	}
});