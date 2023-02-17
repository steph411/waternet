CREATE TABLE "public"."views"("id" text NOT NULL DEFAULT gen_random_uuid(), "answerId" text, "userId" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("answerId") REFERENCES "public"."answers"("id") ON UPDATE restrict ON DELETE restrict); COMMENT ON TABLE "public"."views" IS E'table to store views for answers';
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
CREATE TRIGGER "set_public_views_updated_at"
BEFORE UPDATE ON "public"."views"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_views_updated_at" ON "public"."views" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
