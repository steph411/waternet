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

 Date: 23/01/2021 22:11:55
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
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "comment_id" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."images" OWNER TO "ewatergate";

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
-- Table structure for shares
-- ----------------------------
DROP TABLE IF EXISTS "public"."shares";
CREATE TABLE "public"."shares" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT gen_random_uuid(),
  "post_id" text COLLATE "pg_catalog"."default",
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "comment_id" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."shares" OWNER TO "ewatergate";

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
ALTER TABLE "public"."images" ADD CONSTRAINT "images_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."comments" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
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
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."comments" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table videos
-- ----------------------------
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
