CREATE TABLE "public"."digital_posts"("id" text NOT NULL, "title" text, "content" text NOT NULL, "user_id" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "is_deleted" text NOT NULL DEFAULT 'false', "original_post_id" text, "page_id" text, "group_id" text, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict); COMMENT ON TABLE "public"."digital_posts" IS E'table for digital media posts';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_digital_posts_updated_at"
BEFORE UPDATE ON "public"."digital_posts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_digital_posts_updated_at" ON "public"."digital_posts" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
