ALTER TABLE "public"."conversations" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
