# Tech Template

## References

- [PRD документ: `prd.md`]
- [UI/UX документ: `ui-ux.md`]
- [Research документ: `research.md`]
- [Testing документ: `testing.md`]
- [DevOps документ: `devops.md`]

## Appendix

### Глоссарий

- **[Term]** — [Definition]
- **[Term]** — [Definition]
- **[Term]** — [Definition]

### LLM resources

- [Link to llms.txt]
- [Link to documentation]

### Other helpful links

- [Repository link]
- [CI/CD dashboard]
- [Monitoring dashboard]

---

## Tech assumptions

> Опишите технические допущения, влияющие на выбор архитектуры и инфраструктуры.

- [Technical assumption 1]
- [Technical assumption 2]
- [Technical assumption 3]

---

## Tech stack

### Applications

> Перечислите все приложения в проекте. Создайте отдельный блок для каждого frontend и backend приложения.

#### [application-name] (frontend/backend)

- **framework**: [Framework name and version]
- **[technology category 1]**: [Technology choice]
- **[technology category 2]**: [Technology choice]
- **[technology category 3]**: [Technology choice]

> Дублируйте секцию для каждого приложения в проекте.

---

## Architecture

### Pattern

> Опишите выбранный архитектурный паттерн и обоснуйте выбор.

- **name**: [Architecture pattern name]
- **description**: [Pattern description]
- **why**: [Reasoning for this choice]

### Data flow

- **[flow type 1]**: [Description]
- **[flow type 2]**: [Description]
- **[flow type 3]**: [Description]

### Infrastructure layout

[детали в `devops.md`]

- [Component 1]: [Technology/Platform]
- [Component 2]: [Technology/Platform]
- [Component 3]: [Technology/Platform]

---

## Stores

### Databases

- **[Database type 1]**: [Technology] ([Purpose/use case])
- **[Database type 2]**: [Technology] ([Purpose/use case])
- **[Database type 3]**: [Technology] ([Purpose/use case])

### Object storage

- **Provider**: [Storage provider]
- **Buckets**:
  - `[bucket-name-1]` — [Purpose]
  - `[bucket-name-2]` — [Purpose]
- **CDN**: [CDN provider]

### Cache

- **Provider**: [Cache provider]
- **Strategy**:
  - [Cache use case 1] (TTL: [duration])
  - [Cache use case 2] (TTL: [duration])
  - [Cache use case 3]

---

## Integrations

### [Integration category 1]

- **Provider**: [Provider name]
- **Features**: [Feature 1], [Feature 2], [Feature 3]
- **[Additional detail]**: [Value]

### [Integration category 2]

- **[Detail 1]**: [Value]
- **[Detail 2]**: [Value]
- **[Detail 3]**: [Value]

> Дублируйте секцию для каждой категории интеграций.

---

## Error tracking

- **Tool**: [Error tracking tool]
- **Scope**: [Scope description]
- **Features**: [Feature 1], [Feature 2], [Feature 3]
- **Alerts**: [Alert configuration]

---

## Analytics

- **Tool**: [Analytics tool]
- **Events**: [Event tracking description]
- **Privacy**: [Privacy considerations]
- **Dashboards**: [Dashboard descriptions]

---

## Testing

[all testing related info in `testing.md`]

---

## Devops

[all devops related info in `devops.md`]

---

## Security

### Способ авторизации

[Description of authorization method]

### authN

[who are you]

- **Supported login methods**: [Method 1], [Method 2], [Method 3]
- **Token/session storage**:
  - [Token type 1]: [Storage method] ([Lifespan])
  - [Token type 2]: [Storage method] ([Lifespan])
- **Lifecycle**:
  - [Lifecycle step 1]
  - [Lifecycle step 2]
  - [Lifecycle step 3]

### authZ

[что тебе можно]

- **Access model**: [Access control model] — [Description]
- **Entity permissions**: [Permission rules]
- **Storage & validation**: [Storage and validation approach]

