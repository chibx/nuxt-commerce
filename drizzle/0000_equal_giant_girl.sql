CREATE TABLE IF NOT EXISTS "backend_users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email_address" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"phone_number" varchar(20),
	"profile_picture_url" text,
	CONSTRAINT "users_email_address_unique" UNIQUE("email_address")
);
