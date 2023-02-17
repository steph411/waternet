ALTER TABLE "public"."messages" ADD COLUMN "date_added" timestamptz;
ALTER TABLE "public"."messages" ALTER COLUMN "date_added" DROP NOT NULL;
ALTER TABLE "public"."messages" ALTER COLUMN "date_added" SET DEFAULT now();