### Secrets

- **Location**:
  - Development: [Development storage]
  - Production: [Production storage]
- **Access format**: [How secrets are accessed]

### PII / sensitive data

- **Data list**: [Data type 1], [Data type 2], [Data type 3]
- **Storage policy**:
  - [Data type 1]: [Storage/encryption approach]
  - [Data type 2]: [Storage/encryption approach]
  - [Data type 3]: [Storage/encryption approach]

### HTTPS/TLS requirements

- **Minimum version**: [TLS version]
- **Certificate**: [Certificate provider]
- **HSTS**: [HSTS configuration]
- **Mixed content**: [Policy]

### XSS/CSRF protection

- **XSS**:
  - [Protection measure 1]
  - [Protection measure 2]
- **CSRF**:
  - [Protection measure 1]
  - [Protection measure 2]

### Content Security Policy

```
[CSP policy configuration]
```

### API security

- **Request signing**: [Signing method]
- **Replay attack protection**: [Protection approach]
- **Rate limiting**: См. Backend modules → rate limits

### Vulnerability scanning

- **Tools**: [Tool 1], [Tool 2]
- **Frequency**: [Scanning frequency]
- **Process**: [Process description]

---

## Scalability & Resilience

[см. `devops.md`]

- **[Scalability aspect 1]**: [Description]
- **[Scalability aspect 2]**: [Description]
- **[Resilience aspect 1]**: [Description]
- **[Resilience aspect 2]**: [Description]

---

## Compliance

### [Compliance standard 1]

- **[Requirement 1]**: [Implementation description]
- **[Requirement 2]**: [Implementation description]
- **[Requirement 3]**: [Implementation description]

### [Compliance standard 2]

- **Tool**: [Tool/implementation]
- **Categories**:
  - [Category 1]: [Description]
  - [Category 2]: [Description]
  - [Category 3]: [Description]

### Legal docs

- **[Document type 1]**: [Location and versioning]
- **[Document type 2]**: [Location and versioning]
- **Storage**: [Storage approach]

---

## Modules

> Опишите конкретную структуру приложения. Создайте отдельные секции для каждого frontend, backend и infrastructure модуля.

### Frontend module

- **name**: [module-name]
- **description**: [Module description]
- **submodules** (в порядке реализации):
  - **[submodule-name-1]**
    - **id**: `[SUBMODULE-ID]`
    - **description**: [Submodule description]
    - **scope**: [Scope description]
  - **[submodule-name-2]**
    - **id**: `[SUBMODULE-ID]`
    - **description**: [Submodule description]
    - **scope**: [Scope description]

> Дублируйте секцию **submodules** для каждого подмодуля.

- **runtimes**: [Runtime 1] + [Runtime 2] + [Runtime 3]
- **platform**: [Platform description]
- **cache strategy**:
  - [Cache type 1]: [Strategy description]
  - [Cache type 2]: [Strategy description]
- **State ownership & fetching**:
  - [State aspect 1]: [Description]
  - [State aspect 2]: [Description]
  - [State aspect 3]: [Description]
- **env vars**:
  - `[ENV_VAR_NAME]`
    - **default value**: `[default value or "(none, optional)"]`
  - `[ENV_VAR_NAME]`
    - **default value**: `[default value or "(none, optional)"]`
- **assets policy**:
  - [Asset type 1]: [Policy description]
  - [Asset type 2]: [Policy description]
  - [Asset type 3]: [Policy description]
- **location**: [Deployment location]
- **capabilities**:
  - `[FEAT-ID]` — [Feature name]
  - `[FEAT-ID]` — [Feature name]
  - `[FEAT-ID]` — [Feature name]
- **health_checks**: [см. `devops.md`]
  - [Health check endpoint] — [Description]
- **store**:
  - **persistence strategy**: [Strategy description]
  - **hydration rules**: [Hydration description]
  - **state normalization**: [Normalization approach]

