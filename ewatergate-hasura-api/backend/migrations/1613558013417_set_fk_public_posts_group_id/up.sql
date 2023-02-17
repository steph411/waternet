alter table "public"."posts"
           add constraint "posts_group_id_fkey"
           foreign key ("group_id")
           references "public"."groups"
           ("id") on update restrict on delete restrict;
