# Preparation record

Verified on 2026-10-08. Work was performed in the original repository, without creating a copy or rewriting Git history. No commits were pushed.

## Validation

- Seven Jest tests passed: session handling and contractor actions.
- All 179 application source files passed syntax and local-import checks.
- Android and iOS Metro release JavaScript bundles were generated.
- Targeted functional ESLint passed for the authentication, save hooks and contractor actions with the repository-wide Prettier formatting rule excluded. The original full lint configuration still reports formatting and other legacy hook-dependency issues.
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
