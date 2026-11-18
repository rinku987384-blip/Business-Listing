# Nearwise — Local Business Discovery

A responsive React + Vite local business directory with Home, Businesses, Business Details, Login, Signup, User Dashboard, Add Business, and Admin Panel views. Includes category/location search, saved listings, demo registration, business submission/review, and sample listings including ABC Restaurant (Delhi) and XYZ Web Solutions (Greater Noida).

## Start locally

Install dependencies with `npm install`, then run `npm run dev` and open the local address printed by Vite.

## Build

Run `npm run build` to create a production build in `dist/`.

## Deploy to GitHub Pages

The `Deploy to GitHub Pages` workflow builds and publishes the site when changes are pushed to `main`.
In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
After the first successful workflow run, the site will be available at
[`https://rinku987384-blip.github.io/Business-Listing/`](https://rinku987384-blip.github.io/Business-Listing/).

## Supabase database setup

The initial PostgreSQL schema, indexes, starter categories, auth profile trigger, and Row Level Security policies are in
[`supabase/migrations/20261002150000_initial_business_directory.sql`](./supabase/migrations/20261002150000_initial_business_directory.sql).

To install it in the Supabase project:

1. Open the project's **SQL Editor**.
2. Open the migration file above, copy its full contents, and run it in the SQL Editor.
3. To promote an account to admin, first sign up in the app, then run this in the SQL Editor after replacing the email:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'admin@example.com';
   ```

The migration creates the database structure and access policies; it does not yet replace the app's local-storage/demo data flow with Supabase API calls. Supabase Auth is expected to own passwords; `profiles` is automatically populated when an Auth user is created.

## Notes

Listings and prototype account data are stored in this browser's local storage. Replace this demo storage with an API/database and add secure authentication/authorization before production use.
