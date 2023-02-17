CREATE TYPE public."CategoryType" AS ENUM (
    'USER',
    'TECHNICAL'
);
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
CREATE TABLE public.categories (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    type public."CategoryType" NOT NULL,
    user_category_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.comments (
    id text NOT NULL,
    text text NOT NULL,
    user_id text NOT NULL,
    parent_comment_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" text
);
CREATE TABLE public.groups (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.images (
    id text NOT NULL,
    link text NOT NULL,
    post_id text,
    group_id text,
    page_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.likes (
    id text NOT NULL,
    post_id text,
    user_id text NOT NULL,
    comment_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.pages (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.posts (
    id text NOT NULL,
    title text,
    content text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.sessions (
    id text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    session_token text NOT NULL,
    access_token text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.shares (
    id text NOT NULL,
    post_id text,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.user_categories (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.users (
    id text NOT NULL,
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
    id text NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE public.videos (
    id text NOT NULL,
    link text NOT NULL,
    post_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
ALTER TABLE ONLY public."CategoryOnPosts"
    ADD CONSTRAINT "CategoryOnPosts_pkey" PRIMARY KEY (post_id, category_id);
ALTER TABLE ONLY public."UserOnCategories"
    ADD CONSTRAINT "UserOnCategories_pkey" PRIMARY KEY (category_id, user_id);
ALTER TABLE ONLY public."UserOnGroups"
    ADD CONSTRAINT "UserOnGroups_pkey" PRIMARY KEY (group_id, user_id);
ALTER TABLE ONLY public."UserOnPages"
    ADD CONSTRAINT "UserOnPages_pkey" PRIMARY KEY (page_id, user_id);
ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_categories
    ADD CONSTRAINT user_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);
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
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_category_id_fkey FOREIGN KEY (user_category_id) REFERENCES public.user_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
