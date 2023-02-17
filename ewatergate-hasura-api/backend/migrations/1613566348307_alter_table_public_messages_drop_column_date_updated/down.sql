ALTER TABLE "public"."messages" ADD COLUMN "date_updated" timestamptz;
ALTER TABLE "public"."messages" ALTER COLUMN "date_updated" DROP NOT NULL;
ALTER TABLE "public"."messages" ALTER COLUMN "date_updated" SET DEFAULT now();
