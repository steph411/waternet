ALTER TABLE "public"."pages_projects" ADD COLUMN "updated_at" timestamptz NOT NULL DEFAULT now();
