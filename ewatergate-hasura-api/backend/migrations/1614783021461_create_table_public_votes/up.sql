CREATE TABLE "public"."votes"("id" text NOT NULL DEFAULT gen_random_uuid(), "userId" text NOT NULL, "answerId" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("userId","answerId","id") , FOREIGN KEY ("answerId") REFERENCES "public"."answers"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_votes_updated_at"
BEFORE UPDATE ON "public"."votes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_votes_updated_at" ON "public"."votes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
