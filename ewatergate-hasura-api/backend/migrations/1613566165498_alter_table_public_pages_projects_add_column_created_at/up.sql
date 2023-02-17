ALTER TABLE "public"."pages_projects" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
