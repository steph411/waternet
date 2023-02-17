ALTER TABLE "public"."UserProfile" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
