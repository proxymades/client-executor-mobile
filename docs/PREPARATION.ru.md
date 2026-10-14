# Отчёт подготовки

[English](PREPARATION.md) | [Русский](PREPARATION.ru.md)

Проверено 2026-10-08. Первоначальная подготовка выполнена в исходном репозитории без создания копии. История очищена позднее для новых публичных репозиториев; см. дополнение ниже.

## Проверки

- Пройдены семь тестов Jest: сессии и действия исполнителя.
- Все 179 исходных файлов приложения прошли проверку синтаксиса и локальных импортов.
- Собраны релизные JavaScript bundles Metro для Android и iOS.
- Пройдена целевая функциональная проверка ESLint для авторизации, hooks сохранения и действий исполнителя с исключением общего правила форматирования Prettier. Исходная полная конфигурация lint всё ещё сообщает о форматировании и некоторых существующих проблемах зависимостей hooks.
- Все 44 GraphQL-документа проверены по схеме сервера.
- Нативная iOS-сборка с установленным Xcode и SDK iOS 26.2 остановилась на Yoga.cpp:2232 из-за `-Werror,-Wbitwise-instead-of-logical`. Нативная Android-сборка и сценарии на устройствах не проверены.
- Настоящие скриншоты пока не получены.

Текущие локальные адреса сервисов сохранены в исключённом из Git `config/local.json`. Исходная конфигурация Firebase для Android остаётся на диске и больше не отслеживается. Две прежние правки интерфейса исполнителя включены в коммиты и проверены.

## Изменённые файлы

A – новый отслеживаемый файл; M – изменённый; D – удалённый из Git, при этом локальные настройки и файлы учётных данных сохранены. Миграции с отметкой A уже находились на диске и были добавлены в отслеживание.

| Статус | Путь |
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

## Дополнение об очистке истории – 2026-10-08

Пользователь выбрал сохранение и очистку локальной истории и публикацию в новых репозиториях, оставив прежние приватные репозитории без изменений. Новые имена используют дефисы: `client-executor-mobile` и `client-executor-server`.

`git-filter-repo` 2.47.0 удалил пути приватных и конфигурационных файлов и заменил два прежних секрета в исторических файлах и сообщениях коммитов. Fetch или push в прежние репозитории не выполнялись. Сохранены все 29 коммитов приложения и 27 коммитов сервера, существовавшие до очистки. Для новых репозиториев используется ветка `main`.

Контрольные суммы подтвердили, что перезапись не изменила ни одного текущего отслеживаемого рабочего файла. Полный аудит сохранённых объектов проверил 711 blobs/коммитов приложения и 153 blobs/коммитов сервера после очистки, включая недостижимые объекты. Известных удалённых секретов или дополнительных признаков приватных ключей и токенов не осталось. Исключённые из Git локальные настройки и файлы учётных данных сохранены.

Обновление для публикации меняет отслеживаемые файлы `README.md`, `PUBLISHING.md`, `docs/PREPARATION.md`, `scripts/check-public-files.js`, а на сервере также `scripts/check.js`. Проверка истории теперь анализирует все достижимые файловые blobs. Сервер распознаёт новое имя соседней папки приложения и сохраняет поддержку исходной локальной структуры.

## Обновление подачи проекта – 2026-10-08

Владелец планирует развивать проект с открытым исходным кодом, который люди смогут запускать, тестировать, обсуждать и дорабатывать. Прежнее описание как архива или проекта только для портфолио было неверным предположением и удалено из текущего README. Технические ограничения проверок оставлены явно. Ссылки README, инструкции для участников и шаблоны Issues теперь поддерживают вопросы, сообщения об ошибках и предложения функций.

Изменены существующие файлы `README.md`, `PUBLISHING.md`, `docs/PREPARATION.md`. Добавлены `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/question.md`, `.github/ISSUE_TEMPLATE/feature_request.md`. Это обновление документации не меняло поведение приложения или API.

## Документация на двух языках – 2026-10-14

Добавлены полные русские версии README, инструкций для участников, записи о публикации и этого отчёта. В документах есть ссылки `English | Русский`; английский README остаётся главным. Для Issues добавлены отдельные русские шаблоны ошибок, вопросов и предложений. В приложении также переведён список нужных скриншотов. Команды, параметры и ограничения проверки сохранены в обеих версиях.
