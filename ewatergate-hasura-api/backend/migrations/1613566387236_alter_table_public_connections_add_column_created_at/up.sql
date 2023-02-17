ALTER TABLE "public"."connections" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
