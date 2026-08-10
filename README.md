# Chefferie des Anghal

Official digital platform for the Anghal Chiefdom in Ituri, DRC. The Next.js application includes public heritage and community pages, an OpenStreetMap view, MongoDB-backed chief records, and a role-protected administration area.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and replace every placeholder.
3. Start the development server with `npm run dev`.
4. Open `http://localhost:3000`.

`MONGODB_URI` and `AUTH_SECRET` are required at runtime. Initial seed credentials must be provided through `INITIAL_ADMIN_EMAIL` and an `INITIAL_ADMIN_PASSWORD` of at least 12 characters; no default administrator password is embedded in the code.

## Quality checks

- `npm run lint` checks application and configuration source files.
- `npm run typecheck` runs strict TypeScript validation.
- `npm run build` creates the production build.

Chief write endpoints require an authenticated CMS role. New API fields should be added to the Zod schemas in `lib/chiefs.ts` instead of accepting raw request objects.
