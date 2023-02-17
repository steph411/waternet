alter table "public"."likes"
           add constraint "likes_articleId_fkey"
           foreign key ("articleId")
           references "public"."media_articles"
           ("id") on update restrict on delete restrict;