> Дублируйте секцию **Frontend module** для каждого frontend приложения (если их несколько).

---

### Backend module

- **name**: [module-name]
- **description**: [Module description]
- **public api map**:
  - `[API-ID]`
    - **path**: `[HTTP_METHOD] /[api/path]`
    - **summary**: [Endpoint description]
  - `[API-ID]`
    - **path**: `[HTTP_METHOD] /[api/path]`
    - **summary**: [Endpoint description]
- **rate limits**:
  - **global**:
    - `[limit-id]`
      - **description**: [Limit description]
      - **limit**: [number]
      - **window**: per [time unit]
      - **on exceed**:
        - **message**: "[Error message]"
        - **code**: [HTTP code]
      - **backoff policy**: [Backoff strategy]
  - **endpoints**:
    - `[endpoint-limit-id]`
      - **name**: [Limit name]
        - **path**: `/[api/path]`
        - **description**: [Limit description]
        - **limit**: [number]
        - **window**: per [time unit]
        - **on exceed**:
          - **message**: "[Error message]"
          - **code**: [HTTP code]
        - **backoff policy**: [Backoff strategy]
  - **quotas**:
    - `[quota-id]`
      - **description**: [Quota description]
      - **applies to**: `[condition]`
      - **limit**: [number]
      - **window**: per [time unit]
      - **on exceed**:
        - **message**: "[Error message]"
        - **code**: [HTTP code]
- **Migrations & seed**: [см. `devops.md`]
- **submodules** (в порядке реализации):
  - `[SUBMODULE-ID]`
    - **description**: [Submodule description]
    - **scope**: [Scope description]
  - `[SUBMODULE-ID]`
    - **description**: [Submodule description]
    - **scope**: [Scope description]

> Дублируйте секцию **submodules** для каждого подмодуля.

- **location**: [Deployment location and region]
- **capabilities**:
  - `[FEAT-ID]` — [Feature name]
  - `[FEAT-ID]` — [Feature name]
  - `[FEAT-ID]` — [Feature name]
- **health_checks**: [см. `devops.md`]
  - [Health check endpoint] — [Check description]

> Дублируйте секцию **Backend module** для каждого backend приложения (если их несколько).

---

### Infrastructure modules

[см. `devops.md`]

- **[Component 1]**: [Technology/Provider]
- **[Component 2]**: [Technology/Provider]
- **[Component 3]**: [Technology/Provider]

---

## Feature flags

> Опишите все feature flags в проекте. Создайте отдельный блок для каждого флага.

### `[feature-flag-name]`

- **description**: [Feature description]
- **scopes**: [Target audience/conditions]
- **lifecycle**:
  1. [Lifecycle step 1] ([timeframe])
  2. [Lifecycle step 2] ([timeframe])
  3. [Lifecycle step 3] ([timeframe])
  4. [Lifecycle step 4] ([timeframe])
- **affects modules**: `[MODULE-ID]`, `[MODULE-ID]`
- **rollout strategy**: [Strategy description]

> Дублируйте секцию для каждого feature flag.

---

## Schemas

### Frontend store

> Опишите структуру клиентского состояния в TypeScript формате.

```typescript
interface [StoreName] {
  [property]: {
    [field]: [type];
    // ...
  };
  // ...
}

interface [AnotherStoreName] {
  [property]: [type];
  // ...
}
```

---

### Database

> Опишите схему базы данных. Создайте отдельный блок для каждой таблицы.

#### [table_name]

- **id**: `[table_name]`
- **name**: [Table display name]
- **struct**:
  - **поля**:
    - `[field_name]`
      - **тип**: [DATA_TYPE], [CONSTRAINTS]
    - `[field_name]`
      - **тип**: [DATA_TYPE], [CONSTRAINTS]
  - **индексы**:
    - `[index_name]` — на поле [field_name]
  - **связи**:
    - `[relation_description]` → `[target_table.field]` ([relationship type])

