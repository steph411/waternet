alter table "public"."comments"
           add constraint "comments_answerId_fkey"
           foreign key ("answerId")
           references "public"."answers"
           ("id") on update restrict on delete restrict;
