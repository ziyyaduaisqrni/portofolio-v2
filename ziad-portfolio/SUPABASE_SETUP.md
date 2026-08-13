# Supabase setup

This portfolio is already wired to Supabase through `src/lib/supabase.ts`.

## 1. Keep your existing `.env`

Your local project already has the Supabase URL and publishable/anon key. Do not commit `.env` to GitHub.

Use `.env.example` as the template for another machine.

## 2. Create the database and storage policies

Open Supabase Dashboard → SQL Editor and run:

`supabase/schema.sql`

If your Supabase project already contains an older `projects` / `certificates` schema using names such as `Title`, `Description`, `Img`, `TechStack`, `Features`, `Link`, or `Github`, run `supabase/legacy_migration.sql` after reviewing it.

## 3. Create an admin account

Supabase Dashboard → Authentication → Users → Add user.

Create the email/password account you will use for `/admin`.

The `/admin` route is protected by Supabase Auth. Public visitors can read projects/certificates, but only authenticated users can manage rows and upload/delete portfolio images.

## 4. Run the app

```bash
npm install
npm run dev
```

Open `/admin`, sign in with the Supabase Auth account, then use **Add Project** or **Add Certificate**.

Images are uploaded to the `projects` and `certificates` Storage buckets, while their public URLs are saved in PostgreSQL.
