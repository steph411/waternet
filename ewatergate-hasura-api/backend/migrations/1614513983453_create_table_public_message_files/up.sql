CREATE TABLE "public"."message_files"("id" text NOT NULL DEFAULT gen_random_uuid(), "messageId" text NOT NULL, "link" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, PRIMARY KEY ("id") , FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON UPDATE restrict ON DELETE cascade); COMMENT ON TABLE "public"."message_files" IS E'table containing message files';
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
CREATE TRIGGER "set_public_message_files_updated_at"
BEFORE UPDATE ON "public"."message_files"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_message_files_updated_at" ON "public"."message_files" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
