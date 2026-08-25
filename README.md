# LoveLoop

LoveLoop is a private couples space for keeping a relationship close across distance. It combines small daily rituals, shared answers, memories, private messages, invitations, and a lightweight call room in one focused experience.

> **Current status:** LoveLoop is a connected full-stack application running on the Manus web stack. It includes Manus OAuth, cloud-backed couple data, protected tRPC procedures, database migrations, managed file storage, notification records, invite acceptance, shared games, and a local camera/microphone call-room shell.

## Product experience

LoveLoop is designed as a private playground rather than a generic productivity dashboard. The Velvet Orbit visual system uses deep plum surfaces, orbit-rose actions, editorial type, and small shared rituals to make the interface feel intimate and purposeful.

| Area | What it does |
| --- | --- |
| **Today** | Shows the daily loop, streak, Love XP, completed-loop count, activity suggestions, memory highlights, notifications, and private notes. |
| **Onboarding** | Collects names, relationship duration, and relationship style, then persists the couple profile in the cloud. |
| **Partner invites** | Creates a shareable invite URL and accepts invite links for the second partner. |
| **Memory vault** | Uploads photo/video memories to managed storage, prompts for a title, previews the selected file, and renders saved memory metadata. |
| **Private signal** | Sends cloud-backed messages and refreshes the message and notification surface on a short interval. |
| **Date night** | Guides a couple through a four-step date-night ritual with progress and a completion state. |
| **Games** | Starts a shared question session, persists answers, and polls for the partner's answer before revealing both responses. |
| **Love Call** | Opens a private room shell with local camera and microphone preview, controls, and a waiting state for the partner. |

## Technology

LoveLoop uses React 19 and Vite on the client, Express with tRPC 11 on the server, Drizzle ORM with MySQL/TiDB-compatible tables, Manus OAuth for authentication, and managed object storage for uploaded media. Shared types flow from the server router into the React client through the generated `AppRouter` type.

The main project areas are:

```text
client/src/pages/Home.tsx       Main authenticated LoveLoop experience
client/src/index.css            Velvet Orbit visual system and responsive layout
server/routers.ts               Authenticated tRPC procedures
server/db.ts                    Drizzle query and persistence helpers
drizzle/schema.ts               Database schema and domain model
drizzle/*.sql                   Generated additive migrations
server/storage.ts               Managed object-storage helpers
server/*.test.ts                Vitest coverage for auth and route boundaries
.github/workflows/ci.yml        GitHub Actions continuous integration
```

## Requirements

Use Node.js 22 or a compatible current Node.js release, pnpm 10, and a MySQL/TiDB-compatible database for authenticated cloud features. A Manus project provides the OAuth, database, storage, and built-in API environment values used by the server template.

## Local development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jus-Mellow/loveloop.git
cd loveloop
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The development server runs the Express/tRPC backend and Vite client together. Open the URL printed by the server, then use **Sign in to LoveLoop** to complete Manus OAuth before entering the authenticated app.

Useful commands:

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with watch mode. |
| `pnpm check` | Run TypeScript validation without emitting files. |
| `pnpm test` | Run the Vitest suite once. |
| `pnpm build` | Build the Vite client and bundled production server. |
| `pnpm format` | Format the project with Prettier. |
| `pnpm db:push` | Generate and apply Drizzle migrations in an environment configured for database access. |

## Environment configuration

Do not commit `.env` files or credentials. The full-stack Manus template expects these values to be supplied by the hosting environment:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MySQL/TiDB database connection string. |
| `JWT_SECRET` | Session-cookie signing secret. |
| `VITE_APP_ID` | Manus OAuth application identifier. |
| `OAUTH_SERVER_URL` | Manus OAuth service base URL. |
| `VITE_OAUTH_PORTAL_URL` | Browser-facing OAuth login portal. |
| `BUILT_IN_FORGE_API_URL` | Server-side built-in API gateway, including storage and notifications. |
| `BUILT_IN_FORGE_API_KEY` | Server-side authorization for built-in APIs. |
| `VITE_FRONTEND_FORGE_API_URL` | Browser-facing built-in API endpoint when required. |
| `VITE_FRONTEND_FORGE_API_KEY` | Browser-facing built-in API authorization when required. |
| `OWNER_OPEN_ID` / `OWNER_NAME` | Project-owner identity used by the auth scaffold. |

The server reads normalized environment values through `server/_core/env.ts`. Keep secrets in the Manus project settings or your deployment provider's secret store.

## Database workflow

LoveLoop stores identity in `users` and relationship data in domain tables for couples, invites, daily challenges, messages, memories, notifications, and shared game sessions. Business timestamps are stored as UTC-capable database timestamps and formatted for the user's local timezone in the UI.

When changing the schema, update `drizzle/schema.ts`, generate a migration, review the resulting SQL, and apply it through the managed database migration workflow. Add or update helpers in `server/db.ts`, expose the operation through a protected tRPC procedure in `server/routers.ts`, then connect the UI through `client/src/lib/trpc.ts`.

## Authentication and privacy

All couple-facing procedures use the authenticated Manus OAuth session. The client does not manipulate session cookies directly. A user must be signed in before creating a couple, accepting an invite, reading messages, uploading memories, receiving notifications, or starting a shared game. Uploaded media is stored outside the database; the database keeps metadata and storage references.

The current call room intentionally provides the local device preview and room controls without peer signaling. A production WebRTC signaling service is required before remote video can be connected between two browsers.

## Continuous integration

GitHub Actions runs on pushes and pull requests to `main`. The workflow installs dependencies with the repository lockfile, then runs TypeScript validation, Vitest, and the production build:

```text
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

The CI workflow does not run database migrations or require production secrets. Database migrations should be applied separately through the managed deployment environment after reviewing generated SQL.

## Preview and deployment

The current managed LoveLoop preview is available at:

[Open the LoveLoop preview](https://3000-iep56pxzba9iu1cf2bbbw-033d4bdd.us2.manus.computer/)

The preview opens at the OAuth entry screen when no session is present. Complete sign-in to exercise the cloud-backed couple flows. For production, use the Manus project Publish flow or another deployment target that provides the required Node.js runtime, database connection, OAuth configuration, and storage configuration. Never deploy with credentials committed to the repository.

## Known limitations and next improvements

The app currently uses short-interval tRPC refresh for messages and notification counts rather than a persistent socket connection. The Love Call room is a polished local preview shell, but remote peer signaling and WebRTC session coordination are still required for a complete video call. The next practical improvements are two-account authenticated end-to-end tests, persistent realtime transport, richer media metadata and filtering, and expanded question packs for games.

## License

No open-source license has been selected yet. Treat this repository as private project code unless a license is added by the project owner.
