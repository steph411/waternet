DROP TRIGGER IF EXISTS "set_public_white_papers_updated_at" ON "public"."white_papers";
ALTER TABLE "public"."white_papers" DROP COLUMN "updated_at";
