ALTER TABLE "public"."user_conversations" ADD COLUMN "created_at" timestamptz NOT NULL DEFAULT now();
