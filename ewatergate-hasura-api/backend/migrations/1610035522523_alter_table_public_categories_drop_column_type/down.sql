ALTER TABLE "public"."categories" ADD COLUMN "type" CategoryType;
ALTER TABLE "public"."categories" ALTER COLUMN "type" DROP NOT NULL;