> Дублируйте секцию для каждой таблицы БД.

---

### Environment variables

> Перечислите все environment переменные для frontend и backend. Более подробная информация в `devops.md`.

[см. `devops.md`]

**[Application type]**:

- `[ENV_VAR_NAME]` — [Description]
- `[ENV_VAR_NAME]` — [Description]
- `[ENV_VAR_NAME]` — [Description]

**[Another application type]**:

- `[ENV_VAR_NAME]` — [Description]
- `[ENV_VAR_NAME]` — [Description]

---

## API contracts

### Standards

> Определите общие стандарты для всех API в проекте.

- **format**: [API format/style]
- **versioning**: [Versioning approach]
- **error handling**:
  - **structure**:
    ```json
    {
      [error structure schema]
    }
    ```
  - **codes**:
    - `[code]` — [Description]
    - `[code]` — [Description]
      - **structure**: `[specific structure for this code]`
      - **see**: [Reference to related section]
    - `[code]` — [Description]
  - **messages**: [Message guidelines]
- **naming**:
  - [Naming aspect 1]: [Convention]
  - [Naming aspect 2]: [Convention]
  - [Naming aspect 3]: [Convention]

---

### Contracts

#### Public endpoints

> Опишите все публичные API эндпоинты. Создайте отдельный блок для каждого эндпоинта с полной схемой запроса/ответа.

##### `[API-ID]`

- **path**: `[HTTP_METHOD] /[api/path]`
- **schema**:

  ```typescript
  // Request
  {
    [field]: [type];
    // ...
  }

  // Response [status_code]
  {
    [field]: [type];
    // ...
  }

  // Response [error_status_code]
  {
    error: {
      code: "[ERROR_CODE]",
      message: "[Error message]"
    }
  }
  ```

- **summary**: [Endpoint description]

> Дублируйте секцию для каждого публичного эндпоинта.

---

#### Internal module contracts

> Опишите контракты внутреннего взаимодействия между модулями (если есть). Создайте отдельный блок для каждого контракта.

##### `[CONTRACT-ID]`

- **name**: [Contract name]
- **participants**: `[MODULE-ID]`, `[MODULE-ID]`
- **protocol**: [Communication protocol]
- **schema**:
  ```typescript
  {
    [field]: [type];
    // ...
  }
  ```
- **summary**: [Contract description]

> Дублируйте секцию для каждого внутреннего контракта.

---

### Route guards

> Определите правила доступа для всех маршрутов. Укажите требования к авторизации и уровню подписки.

| path               | auth         | tier         | description         |
| ------------------ | ------------ | ------------ | ------------------- |
| `/[route]`         | [yes/no/optional] | [tier level] | [Route description] |
| `/[route]`         | [yes/no/optional] | [tier level] | [Route description] |
| `/[route]`         | [yes/no/optional] | [tier level] | [Route description] |

---

## AI Checklist

> Следовать инструкциям документа `.spec-core/llms.md`

- [ ] Все зависимости стека согласованы и совместимы
- [ ] Нет противоречий между модулями (например, frontend ожидает поля, которого нет в API)
- [ ] Схемы БД нормализованы и имеют необходимые индексы
- [ ] API contracts соответствуют RESTful best practices
- [ ] Security checklist полностью заполнен и проверен
- [ ] Rate limits и квоты настроены для всех критичных эндпоинтов
- [ ] Feature flags имеют чёткую стратегию rollout и удаления
- [ ] Environment variables документированы для всех модулей
- [ ] Health checks настроены для мониторинга
- [ ] Уточнений не требуется; пометки, требующие уточнений, обработаны и удалены
- [ ] Документ согласован со всеми элементами из блока References
- [ ] Последние изменения прогнаны через `/review` > 1 раза; флаг снят перед запуском и выставлен заново через команду `/review`