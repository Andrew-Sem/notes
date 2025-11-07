# Code standards
 
- Follow TypeScript strict mode guidelines
- Maintain type safety throughout the codebase
- Enforce strict typing:
  - Never use `any` type
  - Avoid type assertions (`as`) - use type guards instead
  - Never use non-null assertion operator (`!`) - use proper null/undefined checking instead
  - Always define proper interfaces and types for all data structures
  - Use generics when appropriate instead of type casting
  - For complex typing cases or handling `unknown` types, use Zod schemas for validation and type inference
- Use naming conventions consistently:
  - All file names should use kebab-case: `auth-service.ts`, `login-form.tsx`, `user-profile.tsx`
  - Component identifiers inside files should use PascalCase: `const LoginForm = () => {...}`
  - Variables, functions, and other identifiers should use camelCase
- Always use arrow functions for component and function declarations (except Next.js page components):
  - ✅ `const Component = () => {...}`
  - ✅ `const handleClick = () => {...}`
  - ❌ `function Component() {...}`
- Organize code from high-level to low-level implementation:
  - Start with public API methods at the top
  - Place methods after the methods that use them
  - Helper methods should be placed at the bottom
- No magic values (everything from config)
- Minimal env and widely config usage
- No nice-to-haves: implement only requirements explicitly confirmed in the user story; defer extras until they are prioritized.

# Design Patterns and Principles
- Start simple: choose the most straightforward solution first and layer in abstractions or complexity only after a real, demonstrated need appears.
- Follow the library-first principle: use well-maintained library APIs directly and only introduce custom abstractions when they add clear value (cross-cutting concerns, safety, or composability).
- Strictly adhere to SOLID principles
- Follow DRY: Avoid code duplication through abstraction
- Implement dependency inversion:
  - Create and use interfaces for repositories, services, and APIs
  - Inject dependencies rather than instantiating them directly
- Use component composition patterns on frontend:
  - Pass render props for customizable UI sections
  - Use component slots for flexible layouts
  - Provide action props for handling component behavior
- Implement repository pattern for data access:
  - Define repository interfaces in the domain layer
  - Implement concrete repositories in infrastructure layer
  - Inject repositories into components and services

# Project Structure & Imports
- Keep shared UI atoms and molecules in `app/shared/ui`. No other shared subfolder hosts UI components.
- The authenticated API client lives in `app/shared/api/api-client.ts`; shared libraries should not recreate HTTP clients.
- Pages live under `app/pages` and are registered through the centralized config in `app/shared/pages.tsx`. Do not keep page components inside feature `ui/` folders.
- Cross-cutting capabilities like authentication reside under shared modules (e.g. `app/shared/auth`) and expose their API via an `index.ts` barrel.
- Feature modules expose a curated public API from their `index.ts`. Only re-export functionality needed by other modules; keep implementation details internal.
- Feature internals follow the slice layout:
  - `ui/` for React components rendered externally or within the feature.
  - `model/` for hooks, services, and types (e.g. `model/hooks`, `model/services`, `model/types`).
  - Additional folders (e.g. `api/`, `providers/`) remain peer directories when required.
- Import discipline:
  - Shared modules may import other shared modules only.
  - Features may import from shared and other features.
  - Pages may import from features and shared.
  - Avoid any reverse or cross-layer imports outside these rules.
- Stick to the design tokens defined in `app/app.css` (shadcn variables). Use CSS variables via utility classes (e.g. `bg-background`, `text-primary`) instead of raw Tailwind palette classes such as `bg-red-500`.