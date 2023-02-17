DROP TRIGGER IF EXISTS "set_public_conversations_updated_at" ON "public"."conversations";
ALTER TABLE "public"."conversations" DROP COLUMN "updated_at";
