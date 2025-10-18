CREATE TYPE "public"."email_status" AS ENUM('sent', 'failed', 'pending');--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"to" text NOT NULL,
	"from" text NOT NULL,
	"subject" text NOT NULL,
	"status" "email_status" DEFAULT 'pending' NOT NULL,
	"resend_email_id" text,
	"contact_submission_id" uuid,
	"error" text,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_contact_submission_id_contact_submission_id_fk" FOREIGN KEY ("contact_submission_id") REFERENCES "public"."contact_submission"("id") ON DELETE set null ON UPDATE no action;