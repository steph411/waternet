DROP TRIGGER IF EXISTS "set_public_connections_updated_at" ON "public"."connections";
ALTER TABLE "public"."connections" DROP COLUMN "updated_at";
