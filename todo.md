# LoveLoop Usable App Upgrade

- [x] Add onboarding flow with name, partner name, relationship duration, and style selection.
- [x] Persist onboarding and app data in localStorage with safe defaults and reset support.
- [x] Add working route/view navigation for Today, Date Night, Memory Vault, and Games.
- [x] Make challenge completion update streak, Love XP, completed count, and activity state.
- [x] Add usable memory creation flow with title, type, date, and image URL/emoji fallback.
- [x] Add usable private chat composer with persisted messages and simulated partner reply.
- [x] Add Date Night flow with step progression and completion state.
- [x] Add Games view with playable lightweight question/game cards.
- [x] Add empty states, loading-free feedback, and responsive mobile behavior.
- [x] Run typecheck/build and verify onboarding plus core interactions in browser.
- [x] Save a new checkpoint and deliver the upgraded app.

## Full-stack upgrade

- [x] Resolve the full-stack scaffold merge conflict while preserving the Velvet Orbit UI.
- [x] Add couple, invite, challenge, message, memory, notification, and game tables to the Drizzle schema.
- [x] Generate and apply the database migration through the managed SQL workflow.
- [x] Add protected tRPC procedures for couple setup, invites, dashboard data, challenge completion, memories, messages, notifications, and games.
- [x] Replace local-only auth/state with Manus OAuth and cloud-backed tRPC queries/mutations.
- [x] Add storage-backed media upload flow and media metadata persistence.
- [x] Add realtime chat/notification refresh and a video-call room interface.
- [x] Build shared-answer game state and playable question progression.
- [x] Add server Vitest coverage for the new procedures and run typecheck/build/tests.
- [x] Save a full-stack checkpoint and deliver the connected LoveLoop app.

## Production-hardening follow-up

- [x] Move couple profile, onboarding, dashboard snapshot, messages, memories, and game state fully to tRPC/database and remove localStorage as the source of truth.
- [x] Build frontend media upload UI that calls media.uploadMemory, previews selected files, handles errors, and renders uploaded memories.
- [x] Provide hosting-compatible near-realtime chat/notification refresh and surface live notification counts in the UI.
- [x] Connect Games UI to games.start and games.answer so shared answers persist and reveal between partners.
- [x] Add baseline Vitest coverage for public auth behavior and protected LoveLoop route boundaries.
- [x] Save a new post-hardening checkpoint and deliver that version.

## Final completeness pass

- [x] Persist onboarding profile fields including name, partner, duration, and style in the database and hydrate the UI from tRPC only.
- [x] Add completed challenge count to couple/dashboard data and display it.
- [x] Add memory upload with a user-entered title prompt, type detection, upload errors, and cloud-backed rendering.
- [x] Add chat empty state and simulated partner reply for local usability.
- [x] Add Date Night step progression and completion state.
- [x] Add shared game answer persistence and partner-sync reveal polling UI.
- [x] Verify the signed-out auth entry in the browser and document authenticated-flow verification as sign-in-dependent.

## No-login validation note

- [x] End-to-end authenticated browser validation is explicitly sign-in-dependent and was documented because this session continued without interactive sign-in.
- [x] Final delivery states that Manus OAuth, database, storage, notifications, partner invites, and realtime/call flows require a signed-in session for live verification.

## Validation record

Anonymous validation completed successfully: `pnpm check`, `pnpm test`, and `pnpm build` all pass, and the dev server starts cleanly. The browser reaches the intended Manus OAuth entry screen without client runtime failures. Authenticated browser exercises remain intentionally pending because the user chose not to sign in during this session. Realtime transport is currently implemented with five-second tRPC refresh rather than a socket channel, and the call room provides local camera/microphone preview plus controls while peer signaling remains a production follow-up.

## GitHub export

- [x] Prepare the current LoveLoop project Git repository and verify no sensitive environment files are staged.
- [x] Create a private GitHub repository named loveloop.
- [x] Push the current LoveLoop code to GitHub and verify the remote repository URL.

## Preview, documentation, and CI

- [x] Preview the current LoveLoop web app and record any visible limitations.
- [x] Replace the starter README with comprehensive setup, architecture, feature, environment, and deployment documentation.
- [x] Add GitHub Actions continuous integration for install, typecheck, tests, and production build.
- [x] Validate the workflow files and local CI commands.
- [x] Commit and push the README and CI updates to the loveloop GitHub repository.
