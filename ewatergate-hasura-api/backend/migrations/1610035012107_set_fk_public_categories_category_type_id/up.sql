alter table "public"."categories"
           add constraint "categories_category_type_id_fkey"
           foreign key ("category_type_id")
           references "public"."category_types"
           ("id") on update cascade on delete restrict;
