ALTER TABLE "public"."messages" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
