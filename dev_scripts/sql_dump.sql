SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '"public", "extensions"', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "public";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."delete_user"(i integer) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
        begin
                return 0;
        end;
$$;

ALTER FUNCTION "public"."delete_user"(i integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_user"(user_id uuid) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
        begin
                delete from auth.users where id = user_id;
                return 0;
        end;
$$;

ALTER FUNCTION "public"."delete_user"(user_id uuid) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."emp_stamp"() RETURNS trigger
    LANGUAGE "plpgsql"
    AS $$
    BEGIN
      delete from auth.users where id = OLD.id;
      return null;
    END;
$$;

ALTER FUNCTION "public"."emp_stamp"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."func_delete_user"() RETURNS trigger
    LANGUAGE "plpgsql"
    AS $$
  begin
    delete from auth.users where id = 'f617b696-8aad-43fe-a7ea-92efd57c5c0f';
  end;
$$;

ALTER FUNCTION "public"."func_delete_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increment"(i integer) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
        begin
                return 0;
        end;
$$;

ALTER FUNCTION "public"."increment"(i integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."tr_delete_users"() RETURNS trigger
    LANGUAGE "plpgsql"
    AS $$
  begin
    delete from auth.users where email = old.email;
    return null;
  end;
$$;

ALTER FUNCTION "public"."tr_delete_users"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."Kontakte" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    "Name" character varying NOT NULL,
    "Vorname" character varying NOT NULL,
    "Straße" character varying NOT NULL,
    "PLZ" character varying NOT NULL,
    "Ort" character varying NOT NULL,
    "Festnetz" character varying,
    "Mobiltelefon" character varying,
    "E-Mail" character varying,
    "Gewuenschte_Weiterbildung" character varying NOT NULL,
    "Gewuenschter_Starttermin" date,
    "Umfang" character varying,
    "Zustellung_Angebot" character varying NOT NULL,
    "Beratungstermin" timestamp without time zone,
    "Bemerkungen" character varying,
    "Creator" text,
    "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    "Einwilligung" boolean
);

ALTER TABLE "public"."Kontakte" OWNER TO "postgres";

ALTER TABLE "public"."Kontakte" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Kontakte_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "email" text NOT NULL,
    "pending" boolean DEFAULT true NOT NULL,
    "invited" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."Kontakte"
    ADD CONSTRAINT "Kontakte_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("email");

CREATE TRIGGER tr_delete_users AFTER DELETE ON public.profiles FOR EACH ROW EXECUTE FUNCTION tr_delete_users();

CREATE POLICY "Authenticated users can delete users" ON "public"."profiles" FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable full access for authenticated users" ON "public"."Kontakte" TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable insert access for anon users" ON "public"."Kontakte" FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Full access for authenticated users" ON "public"."profiles" TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE "public"."Kontakte" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_user"(i integer) TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"(i integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"(i integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_user"(user_id uuid) TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"(user_id uuid) TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"(user_id uuid) TO "service_role";

GRANT ALL ON FUNCTION "public"."emp_stamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."emp_stamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."emp_stamp"() TO "service_role";

GRANT ALL ON FUNCTION "public"."func_delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."func_delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."func_delete_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."increment"(i integer) TO "anon";
GRANT ALL ON FUNCTION "public"."increment"(i integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment"(i integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."tr_delete_users"() TO "anon";
GRANT ALL ON FUNCTION "public"."tr_delete_users"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."tr_delete_users"() TO "service_role";

GRANT ALL ON TABLE "public"."Kontakte" TO "anon";
GRANT ALL ON TABLE "public"."Kontakte" TO "authenticated";
GRANT ALL ON TABLE "public"."Kontakte" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Kontakte_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Kontakte_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Kontakte_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
