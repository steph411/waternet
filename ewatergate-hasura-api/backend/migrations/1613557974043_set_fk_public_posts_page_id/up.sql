alter table "public"."posts"
           add constraint "posts_page_id_fkey"
           foreign key ("page_id")
           references "public"."pages"
           ("id") on update restrict on delete restrict;
