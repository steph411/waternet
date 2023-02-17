DROP TRIGGER IF EXISTS "set_public_user_conversations_updated_at" ON "public"."user_conversations";
ALTER TABLE "public"."user_conversations" DROP COLUMN "updated_at";
