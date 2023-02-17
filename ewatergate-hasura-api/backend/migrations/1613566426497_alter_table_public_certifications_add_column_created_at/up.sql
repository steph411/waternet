ALTER TABLE "public"."certifications" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
