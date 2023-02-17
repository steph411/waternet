alter table "public"."groups"
           add constraint "groups_creator_id_fkey"
           foreign key ("creator_id")
           references "public"."users"
           ("id") on update restrict on delete restrict;
