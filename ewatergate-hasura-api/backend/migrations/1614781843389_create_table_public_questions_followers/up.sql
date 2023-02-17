CREATE TABLE "public"."questions_followers"("id" text NOT NULL DEFAULT gen_random_uuid(), "questionId" text NOT NULL, "userId" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("questionId","userId","id") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_questions_followers_updated_at"
BEFORE UPDATE ON "public"."questions_followers"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_questions_followers_updated_at" ON "public"."questions_followers" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
