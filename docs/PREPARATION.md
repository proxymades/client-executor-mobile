# Preparation record

Verified on 2026-10-08. Initial preparation was performed in the original repository without creating a copy. History was cleaned later for the new publication repositories; see the update below.

## Validation

- Seven Jest tests passed: session handling and contractor actions.
- All 179 application source files passed syntax and local-import checks.
- Android and iOS Metro release JavaScript bundles were generated.
- Targeted functional ESLint passed for the authentication, save hooks and contractor actions with the repository-wide Prettier formatting rule excluded. The original full lint configuration still reports formatting and other existing hook-dependency issues.
- All 44 GraphQL documents were validated against the companion server schema.
- Native iOS compilation failed with the installed Xcode/iOS 26.2 SDK at Yoga.cpp:2232, due to `-Werror,-Wbitwise-instead-of-logical`. Android native compilation and device flows were not verified.
- Native screenshots remain pending.

Existing local endpoint values were preserved in ignored `config/local.json`. The original Firebase Android configuration remains on disk and is no longer tracked. The two earlier contractor UI changes were included and tested.

## Changed files

A = new tracked file; M = modified; D = removed from Git (local configuration and credential files are preserved). Existing generated migrations marked A were already on disk and are newly tracked.

| Status | Path |
| --- | --- |
| M | `.gitignore` |
| M | `App.js` |
| A | `LICENSE` |
| A | `PUBLISHING.md` |
| A | `README.md` |
| A | `__tests__/executor-order.test.js` |
| A | `__tests__/session.test.js` |
| D | `android/app/google-services.json` |
| A | `config/default.json` |
| A | `config/local.example.json` |
| A | `docs/PREPARATION.md` |
| A | `docs/screenshots/README.md` |
| M | `index.js` |
| M | `package-lock.json` |
| M | `package.json` |
| A | `scripts/check-public-files.js` |
| A | `scripts/check.js` |
| A | `scripts/configure.js` |
| M | `src/components/Common/Modals/Forms/OrderExecutorMenuForm.js` |
| M | `src/components/Common/Settings/Settings.js` |
| M | `src/components/client/ClientOrder/CreateOrder.js` |
| M | `src/components/client/ClientOrder/EditOrder.js` |
| M | `src/components/executor/ExecutorOrder/ExecutorOrder.js` |
| M | `src/hooks/mutation/auth/useDeleteClientNotificationToken.js` |
| M | `src/hooks/mutation/auth/useDeleteExecutorNotificationToken.js` |
| M | `src/hooks/mutation/auth/useLogin.js` |
| M | `src/hooks/mutation/auth/useRegisterClientNotificationToken.js` |
| M | `src/hooks/mutation/auth/useRegisterExecutorNotificationToken.js` |
| M | `src/hooks/mutation/auth/useSignup.js` |
| M | `src/hooks/mutation/client/order/useCreateOrder.js` |
| M | `src/hooks/mutation/client/order/useUpdateOrder.js` |
| M | `src/hooks/query/executor/feed/useExecutorFeed.js` |
| A | `src/utils/session.js` |
| M | `src/utils/uri.js` |

## History cleanup update – 2026-10-08

The user chose to preserve and clean local history and publish to new repositories, leaving the old private repositories unchanged. The new names use hyphens: `client-executor-mobile` and `client-executor-server`.

`git-filter-repo` 2.47.0 removed private/configuration paths and replaced the two old secret values throughout historical file contents and commit messages. No fetch or push to the old repositories was performed. All 29 mobile commits and 27 server commits that existed before cleanup were preserved. The branch is `main` for the new repositories.

Checksums confirmed that the rewrite changed none of the current tracked working files. A full stored-object audit inspected 711 mobile blobs/commits and 153 server blobs/commits after cleanup, including unreachable objects. No known removed secret values or additional private-key/token indicators remained. Local ignored configuration and credential files were preserved.

The publication update changes these tracked files: `README.md`, `PUBLISHING.md`, `docs/PREPARATION.md`, `scripts/check-public-files.js`, and on the server `scripts/check.js`. The historical check now inspects all reachable file blobs. The server recognizes the new companion folder name while retaining support for the original local layout.

## Project presentation update – 2026-10-08

The owner intends this to be an open source project that people can run, test, discuss and contribute to. The earlier archive/portfolio description was an incorrect assumption and was removed from the current README. Technical verification limits remain explicit. README links, contribution guidance and issue templates now support questions, bug reports and feature proposals.

Changed existing files: `README.md`, `PUBLISHING.md`, `docs/PREPARATION.md`. New files: `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/question.md`, `.github/ISSUE_TEMPLATE/feature_request.md`. Application and API behavior were not changed by this documentation update.
