alter table "public"."messages"
           add constraint "messages_conversationId_fkey"
           foreign key ("conversationId")
           references "public"."conversations"
           ("id") on update restrict on delete restrict;
