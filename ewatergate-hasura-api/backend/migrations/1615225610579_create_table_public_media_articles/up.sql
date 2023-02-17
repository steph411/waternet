CREATE TABLE "public"."media_articles"("id" text NOT NULL DEFAULT gen_random_uuid(), "title" text NOT NULL, "description" text, "image" text, "content" jsonb, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "userId" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict); COMMENT ON TABLE "public"."media_articles" IS E'table for media articles';
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
CREATE TRIGGER "set_public_media_articles_updated_at"
BEFORE UPDATE ON "public"."media_articles"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_media_articles_updated_at" ON "public"."media_articles" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
