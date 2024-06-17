import { pgTable, serial, text, varchar, boolean, date, numeric, jsonb, foreignKey, integer, index, pgEnum } from "drizzle-orm/pg-core";
import { relations, getTableColumns, eq, sql } from "drizzle-orm";

export const provider = pgEnum("provider", ["google", "apple", "manual"]);

export const users = pgTable(
    "users",
    {
        userId: serial("user_id").primaryKey(),
        fullName: text("full_name").notNull(),
        email: varchar("email_address", { length: 256 }).unique().notNull(),
        password: varchar("password", { length: 256 }),
        phoneNumber: varchar("mobile_number", { length: 20 }).notNull().default(""),
        profilePic: text("profile_picture_url"),
        regMethod: provider("provider").default("manual"),
        // didUseProvider: boolean('did_use_provider').default(false),
        wallet: numeric("wallet_amount", { precision: 10, scale: 2 }).default("0.00"),
        is2faEnabled: boolean("is_2fa_enabled").default(false),
        // reservations: jsonb('reservations').$type<UserReservation>().default([]),
        // rated_parks: jsonb('rated_parks').$type<UserRatedParks>().default([]),
        createdAt: date("created_at", { mode: "date" }).defaultNow(),
    },
    (table) => ({
        userIdIndex: index("user_id_index").on(table.userId),
        emailIndex: index("email_index").on(table.email),
    })
);

// 1 review per user per park
export const reviews = pgTable(
    "reviews",
    {
        reviewId: serial("review_id").primaryKey(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.userId, { onDelete: "cascade" }),
        parkId: integer("park_id")
            .notNull()
            .references(() => parks.parkId, { onDelete: "cascade" }),
        rating: numeric("rating", { precision: 6, scale: 2 }).notNull(),
        comment: text("comment"),
        createdAt: date("created_at", { mode: "date" }).defaultNow(),
    },
    (table) => ({
        userIdIndex: index("review_user_id_index").on(table.userId),
        parkIdIndex: index("review_park_id_index").on(table.parkId).where(eq(table.parkId, parks.parkId)),
    })
);

export const parks = pgTable(
    "parks",
    {
        parkId: serial("park_id").primaryKey(),
        ownerId: integer("owner_id")
            .notNull()
            .references(() => users.userId, { onDelete: "cascade" }),
        name: varchar("park_name", { length: 256 }).notNull(),
        address: text("location").notNull(),
        description: text("description"),
        image: text("image_url"),
        createdAt: date("created_at", { mode: "date" }).defaultNow(),
    },
    (table) => ({
        userIdIndex: index("park_id_index").on(table.parkId),
        ownerIdIndex: index("park_owner_id_index").on(table.ownerId).where(eq(table.ownerId, users.userId)),
    })
);

export const reservations = pgTable(
    "reservations",
    {
        reservationId: serial("reservation_id").primaryKey(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.userId, { onDelete: "cascade" }),
        parkId: integer("park_id")
            .notNull()
            .references(() => parks.parkId, { onDelete: "cascade" }),
        createdAt: date("created_at", { mode: "date" }).defaultNow(),
        setDate: date("set_date", { mode: "date" }).notNull(),
        quantity: numeric("quantity", { precision: 6, scale: 2 }).notNull(),
    },
    (table) => ({
        reservationIdIndex: index("reservation_id_index").on(table.reservationId),
        userIdIndex: index("owner_id_index").on(table.userId).where(eq(table.userId, users.userId)),
    })
);

export const usersRelation = relations(users, ({ many }) => {
    return {
        parks: many(parks),
        reservations: many(reservations),
        reviews: many(reviews),
    };
});

export const parksRelation = relations(parks, ({ one, many }) => {
    return {
        reservations: many(reservations),
        reviews: many(reviews),
        users: one(users, {
            fields: [parks.ownerId],
            references: [users.userId],
        }),
    };
});

export const reviewsRelation = relations(reviews, ({ one, many }) => {
    return {
        users: one(users, {
            fields: [reviews.userId],
            references: [users.userId],
        }),
        parks: one(parks, {
            fields: [reviews.parkId],
            references: [parks.parkId],
        }),
    };
});

export const reservationsRelation = relations(reservations, ({ one }) => {
    return {
        parks: one(parks, {
            fields: [reservations.parkId],
            references: [parks.parkId],
        }),
        users: one(users, {
            fields: [reservations.userId],
            references: [users.userId],
        }),
    };
});
