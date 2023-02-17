alter table "public"."media_articles"
           add constraint "media_articles_categoryId_fkey"
           foreign key ("categoryId")
           references "public"."categories"
           ("id") on update restrict on delete restrict;
