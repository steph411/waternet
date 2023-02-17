alter table "public"."images"
           add constraint "images_comment_id_fkey"
           foreign key ("comment_id")
           references "public"."comments"
           ("id") on update restrict on delete restrict;
