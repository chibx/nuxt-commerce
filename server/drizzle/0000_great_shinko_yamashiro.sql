-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "reservations" (
	"reservation_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"park_id" integer NOT NULL,
	"created_at" date DEFAULT now(),
	"set_date" date NOT NULL,
	"quantity" numeric(6, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"park_id" integer NOT NULL,
	"rating" numeric(6, 2) NOT NULL,
	"comment" text,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email_address" varchar(256) NOT NULL,
	"password" varchar(256),
	"mobile_number" varchar(20),
	"profile_picture_url" text,
	"did_use_provider" boolean DEFAULT false,
	"wallet_amount" numeric(10, 2) DEFAULT 0.00,
	"is_2fa_enabled" boolean DEFAULT false,
	"rated_parks" jsonb DEFAULT '[]'::jsonb,
	"recent_parks" jsonb DEFAULT '[]'::jsonb,
	"created_at" date DEFAULT now(),
	CONSTRAINT "users_email_address_unique" UNIQUE("email_address")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parks" (
	"park_id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL,
	"park_name" varchar(256) NOT NULL,
	"location" text NOT NULL,
	"description" text,
	"image_url" text,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_id_index" ON "reservations" ("reservation_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "owner_id_index" ON "reservations" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_user_id_index" ON "reviews" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_park_id_index" ON "reviews" ("park_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "users" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" ("email_address");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "park_id_index" ON "parks" ("park_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "park_owner_id_index" ON "parks" ("owner_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_park_id_parks_park_id_fk" FOREIGN KEY ("park_id") REFERENCES "public"."parks"("park_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_park_id_parks_park_id_fk" FOREIGN KEY ("park_id") REFERENCES "public"."parks"("park_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parks" ADD CONSTRAINT "parks_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/