CREATE TYPE "public"."provider" AS ENUM('local', 'google');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('unverified', 'verified');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('low', 'moderate', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."safety_type" AS ENUM('shelter', 'hospital');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'blocked');--> statement-breakpoint
CREATE TABLE "auth_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"provider" "provider" NOT NULL,
	"provider_id" varchar(255),
	"hashed_password" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_provider_provider_id" UNIQUE("provider","provider_id")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"report_id" uuid,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profile_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"profile_picture" text,
	"profile_picture_public_id" text,
	"home_address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"device_id" varchar(255) NOT NULL,
	"hashed_token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" integer,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"location" text DEFAULT 'Unknown location' NOT NULL,
	"range" double precision NOT NULL,
	"description" text,
	"image" text,
	"image_public_id" text,
	"severity" "severity" NOT NULL,
	"status" "report_status" DEFAULT 'unverified' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "safety" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" integer,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"location" text DEFAULT 'Unknown location' NOT NULL,
	"description" text,
	"image" text,
	"image_public_id" text,
	"type" "safety_type" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "safety" ADD CONSTRAINT "safety_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "first_name_idx" ON "profile_info" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name_idx" ON "profile_info" USING btree ("last_name");--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_tokens_user_id_device_id_index" ON "refresh_tokens" USING btree ("user_id","device_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");