DROP TRIGGER IF EXISTS "set_public_certifications_updated_at" ON "public"."certifications";
ALTER TABLE "public"."certifications" DROP COLUMN "updated_at";
