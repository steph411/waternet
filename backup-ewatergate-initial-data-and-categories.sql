/*
 Navicat Premium Data Transfer

 Source Server         : ewatergate-docker-local
 Source Server Type    : PostgreSQL
 Source Server Version : 120005
 Source Host           : localhost:8899
 Source Catalog        : ewatergate
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120005
 File Encoding         : 65001

 Date: 07/01/2021 19:49:51
*/


-- ----------------------------
-- Type structure for CategoryType
-- ----------------------------
DROP TYPE IF EXISTS "public"."CategoryType";
CREATE TYPE "public"."CategoryType" AS ENUM (
  'USER',
  'TECHNICAL'
);
ALTER TYPE "public"."CategoryType" OWNER TO "ewatergate";

-- ----------------------------
-- Table structure for CategoryOnPosts
-- ----------------------------
DROP TABLE IF EXISTS "public"."CategoryOnPosts";
CREATE TABLE "public"."CategoryOnPosts" (
  "post_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "category_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."CategoryOnPosts" OWNER TO "ewatergate";

-- ----------------------------
-- Records of CategoryOnPosts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for UserOnCategories
-- ----------------------------
DROP TABLE IF EXISTS "public"."UserOnCategories";
CREATE TABLE "public"."UserOnCategories" (
  "category_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."UserOnCategories" OWNER TO "ewatergate";

-- ----------------------------
-- Records of UserOnCategories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for UserOnGroups
-- ----------------------------
DROP TABLE IF EXISTS "public"."UserOnGroups";
CREATE TABLE "public"."UserOnGroups" (
  "group_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."UserOnGroups" OWNER TO "ewatergate";

-- ----------------------------
-- Records of UserOnGroups
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for UserOnPages
-- ----------------------------
DROP TABLE IF EXISTS "public"."UserOnPages";
CREATE TABLE "public"."UserOnPages" (
  "page_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."UserOnPages" OWNER TO "ewatergate";

-- ----------------------------
-- Records of UserOnPages
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;
ALTER TABLE "public"."_prisma_migrations" OWNER TO "ewatergate";

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
BEGIN;
INSERT INTO "public"."_prisma_migrations" VALUES ('c14e2539-0517-41d7-97cb-840815a67b67', '60d7ec95526cf597c8856a548d88fe3d06ce3e376e6b74a202fbd455b30cc14', '2021-01-07 11:08:59.604775+00', '20210106220147_initial', NULL, NULL, '2021-01-07 11:08:58.810469+00', 1);
COMMIT;

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS "public"."accounts";
CREATE TABLE "public"."accounts" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "compound_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "provider_type" text COLLATE "pg_catalog"."default" NOT NULL,
  "provider_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "provider_account_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "refresh_token" text COLLATE "pg_catalog"."default",
  "access_token" text COLLATE "pg_catalog"."default",
  "access_token_expires" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."accounts" OWNER TO "ewatergate";

-- ----------------------------
-- Records of accounts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_category_id" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "category_type_id" text COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."categories" OWNER TO "ewatergate";

-- ----------------------------
-- Records of categories
-- ----------------------------
BEGIN;
INSERT INTO "public"."categories" VALUES ('90bb4a8c-188d-493c-b40c-fe044be87d8a', 'Industry', 'e0de7314-62df-4fc5-a6d6-d6ea9c58cc93', '2021-01-07 16:06:18.655', '2021-01-07 16:06:18.655', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('717a8a61-d7be-4bcb-be53-24e53286e1b8', 'Institution', 'e0de7314-62df-4fc5-a6d6-d6ea9c58cc93', '2021-01-07 16:06:49.68', '2021-01-07 16:06:49.68', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('9e92508a-ac57-4eba-b79d-438cb63db401', 'Agriculture', 'e0de7314-62df-4fc5-a6d6-d6ea9c58cc93', '2021-01-07 16:06:58.376', '2021-01-07 16:06:58.376', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('e3582ece-688d-4fc1-a642-fe1e9c9cf566', 'Domestic/Residential', 'e0de7314-62df-4fc5-a6d6-d6ea9c58cc93', '2021-01-07 16:07:21.259', '2021-01-07 16:07:21.259', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('1cd50d8a-11e3-4d44-8246-22bb34b9ad72', 'Municipal water supply', 'af4d9dfc-9c37-4bc8-b903-d7eae0f2c6bd', '2021-01-07 18:35:08.576', '2021-01-07 18:35:08.576', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('362c466d-604c-4fef-8e03-ad30eb1e4d6c', 'Wastewater treatment', 'af4d9dfc-9c37-4bc8-b903-d7eae0f2c6bd', '2021-01-07 18:35:25.755', '2021-01-07 18:35:25.755', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('91356125-7df3-4107-a060-16aaca2fad41', 'Mineral water supply', 'af4d9dfc-9c37-4bc8-b903-d7eae0f2c6bd', '2021-01-07 18:35:43.36', '2021-01-07 18:35:43.36', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('49a4a6cc-a1dd-4239-9789-2a1b41c244ae', 'Waste to resource facility', 'af4d9dfc-9c37-4bc8-b903-d7eae0f2c6bd', '2021-01-07 18:36:01.41', '2021-01-07 18:36:01.41', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('0bc1d09f-732a-4b2e-a602-00ede44baf6c', 'Lecturer / researcher', '99b18e1a-03c4-4052-a4ce-788e9e82092c', '2021-01-07 18:37:09.055', '2021-01-07 18:37:09.055', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('9df28056-c73e-4e2c-8fa5-3e4b327418f4', 'Student', '99b18e1a-03c4-4052-a4ce-788e9e82092c', '2021-01-07 18:37:28.512', '2021-01-07 18:37:28.512', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('f7b7fe4a-83bc-4232-99c1-2a4b40a42b4c', 'Blog / Journal', '99b18e1a-03c4-4052-a4ce-788e9e82092c', '2021-01-07 18:37:44.289', '2021-01-07 18:37:44.289', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('30bfab83-599e-4cff-8a7c-b207509f8cc0', 'Technology supply', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:38:24.156', '2021-01-07 18:38:24.156', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('a0b219df-1fe7-495a-876b-2a74169a7894', 'Mineral water vendor', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:38:38.825', '2021-01-07 18:38:38.825', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('cd004d49-1cb9-4ec1-9a49-063aadc2acb8', 'Plumbing services', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:38:50.761', '2021-01-07 18:38:50.761', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('671ef5d0-0c21-43af-9eb7-5862ad55164d', 'Water analysis lab', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:39:42.868', '2021-01-07 18:39:42.868', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('24342f17-07e9-47a2-ac6b-32b535d6bde8', 'Sanitation service', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:40:03.806', '2021-01-07 18:40:03.806', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('f55f08f8-751d-4c00-93a8-92044aa398ca', 'Drilling (Borehole, etc)', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:40:28.049', '2021-01-07 18:40:28.049', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('3337ec5f-1694-48d4-9a1d-f5b8c47deda9', 'Chemical supply', '9e637478-11d5-4624-995b-f9a9e379a926', '2021-01-07 18:40:44.622', '2021-01-07 18:40:44.622', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('02ca75c9-470e-4d7d-b6a7-e9233340b20e', 'Funding Agency', 'c45d82e7-3806-4a53-a68b-34369d734609', '2021-01-07 18:42:02.152', '2021-01-07 18:42:02.152', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('7da059b6-5ee3-4104-a335-f168fef95132', 'NGO', 'c45d82e7-3806-4a53-a68b-34369d734609', '2021-01-07 18:42:07.87', '2021-01-07 18:42:07.87', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('75059d6e-15d5-4506-a104-899ba834b199', 'Incubator', 'c45d82e7-3806-4a53-a68b-34369d734609', '2021-01-07 18:42:20.137', '2021-01-07 18:42:20.137', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('95370378-e174-4fff-ad1f-556f0cdd2260', 'Association', 'c45d82e7-3806-4a53-a68b-34369d734609', '2021-01-07 18:42:38.763', '2021-01-07 18:42:38.763', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('c8d71f97-a1a2-45cd-836b-248236d76565', 'Research institution', 'c45d82e7-3806-4a53-a68b-34369d734609', '2021-01-07 18:43:04.797', '2021-01-07 18:43:04.797', '7271f5b6-b944-40d9-9577-9231db3f23e8');
INSERT INTO "public"."categories" VALUES ('5f7d8c6e-bf3f-49bd-a33f-00a0d26f509f', 'Portable water ', NULL, '2021-01-07 18:44:18.862', '2021-01-07 18:44:18.862', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('442dc643-d6e6-4f3a-afaa-31f85735b152', 'Waste to resource', NULL, '2021-01-07 18:44:27.669', '2021-01-07 18:44:27.669', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('57a6d1b7-d6d0-40d2-a96a-b3c6e1f01201', 'Storm water', NULL, '2021-01-07 18:44:41.13', '2021-01-07 18:44:41.13', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('aff1de48-80d5-4e39-b5db-ef5ca5dbfaa9', 'Water hygiene and sanitation', NULL, '2021-01-07 18:45:00.875', '2021-01-07 18:45:00.875', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('63006d22-9d1c-4101-a56f-cc3e26672e6a', 'Irrigation water', NULL, '2021-01-07 18:45:19.256', '2021-01-07 18:45:19.256', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('551f80db-c329-484a-9f19-7afd905e455d', 'Aquaculture water', NULL, '2021-01-07 18:45:27.212', '2021-01-07 18:45:27.212', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('3d85fb6d-3ad4-493f-bebd-050c7f8a0717', 'Ground water', NULL, '2021-01-07 18:45:38.909', '2021-01-07 18:45:38.909', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('a6bac7ac-fbec-4355-aa01-6fbe7bfb273d', 'Water security', NULL, '2021-01-07 18:45:48.155', '2021-01-07 18:45:48.155', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('0d956cfe-adab-471b-a69b-db5138a381b9', 'Industrial water', NULL, '2021-01-07 18:46:10.038', '2021-01-07 18:46:10.038', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
INSERT INTO "public"."categories" VALUES ('8302577d-34b5-49d0-960e-f8641e837c89', 'Waste water', NULL, '2021-01-07 18:46:15.806', '2021-01-07 18:46:15.806', '2d94e10d-d739-414e-9849-6d7d633f9e4c');
COMMIT;

-- ----------------------------
-- Table structure for category_types
-- ----------------------------
DROP TABLE IF EXISTS "public"."category_types";
CREATE TABLE "public"."category_types" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."category_types" OWNER TO "ewatergate";
COMMENT ON TABLE "public"."category_types" IS 'category types , USER and TECHNICAL';

-- ----------------------------
-- Records of category_types
-- ----------------------------
BEGIN;
INSERT INTO "public"."category_types" VALUES ('7271f5b6-b944-40d9-9577-9231db3f23e8', 'USER');
INSERT INTO "public"."category_types" VALUES ('2d94e10d-d739-414e-9849-6d7d633f9e4c', 'TECHNICAL');
COMMIT;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS "public"."comments";
CREATE TABLE "public"."comments" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "text" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "parent_comment_id" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "postId" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."comments" OWNER TO "ewatergate";

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS "public"."groups";
CREATE TABLE "public"."groups" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."groups" OWNER TO "ewatergate";

-- ----------------------------
-- Records of groups
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS "public"."images";
CREATE TABLE "public"."images" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "link" text COLLATE "pg_catalog"."default" NOT NULL,
  "post_id" text COLLATE "pg_catalog"."default",
  "group_id" text COLLATE "pg_catalog"."default",
  "page_id" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."images" OWNER TO "ewatergate";

-- ----------------------------
-- Records of images
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS "public"."likes";
CREATE TABLE "public"."likes" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "post_id" text COLLATE "pg_catalog"."default",
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "comment_id" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."likes" OWNER TO "ewatergate";

-- ----------------------------
-- Records of likes
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS "public"."pages";
CREATE TABLE "public"."pages" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."pages" OWNER TO "ewatergate";

-- ----------------------------
-- Records of pages
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS "public"."posts";
CREATE TABLE "public"."posts" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "title" text COLLATE "pg_catalog"."default",
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."posts" OWNER TO "ewatergate";

-- ----------------------------
-- Records of posts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS "public"."sessions";
CREATE TABLE "public"."sessions" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "expires" timestamp(3) NOT NULL,
  "session_token" text COLLATE "pg_catalog"."default" NOT NULL,
  "access_token" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."sessions" OWNER TO "ewatergate";

-- ----------------------------
-- Records of sessions
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for shares
-- ----------------------------
DROP TABLE IF EXISTS "public"."shares";
CREATE TABLE "public"."shares" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "post_id" text COLLATE "pg_catalog"."default",
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."shares" OWNER TO "ewatergate";

-- ----------------------------
-- Records of shares
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_categories";
CREATE TABLE "public"."user_categories" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."user_categories" OWNER TO "ewatergate";

-- ----------------------------
-- Records of user_categories
-- ----------------------------
BEGIN;
INSERT INTO "public"."user_categories" VALUES ('e0de7314-62df-4fc5-a6d6-d6ea9c58cc93', 'Water consumer', '2021-01-07 15:24:39.089', '2021-01-07 15:24:39.089');
INSERT INTO "public"."user_categories" VALUES ('af4d9dfc-9c37-4bc8-b903-d7eae0f2c6bd', 'Water Utility', '2021-01-07 15:25:13.62', '2021-01-07 15:25:13.62');
INSERT INTO "public"."user_categories" VALUES ('99b18e1a-03c4-4052-a4ce-788e9e82092c', 'Academia / Media', '2021-01-07 15:31:19.87', '2021-01-07 15:31:19.87');
INSERT INTO "public"."user_categories" VALUES ('9e637478-11d5-4624-995b-f9a9e379a926', 'Water dealer', '2021-01-07 15:32:14.177', '2021-01-07 15:32:14.177');
INSERT INTO "public"."user_categories" VALUES ('c45d82e7-3806-4a53-a68b-34369d734609', 'Organization', '2021-01-07 15:33:35.673', '2021-01-07 15:33:35.673');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default",
  "firstname" text COLLATE "pg_catalog"."default",
  "lastname" text COLLATE "pg_catalog"."default",
  "password" text COLLATE "pg_catalog"."default",
  "email" text COLLATE "pg_catalog"."default",
  "email_verified" timestamp(3),
  "image" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "city" text COLLATE "pg_catalog"."default",
  "country" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."users" OWNER TO "ewatergate";

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for verification_requests
-- ----------------------------
DROP TABLE IF EXISTS "public"."verification_requests";
CREATE TABLE "public"."verification_requests" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "identifier" text COLLATE "pg_catalog"."default" NOT NULL,
  "token" text COLLATE "pg_catalog"."default" NOT NULL,
  "expires" timestamp(3) NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."verification_requests" OWNER TO "ewatergate";

-- ----------------------------
-- Records of verification_requests
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for videos
-- ----------------------------
DROP TABLE IF EXISTS "public"."videos";
CREATE TABLE "public"."videos" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "link" text COLLATE "pg_catalog"."default" NOT NULL,
  "post_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "public"."videos" OWNER TO "ewatergate";

-- ----------------------------
-- Records of videos
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Function structure for armor
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."armor"(bytea);
CREATE OR REPLACE FUNCTION "public"."armor"(bytea)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pg_armor'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."armor"(bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for armor
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."armor"(bytea, _text, _text);
CREATE OR REPLACE FUNCTION "public"."armor"(bytea, _text, _text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pg_armor'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."armor"(bytea, _text, _text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for crypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."crypt"(text, text);
CREATE OR REPLACE FUNCTION "public"."crypt"(text, text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pg_crypt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."crypt"(text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for dearmor
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."dearmor"(text);
CREATE OR REPLACE FUNCTION "public"."dearmor"(text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_dearmor'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."dearmor"(text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."decrypt"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."decrypt"(bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_decrypt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."decrypt"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for decrypt_iv
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."decrypt_iv"(bytea, bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."decrypt_iv"(bytea, bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_decrypt_iv'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."decrypt_iv"(bytea, bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for digest
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."digest"(bytea, text);
CREATE OR REPLACE FUNCTION "public"."digest"(bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_digest'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."digest"(bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for digest
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."digest"(text, text);
CREATE OR REPLACE FUNCTION "public"."digest"(text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_digest'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."digest"(text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for encrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."encrypt"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."encrypt"(bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_encrypt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."encrypt"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for encrypt_iv
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."encrypt_iv"(bytea, bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."encrypt_iv"(bytea, bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_encrypt_iv'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."encrypt_iv"(bytea, bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for gen_random_bytes
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gen_random_bytes"(int4);
CREATE OR REPLACE FUNCTION "public"."gen_random_bytes"(int4)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_random_bytes'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."gen_random_bytes"(int4) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for gen_random_uuid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gen_random_uuid"();
CREATE OR REPLACE FUNCTION "public"."gen_random_uuid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/pgcrypto', 'pg_random_uuid'
  LANGUAGE c VOLATILE
  COST 1;
ALTER FUNCTION "public"."gen_random_uuid"() OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for gen_salt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gen_salt"(text, int4);
CREATE OR REPLACE FUNCTION "public"."gen_salt"(text, int4)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pg_gen_salt_rounds'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."gen_salt"(text, int4) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for gen_salt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gen_salt"(text);
CREATE OR REPLACE FUNCTION "public"."gen_salt"(text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pg_gen_salt'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."gen_salt"(text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for hmac
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hmac"(text, text, text);
CREATE OR REPLACE FUNCTION "public"."hmac"(text, text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_hmac'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."hmac"(text, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for hmac
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hmac"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."hmac"(bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pg_hmac'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."hmac"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_armor_headers
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_armor_headers"(text, OUT "key" text, OUT "value" text);
CREATE OR REPLACE FUNCTION "public"."pgp_armor_headers"(IN text, OUT "key" text, OUT "value" text)
  RETURNS SETOF "pg_catalog"."record" AS '$libdir/pgcrypto', 'pgp_armor_headers'
  LANGUAGE c IMMUTABLE STRICT
  COST 1
  ROWS 1000;
ALTER FUNCTION "public"."pgp_armor_headers"(text, OUT "key" text, OUT "value" text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_key_id
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_key_id"(bytea);
CREATE OR REPLACE FUNCTION "public"."pgp_key_id"(bytea)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_key_id_w'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_key_id"(bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea, text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt"(bytea, bytea);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt"(bytea, bytea, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea, text, text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt"(bytea, bytea, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_decrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_decrypt_bytea"(bytea, bytea);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_decrypt_bytea"(bytea, bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_encrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_encrypt"(text, bytea);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_encrypt"(text, bytea)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_encrypt_text'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_encrypt"(text, bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_encrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_encrypt"(text, bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_encrypt"(text, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_encrypt_text'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_encrypt"(text, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_encrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_encrypt_bytea"(bytea, bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_encrypt_bytea"(bytea, bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_encrypt_bytea'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_encrypt_bytea"(bytea, bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_pub_encrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_pub_encrypt_bytea"(bytea, bytea);
CREATE OR REPLACE FUNCTION "public"."pgp_pub_encrypt_bytea"(bytea, bytea)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_pub_encrypt_bytea'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_pub_encrypt_bytea"(bytea, bytea) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_decrypt"(bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_decrypt"(bytea, text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_sym_decrypt_text'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_decrypt"(bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_decrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_decrypt"(bytea, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_decrypt"(bytea, text, text)
  RETURNS "pg_catalog"."text" AS '$libdir/pgcrypto', 'pgp_sym_decrypt_text'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_decrypt"(bytea, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_decrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_decrypt_bytea"(bytea, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_decrypt_bytea"(bytea, text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_decrypt_bytea'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_decrypt_bytea"(bytea, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_decrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_decrypt_bytea"(bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_decrypt_bytea"(bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_decrypt_bytea'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_decrypt_bytea"(bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_encrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_encrypt"(text, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_encrypt"(text, text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_encrypt_text'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_encrypt"(text, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_encrypt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_encrypt"(text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_encrypt"(text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_encrypt_text'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_encrypt"(text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_encrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_encrypt_bytea"(bytea, text, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_encrypt_bytea"(bytea, text, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_encrypt_bytea'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_encrypt_bytea"(bytea, text, text) OWNER TO "ewatergate";

-- ----------------------------
-- Function structure for pgp_sym_encrypt_bytea
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pgp_sym_encrypt_bytea"(bytea, text);
CREATE OR REPLACE FUNCTION "public"."pgp_sym_encrypt_bytea"(bytea, text)
  RETURNS "pg_catalog"."bytea" AS '$libdir/pgcrypto', 'pgp_sym_encrypt_bytea'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."pgp_sym_encrypt_bytea"(bytea, text) OWNER TO "ewatergate";

-- ----------------------------
-- Primary Key structure for table CategoryOnPosts
-- ----------------------------
ALTER TABLE "public"."CategoryOnPosts" ADD CONSTRAINT "CategoryOnPosts_pkey" PRIMARY KEY ("post_id", "category_id");

-- ----------------------------
-- Primary Key structure for table UserOnCategories
-- ----------------------------
ALTER TABLE "public"."UserOnCategories" ADD CONSTRAINT "UserOnCategories_pkey" PRIMARY KEY ("category_id", "user_id");

-- ----------------------------
-- Primary Key structure for table UserOnGroups
-- ----------------------------
ALTER TABLE "public"."UserOnGroups" ADD CONSTRAINT "UserOnGroups_pkey" PRIMARY KEY ("group_id", "user_id");

-- ----------------------------
-- Primary Key structure for table UserOnPages
-- ----------------------------
ALTER TABLE "public"."UserOnPages" ADD CONSTRAINT "UserOnPages_pkey" PRIMARY KEY ("page_id", "user_id");

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "public"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table accounts
-- ----------------------------
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "public"."accounts" USING btree (
  "compound_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "providerAccountId" ON "public"."accounts" USING btree (
  "provider_account_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "providerId" ON "public"."accounts" USING btree (
  "provider_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "userId" ON "public"."accounts" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table accounts
-- ----------------------------
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table categories
-- ----------------------------
CREATE UNIQUE INDEX "categories.name_unique" ON "public"."categories" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table category_types
-- ----------------------------
ALTER TABLE "public"."category_types" ADD CONSTRAINT "category_types_name_key" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table category_types
-- ----------------------------
ALTER TABLE "public"."category_types" ADD CONSTRAINT "category_types_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table comments
-- ----------------------------
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table groups
-- ----------------------------
CREATE UNIQUE INDEX "groups.name_unique" ON "public"."groups" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table groups
-- ----------------------------
ALTER TABLE "public"."groups" ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table images
-- ----------------------------
ALTER TABLE "public"."images" ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table likes
-- ----------------------------
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table pages
-- ----------------------------
CREATE UNIQUE INDEX "pages.name_unique" ON "public"."pages" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table pages
-- ----------------------------
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table posts
-- ----------------------------
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sessions
-- ----------------------------
CREATE UNIQUE INDEX "sessions.access_token_unique" ON "public"."sessions" USING btree (
  "access_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "sessions.session_token_unique" ON "public"."sessions" USING btree (
  "session_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sessions
-- ----------------------------
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table shares
-- ----------------------------
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_categories
-- ----------------------------
CREATE UNIQUE INDEX "user_categories.name_unique" ON "public"."user_categories" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_categories
-- ----------------------------
ALTER TABLE "public"."user_categories" ADD CONSTRAINT "user_categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE UNIQUE INDEX "users.email_unique" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table verification_requests
-- ----------------------------
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "public"."verification_requests" USING btree (
  "token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table verification_requests
-- ----------------------------
ALTER TABLE "public"."verification_requests" ADD CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table videos
-- ----------------------------
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table CategoryOnPosts
-- ----------------------------
ALTER TABLE "public"."CategoryOnPosts" ADD CONSTRAINT "CategoryOnPosts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."CategoryOnPosts" ADD CONSTRAINT "CategoryOnPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table UserOnCategories
-- ----------------------------
ALTER TABLE "public"."UserOnCategories" ADD CONSTRAINT "UserOnCategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserOnCategories" ADD CONSTRAINT "UserOnCategories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table UserOnGroups
-- ----------------------------
ALTER TABLE "public"."UserOnGroups" ADD CONSTRAINT "UserOnGroups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserOnGroups" ADD CONSTRAINT "UserOnGroups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table UserOnPages
-- ----------------------------
ALTER TABLE "public"."UserOnPages" ADD CONSTRAINT "UserOnPages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."pages" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserOnPages" ADD CONSTRAINT "UserOnPages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "public"."category_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_user_category_id_fkey" FOREIGN KEY ("user_category_id") REFERENCES "public"."user_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table comments
-- ----------------------------
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table images
-- ----------------------------
ALTER TABLE "public"."images" ADD CONSTRAINT "images_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."images" ADD CONSTRAINT "images_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."pages" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."images" ADD CONSTRAINT "images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table likes
-- ----------------------------
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."comments" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table posts
-- ----------------------------
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table shares
-- ----------------------------
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table videos
-- ----------------------------
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
