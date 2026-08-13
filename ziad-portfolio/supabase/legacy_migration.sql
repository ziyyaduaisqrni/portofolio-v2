-- Optional migration for an older portfolio schema.
-- Run this ONLY if your existing projects/certificates tables use legacy
-- column names such as Title, Description, Img, TechStack, Features, Link, Github.

DO $$
BEGIN
  IF to_regclass('public.projects') IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Title')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='title') THEN
      ALTER TABLE public.projects RENAME COLUMN "Title" TO title;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Description')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='description') THEN
      ALTER TABLE public.projects RENAME COLUMN "Description" TO description;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Img')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='image_url') THEN
      ALTER TABLE public.projects RENAME COLUMN "Img" TO image_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='TechStack')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='tech_stack') THEN
      ALTER TABLE public.projects RENAME COLUMN "TechStack" TO tech_stack;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Features')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='features') THEN
      ALTER TABLE public.projects RENAME COLUMN "Features" TO features;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Link')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='live_url') THEN
      ALTER TABLE public.projects RENAME COLUMN "Link" TO live_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='Github')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='github_url') THEN
      ALTER TABLE public.projects RENAME COLUMN "Github" TO github_url;
    END IF;
  END IF;
END $$;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_url text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tech_stack text[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS live_url text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS github_url text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

UPDATE public.projects
SET slug = lower(regexp_replace(trim(title), '[^a-zA-Z0-9]+', '-', 'g'))
WHERE (slug IS NULL OR slug = '') AND title IS NOT NULL;

-- If duplicate slugs exist, resolve them manually before adding a unique constraint.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.projects'::regclass AND contype = 'u' AND conname = 'projects_slug_key'
  ) THEN
    BEGIN
      ALTER TABLE public.projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public.certificates') IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='certificates' AND column_name='Img')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='certificates' AND column_name='image') THEN
      ALTER TABLE public.certificates RENAME COLUMN "Img" TO image;
    END IF;
  END IF;
END $$;

ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS title text DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS issuer text DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS issue_date text DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS image text DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS credential_url text DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
