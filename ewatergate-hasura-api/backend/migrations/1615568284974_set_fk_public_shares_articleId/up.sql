alter table "public"."shares"
           add constraint "shares_articleId_fkey"
           foreign key ("articleId")
           references "public"."media_articles"
           ("id") on update restrict on delete restrict;
