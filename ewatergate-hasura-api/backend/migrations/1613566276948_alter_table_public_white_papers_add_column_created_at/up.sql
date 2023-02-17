ALTER TABLE "public"."white_papers" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
