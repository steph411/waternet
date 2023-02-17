alter table "public"."recommendations"
           add constraint "recommendations_userId_fkey"
           foreign key ("userId")
           references "public"."users"
           ("id") on update restrict on delete restrict;
