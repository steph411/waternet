CREATE TYPE public."CategoryType" AS ENUM (
    'USER',
    'TECHNICAL'
);
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public."CategoryOnPosts" (
    post_id text NOT NULL,
    category_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public."UserOnCategories" (
    category_id text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public."UserOnGroups" (
    group_id text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public."UserOnPages" (
    page_id text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public."UserProfile" (
    professional_summary text,
    work_experience text,
    education text,
    basic_information text,
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "userId" text NOT NULL,
    services jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    cover_image text
);
CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
CREATE TABLE public.accounts (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    compound_id text NOT NULL,
    user_id text NOT NULL,
    provider_type text NOT NULL,
    provider_id text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    access_token_expires timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.answers (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "questionId" text NOT NULL,
    content text NOT NULL,
    "userId" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.answers IS 'answers for the question in the water answers part of the platform';
CREATE TABLE public.categories (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    user_category_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category_type_id text NOT NULL
);
CREATE TABLE public.category_types (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);
COMMENT ON TABLE public.category_types IS 'category types , USER and TECHNICAL';
CREATE TABLE public.certifications (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    location text NOT NULL,
    institution text NOT NULL,
    file_link text NOT NULL,
    "userId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.comments (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    user_id text NOT NULL,
    parent_comment_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" text,
    "answerId" text,
    "articleId" text
);
CREATE TABLE public.connections (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    origin_user_id text NOT NULL,
    destination_user_id text NOT NULL,
    accepted boolean DEFAULT false NOT NULL,
    date_added timestamp with time zone DEFAULT now() NOT NULL,
    date_updated timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.conversations (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    date_added timestamp with time zone DEFAULT now() NOT NULL,
    date_updated timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.digital_posts (
    id text NOT NULL,
    title text,
    content text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_deleted text DEFAULT 'false'::text NOT NULL,
    original_post_id text,
    page_id text,
    group_id text
);
COMMENT ON TABLE public.digital_posts IS 'table for digital media posts';
CREATE TABLE public.groups (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image text,
    logo text,
    creator_id text,
    description text
);
CREATE TABLE public.images (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    link text NOT NULL,
    post_id text,
    group_id text,
    page_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    comment_id text
);
CREATE TABLE public.likes (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    post_id text,
    user_id text NOT NULL,
    comment_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "articleId" text
);
CREATE TABLE public.media_articles (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    image text,
    content jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" text NOT NULL,
    "categoryId" text NOT NULL,
    document text
);
COMMENT ON TABLE public.media_articles IS 'table for media articles';
CREATE TABLE public.message_files (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "messageId" text NOT NULL,
    link text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);
COMMENT ON TABLE public.message_files IS 'table containing message files';
CREATE TABLE public.messages (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    content text NOT NULL,
    file text,
    "userId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "conversationId" text
);
CREATE TABLE public.pages (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image text,
    logo text,
    website text,
    overview text,
    specialities text,
    employees integer,
    location text,
    services jsonb,
    creator_id text
);
CREATE TABLE public.pages_projects (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    image text,
    link text,
    page_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.pages_projects IS 'projects of the page';
CREATE TABLE public.posts (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text,
    content text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted boolean,
    original_post_id text,
    page_id text,
    group_id text,
    type text
);
CREATE TABLE public.questions (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "userId" text,
    "categoryId" text NOT NULL,
    topic text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.questions IS 'table for questions in the water answers part of the platform';
CREATE TABLE public.questions_followers (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "questionId" text NOT NULL,
    "userId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.recommendations (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "articleId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" text
);
COMMENT ON TABLE public.recommendations IS 'recommendations for media_articles';
CREATE TABLE public.scientific_articles (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    file_link text NOT NULL,
    "userId" text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    article_link text
);
CREATE TABLE public.sessions (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    session_token text NOT NULL,
    access_token text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.shares (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    post_id text,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    comment_id text,
    "articleId" text
);
CREATE TABLE public.user_categories (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.user_conversations (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "userId" text NOT NULL,
    "conversationId" text NOT NULL,
    date_added timestamp with time zone DEFAULT now() NOT NULL,
    date_updated timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_deleted boolean DEFAULT false
);
CREATE TABLE public.users (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    firstname text,
    lastname text,
    password text,
    email text,
    email_verified timestamp(3) without time zone,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    city text,
    country text
);
CREATE TABLE public.verification_requests (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.videos (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    link text NOT NULL,
    post_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.views (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "answerId" text,
    "userId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.views IS 'table to store views for answers';
CREATE TABLE public.votes (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "userId" text NOT NULL,
    "answerId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.white_papers (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    file_link text NOT NULL,
    "userId" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    article_link text
);
ALTER TABLE ONLY public."CategoryOnPosts"
    ADD CONSTRAINT "CategoryOnPosts_pkey" PRIMARY KEY (post_id, category_id);
ALTER TABLE ONLY public."UserOnCategories"
    ADD CONSTRAINT "UserOnCategories_pkey" PRIMARY KEY (category_id, user_id);
ALTER TABLE ONLY public."UserOnGroups"
    ADD CONSTRAINT "UserOnGroups_pkey" PRIMARY KEY (group_id, user_id);
ALTER TABLE ONLY public."UserOnPages"
    ADD CONSTRAINT "UserOnPages_pkey" PRIMARY KEY (page_id, user_id);
ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_userId_key" UNIQUE ("userId");
ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category_types
    ADD CONSTRAINT category_types_name_key UNIQUE (name);
ALTER TABLE ONLY public.category_types
    ADD CONSTRAINT category_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.digital_posts
    ADD CONSTRAINT digital_posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.media_articles
    ADD CONSTRAINT media_articles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT message_files_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_projects
    ADD CONSTRAINT pages_projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.questions_followers
    ADD CONSTRAINT questions_followers_pkey PRIMARY KEY ("questionId", "userId", id);
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.scientific_articles
    ADD CONSTRAINT scientific_articles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_categories
    ADD CONSTRAINT user_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_conversations
    ADD CONSTRAINT user_conversations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.views
    ADD CONSTRAINT views_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY ("userId", "answerId", id);
ALTER TABLE ONLY public.white_papers
    ADD CONSTRAINT white_papers_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON public.accounts USING btree (compound_id);
CREATE UNIQUE INDEX "categories.name_unique" ON public.categories USING btree (name);
CREATE UNIQUE INDEX "groups.name_unique" ON public.groups USING btree (name);
CREATE UNIQUE INDEX "pages.name_unique" ON public.pages USING btree (name);
CREATE INDEX "providerAccountId" ON public.accounts USING btree (provider_account_id);
CREATE INDEX "providerId" ON public.accounts USING btree (provider_id);
CREATE UNIQUE INDEX "sessions.access_token_unique" ON public.sessions USING btree (access_token);
CREATE UNIQUE INDEX "sessions.session_token_unique" ON public.sessions USING btree (session_token);
CREATE INDEX "userId" ON public.accounts USING btree (user_id);
CREATE UNIQUE INDEX "user_categories.name_unique" ON public.user_categories USING btree (name);
CREATE UNIQUE INDEX "users.email_unique" ON public.users USING btree (email);
CREATE UNIQUE INDEX "verification_requests.token_unique" ON public.verification_requests USING btree (token);
CREATE TRIGGER "set_public_UserProfile_updated_at" BEFORE UPDATE ON public."UserProfile" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_UserProfile_updated_at" ON public."UserProfile" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_answers_updated_at BEFORE UPDATE ON public.answers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_answers_updated_at ON public.answers IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_certifications_updated_at ON public.certifications IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_connections_updated_at BEFORE UPDATE ON public.connections FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_connections_updated_at ON public.connections IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_conversations_updated_at ON public.conversations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_digital_posts_updated_at BEFORE UPDATE ON public.digital_posts FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_digital_posts_updated_at ON public.digital_posts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_media_articles_updated_at BEFORE UPDATE ON public.media_articles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_media_articles_updated_at ON public.media_articles IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_message_files_updated_at BEFORE UPDATE ON public.message_files FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_message_files_updated_at ON public.message_files IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_messages_updated_at ON public.messages IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_questions_followers_updated_at BEFORE UPDATE ON public.questions_followers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_questions_followers_updated_at ON public.questions_followers IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_questions_updated_at ON public.questions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_recommendations_updated_at BEFORE UPDATE ON public.recommendations FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_recommendations_updated_at ON public.recommendations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_scientific_articles_updated_at BEFORE UPDATE ON public.scientific_articles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_scientific_articles_updated_at ON public.scientific_articles IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_conversations_updated_at BEFORE UPDATE ON public.user_conversations FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_conversations_updated_at ON public.user_conversations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_views_updated_at BEFORE UPDATE ON public.views FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_views_updated_at ON public.views IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_votes_updated_at BEFORE UPDATE ON public.votes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_votes_updated_at ON public.votes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_white_papers_updated_at BEFORE UPDATE ON public.white_papers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_white_papers_updated_at ON public.white_papers IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public."CategoryOnPosts"
    ADD CONSTRAINT "CategoryOnPosts_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."CategoryOnPosts"
    ADD CONSTRAINT "CategoryOnPosts_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnCategories"
    ADD CONSTRAINT "UserOnCategories_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnCategories"
    ADD CONSTRAINT "UserOnCategories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnGroups"
    ADD CONSTRAINT "UserOnGroups_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnGroups"
    ADD CONSTRAINT "UserOnGroups_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnPages"
    ADD CONSTRAINT "UserOnPages_page_id_fkey" FOREIGN KEY (page_id) REFERENCES public.pages(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserOnPages"
    ADD CONSTRAINT "UserOnPages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public.questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_category_type_id_fkey FOREIGN KEY (category_type_id) REFERENCES public.category_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_category_id_fkey FOREIGN KEY (user_category_id) REFERENCES public.user_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT "certifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public.answers(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.media_articles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_destination_user_id_fkey FOREIGN KEY (destination_user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_origin_user_id_fkey FOREIGN KEY (origin_user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.digital_posts
    ADD CONSTRAINT digital_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.media_articles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media_articles
    ADD CONSTRAINT "media_articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.media_articles
    ADD CONSTRAINT "media_articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT "message_files_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES public.messages(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.pages_projects
    ADD CONSTRAINT pages_projects_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.questions_followers
    ADD CONSTRAINT "questions_followers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public.questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.questions_followers
    ADD CONSTRAINT "questions_followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT "recommendations_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.media_articles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT "recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.scientific_articles
    ADD CONSTRAINT "scientific_articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT "shares_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.media_articles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.user_conversations
    ADD CONSTRAINT "user_conversations_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_conversations
    ADD CONSTRAINT "user_conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.views
    ADD CONSTRAINT "views_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public.answers(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.views
    ADD CONSTRAINT "views_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public.answers(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.white_papers
    ADD CONSTRAINT "white_papers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
