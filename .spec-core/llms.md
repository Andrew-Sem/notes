# Руководство для AI-агентов

## Review
- Каждый документ нужно прогонять минимум дважды через `/review`.

## Работа с библиотеками и фреймворками

### На этапе создания Tasks (tasks/*.md)

При создании детальных задач с инструкциями по установке, настройке или использованию библиотек/фреймворков:

1. **ОБЯЗАТЕЛЬНО сверяйся с актуальной официальной документацией** библиотеки/фреймворка
2. **Используй WebSearch** для получения актуальной информации (WebFetch может не работать)
3. **Ищи официальные шаблоны и стартеры** - почти всегда есть готовый шаблон проекта, CLI команда или create-app утилита
4. **Предпочитай шаблоны ручной настройке** - это минимизирует ошибки и следует best practices
5. **Проверяй следующие аспекты**:
   - Официальные шаблоны проектов (create-* команды, CLI generators)
   - Актуальные инструкции по установке (точные команды)
   - Правильная последовательность настройки (шаг за шагом)
   - Требуемые зависимости и peer dependencies
   - Специфические требования для используемого фреймворка/окружения
   - Breaking changes в новых версиях
   - Best practices и рекомендации от разработчиков

**⚠️ ВАЖНО**:
- Документация библиотек часто меняется, поэтому полагаться только на общие знания недостаточно
- Всегда проверяй актуальную информацию для конкретной версии
- Используй официальные CLI и шаблоны вместо ручной настройки где возможно

### На этапе создания Plan (plan.md)

**НЕ требуется** проверять документацию - достаточно общего понимания стека. План должен содержать высокоуровневые deliverables без детальных команд установки.

## Spec Files Reference

### `prd.md` — Product Requirements Document
**Содержит**: бизнес-контекст, цели, функциональные требования, user stories

**Используй для**:
- Понимания WHAT и WHY проекта
- Списка фич и приоритетов
- Определения scope и MVP
- Верхнеуровневой структуры: что инициализировать, какие основные модули создать

---

### `ui-ux.md` — UI/UX Specification
**Содержит**: user flows, компоненты, взаимодействия, навигация

**Используй для**:
- Планирования frontend milestones
- Определения компонентов и экранов (deliverables)
- Понимания пользовательских сценариев (для DoD)

---

### `tech.md` — Technical Architecture
**Содержит**: архитектура, стек, data models, API контракты, интеграции, зависимости

**Используй для**:
- Планирования backend/infrastructure milestones
- Data layer (таблицы, схемы, индексы)
- API endpoints и функции
- Интеграций с внешними сервисами
- Environment variables и конфигурации

---

### `testing.md` — Testing Strategy
**Содержит**: требования к тестированию, coverage, типы тестов

**Используй для**:
- Формулирования DoD критериев
- Понимания что должно быть testable
- Определения testing deliverables

---

### `devops.md` — DevOps & Deployment
**Содержит**: CI/CD, deployment процесс, окружения, мониторинг

**Используй для**:
- Infrastructure milestones
- Setup CI/CD deliverables
- Environment configuration
- Deployment steps в DoD

---

## В случае возникновения неясностей
- Проставляй пометки в формате `[NEED CLARIFICATION: <context>]`, где `<context>` описывает, что именно требует пояснения и почему.

## Comments
- Пояснения, например: `[общая информация по проекту]`
- Требуемые изменения, например: `[NEED CLARIFICATION: неясно какой именно способ авторизации использовать, OAuth или SSO]`

## Правила id
- ID нужны для кросс-док ссылок и трассировки. Используй верхний регистр, префикс + `-` + трёхзначный номер (`001`, `002`, …). Не пропускай цифры без причины.
- Префиксы по сущностям:

| Сущность | Где встречается | Формат |
| --- | --- | --- |
| Task | `task.md` (шапка) | `TASK-001` |
| Capability | `task.md` (Capability) | `CAP-001` |
| Error | `task.md` (Errors) | `ERR-001` |
| Feature | `prd.md`, `plan.md`, `task.md` | `FEAT-001` |
| User Story | `prd.md` (User Stories) | `STORY-001` |
| Feature Requirement | `prd.md` (Feature Requirements) | `REQ-001` |
| Acceptance Criterion | `prd.md` (Acceptance criteria) | `AC-001` |
| Feature-level NFR | `prd.md` (Нефункциональные требования) | `NFR-001` |
| Risk | `prd.md`, `plan.md`, `task.md`, `tech.md`, `devops.md` | `RISK-001` |
| Schema object | `tech.md` (Schemas), `plan.md` (schema ref), `task.md` (schemas) | `SCHEMA-001` *(для уточнения типа добавь сегмент: `SCHEMA-DB-001`, `SCHEMA-STORE-001`)* |
| API / endpoint | `tech.md` (Api contracts), `plan.md` (public api map), `task.md` (contracts) | `API-001` |
| Internal contract | `plan.md` (internal contracts) | `CONTRACT-001` |
| Feature flag | `tech.md` (feature flags), `devops.md` (Feature Flags) | `FLAG-001` |
| Frontend submodule | `plan.md` (front → submodules) | `MOD-FE-001` |
| Backend submodule | `plan.md` (backend → submodules) | `MOD-BE-001` |
| Cache/Object-storage/DB submodule | `plan.md` (соответствующие блоки) | `MOD-INFRA-001` |
| Pipeline | `devops.md` (CI/CD pipelines) | `PIPE-001` |
| IaC module | `devops.md` (IaC & Config → modules) | `IAC-001` |
| Service | `devops.md` (Runtime Topology → Services) | `SRV-001` |
| Dashboard | `devops.md` (Observability → Metrics) | `DASH-001` |
| Alert | `devops.md` (Observability → Alerting) | `ALERT-001` |
| Runbook | `devops.md` (Runbooks & Jobs → Runbook) | `RUNBOOK-001` |
| Scheduled job | `devops.md` (Runbooks & Jobs → Jobs) | `JOB-001` |

- Если появляется новая сущность с `id`, добавь её формат в таблицу перед использованием.
- Для секций с `ref` явно указывай ссылку на соответствующий `id` из других документов (например, `ref: FEAT-002`). Если референс временно неизвестен, поставь `[NEED CLARIFICATION]` рядом с полем.

## Нумерация
- Поддерживай корректную нумерацию, если она всё же используется внутри документа.

## Ellipsis
- Многоточие оставлено там, где структура позволяет добавлять новые пункты по контексту.

## Уточнения
- Если необходимой информации нет, ставь `[NEED CLARIFICATION]` и добавляй достаточно контекста, чтобы понять потребность.

## Актуализация
- При добавлении новых данных обновляй связанные элементы. Например, при добавлении фичей в `prd.md` нужно актуализировать диаграмму.

## AI checklist
Стандартный AI checklist (используй в каждом документе ссылкой):

- `[ ]` Уточнений не требуется (нет нечётких формулировок и неясностей), пометки, требующие уточнений, обработаны и удалены.
- `[ ]` Документ согласован со всеми элементами из блока References.
- `[ ]` Последние изменения прогнаны через `/review` > 1 раза; флаг снят перед запуском и выставлен заново через команду `/review`.
