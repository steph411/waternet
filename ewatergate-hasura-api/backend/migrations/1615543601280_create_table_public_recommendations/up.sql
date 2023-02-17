CREATE TABLE "public"."recommendations"("id" text NOT NULL DEFAULT gen_random_uuid(), "articleId" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("articleId") REFERENCES "public"."media_articles"("id") ON UPDATE restrict ON DELETE restrict); COMMENT ON TABLE "public"."recommendations" IS E'recommendations for media_articles';
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
CREATE TRIGGER "set_public_recommendations_updated_at"
BEFORE UPDATE ON "public"."recommendations"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_recommendations_updated_at" ON "public"."recommendations" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
