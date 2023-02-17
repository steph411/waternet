DROP TRIGGER IF EXISTS "set_public_scientific_articles_updated_at" ON "public"."scientific_articles";
ALTER TABLE "public"."scientific_articles" DROP COLUMN "updated_at";
