DROP TRIGGER IF EXISTS "set_public_messages_updated_at" ON "public"."messages";
ALTER TABLE "public"."messages" DROP COLUMN "updated_at";
