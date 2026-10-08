# Client Executor Mobile – CLEX

An open source React Native application for matching customers with contractors in printing, promotional products and outdoor advertising.

Customers publish orders and compare offers. Contractors browse orders by city and category, propose a price and receive notifications. Customers select a contractor, accept or reject the work and exchange reviews after completion.

The project is open for testing, questions and contributions. Try the customer and contractor flows, report setup problems, and suggest improvements through [Issues](https://github.com/proxymades/client-executor-mobile/issues). See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get involved.

## Features

- Separate customer and contractor navigation.
- Orders with photos, quantities, categories, city filters and urgency.
- Offers, contractor selection, cancellation and completion.
- Profiles, avatars and mutual ratings.
- Russian and English interfaces; light and dark themes.
- Firebase Cloud Messaging; local session storage with MMKV.

## Architecture

```mermaid
flowchart LR
    Customer[Customer] --> App[React Native app]
    Contractor[Contractor] --> App
    App --> API[GraphQL API]
    API --> Prisma[Prisma]
    Prisma --> DB[(MySQL)]
    App --> Images[Static image server]
    API --> Assets[(Image files)]
    Images --> Assets
    API --> FCM[Firebase Cloud Messaging]
    FCM --> App
```

The backend is maintained in [client-executor-server](https://github.com/proxymades/client-executor-server). Place `client-executor-mobile` and `client-executor-server` next to each other for local development; the backend can then validate all mobile GraphQL documents with `npm run check`.

## Stack and prerequisites

React Native 0.68.2, React 17, Apollo Client 3.6, React Navigation 6 and React Native Firebase 14.11.

JavaScript checks and Metro bundles have been verified with Node.js 22.21.1 and npm 10.9.4. The Android configuration targets SDK 31. Native toolchain compatibility is being improved; see the current verification status below.

## Local setup

Clone both repositories next to each other:

```sh
git clone https://github.com/proxymades/client-executor-mobile.git
git clone https://github.com/proxymades/client-executor-server.git
cd client-executor-mobile
```

1. Start the companion GraphQL server on port 4000 and image server on port 5001. See its README for MySQL setup and optional demo accounts.
2. Install dependencies:

   ```sh
   npm ci
   npm run configure
   ```

   `configure` creates an ignored `config/local.json` if it is missing. It never overwrites an existing configuration.

3. Configure your own Firebase application for bundle/application ID `kz.clex`:
   - Android: download `google-services.json` to `android/app/`.
   - iOS: download `GoogleService-Info.plist`, add it to the `clex` target in Xcode and initialize Firebase in `AppDelegate` according to React Native Firebase 14 setup instructions. iOS Firebase setup and native push delivery still need device validation.
   - These project-specific files are excluded from Git. Server push delivery can be disabled independently with `FIREBASE_ENABLED=false`.
4. For a physical device, copy `config/local.example.json` to `config/local.json` and replace the example IP with the server computer's LAN address. For emulators, leave the file as `{}`: Android uses `10.0.2.2`, iOS uses `localhost`.
5. Start Metro with `npm start`; run `npm run android` or configure CocoaPods and run `npm run ios` with a compatible native toolchain.

For physical iOS devices, use HTTPS endpoints; the original ATS exception allows HTTP only for localhost. Android's debug manifest permits local HTTP. Release builds need HTTPS and their own signing configuration; the current release configuration uses the debug keystore.

Endpoint configuration lives in `config/default.json` with local overrides in `config/local.json`. It contains public URLs only, never server credentials.

## Checks

```sh
npm run check
npm test -- --runInBand --watchman=false
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /tmp/clex-android.bundle --assets-dest /tmp/clex-android-assets
```

`check` parses the application, resolves local imports and validates endpoint URLs. Seven tests cover malformed/expired tokens, login state, logout, primary contractor actions and recovery from failed offers. Metro bundling verifies JavaScript transformation and dependency resolution; it does not prove native compilation or device behavior.

The server requires expiring JWTs. Sessions last seven days; old tokens without expiry require signing in again. Firebase token registration failures do not prevent login.

## Screenshots and validation status

Real screenshots will be added after a native device or simulator run. See [the capture checklist](docs/screenshots/README.md).

Android and iOS JavaScript bundles, session tests and all 44 GraphQL documents have been checked. Native builds, camera/photo permissions, FCM delivery and the complete two-account flow still require device validation. Password recovery, phone ownership verification, account deletion and several settings actions are not implemented. API rate limits and production operations also need further work.

Native iOS compilation with the installed Xcode/iOS 26.2 SDK currently fails in Yoga.cpp:2232 (`-Werror,-Wbitwise-instead-of-logical`). Native Android compilation has not yet been verified. These are open development tasks; JavaScript checks alone do not establish a supported native environment.

## Next development priorities

- Verify a reproducible Android build and the complete customer/contractor flow.
- Fix compatibility with current Xcode and verify the iOS build.
- Add real screenshots and a demo build after device validation.
- Make first-time setup easier and validate push notifications.

Questions, bug reports and pull requests are welcome. If setup fails, open an issue with your platform, toolchain versions, command and redacted error output.

## Publication

The Git history was cleaned before publication. [PUBLISHING.md](PUBLISHING.md) records the cleanup and the checks used for future changes.

## License

[ISC](LICENSE). CLEX branding is retained as the original project name.
