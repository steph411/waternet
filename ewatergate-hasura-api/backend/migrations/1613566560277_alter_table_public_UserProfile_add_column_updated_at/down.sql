DROP TRIGGER IF EXISTS "set_public_UserProfile_updated_at" ON "public"."UserProfile";
ALTER TABLE "public"."UserProfile" DROP COLUMN "updated_at";
