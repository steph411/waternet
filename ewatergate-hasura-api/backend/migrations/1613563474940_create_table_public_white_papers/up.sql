CREATE TABLE "public"."white_papers"("id" text NOT NULL DEFAULT gen_random_uuid(), "title" text NOT NULL, "description" text NOT NULL, "image" text NOT NULL, "file_link" text NOT NULL, "userId" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);