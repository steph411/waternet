CREATE TABLE "public"."connections"("id" text NOT NULL DEFAULT gen_random_uuid(), "origin_user_id" text NOT NULL, "destination_user_id" text NOT NULL, "accepted" boolean NOT NULL DEFAULT false, "date_added" timestamptz NOT NULL DEFAULT now(), "date_updated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("origin_user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("destination_user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
