CREATE TYPE "public"."status" AS ENUM('active', 'blocked');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;