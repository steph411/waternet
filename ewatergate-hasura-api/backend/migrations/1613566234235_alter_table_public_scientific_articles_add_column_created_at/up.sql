ALTER TABLE "public"."scientific_articles" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
