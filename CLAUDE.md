# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Todo application built with onion architecture pattern. Japanese language is used for UI text and error messages throughout the codebase.

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **ORM**: Prisma with MySQL 8.0
- **Containerization**: Docker Compose

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run Prisma migrations (dev)
npm run db:studio    # Open Prisma Studio GUI (http://localhost:5555)
```

Database setup (Docker):
```bash
docker-compose up -d mysql        # Start MySQL only
npx prisma generate               # Generate client after schema changes
npx prisma migrate dev --name <description>  # Create and apply migration
```

## Architecture

Onion architecture with strict dependency rules: inner layers must not depend on outer layers.

```
Domain (innermost) → Application → Infrastructure → Presentation/App (outermost)
```

### Layer Structure

- **`domain/`** — Entities and repository interfaces. Zero external dependencies. `Todo` entity uses factory methods (`Todo.create()` for new, `Todo.fromPersistence()` for hydration).

- **`application/use-cases/`** — One class per use case (e.g., `CreateTodoUseCase`). Each receives a repository interface via constructor injection. Depends only on domain layer.

- **`infrastructure/database/`** — Prisma implementation of domain repository interfaces. `TodoRepositoryProvider.getTodoRepository()` is the singleton factory used by API routes. `TodoMapper` handles Prisma model ↔ domain entity conversion.

- **`presentation/`** — React components, custom hooks (`useTodos`), and API client (`todoClient.ts`). Client-side only (`'use client'`).

- **`app/`** — Next.js App Router pages and API routes. API routes (`app/api/todos/`) instantiate use cases with the repository from `getTodoRepository()`.

### Key Patterns

- **Repository pattern with CQS**: `ITodoRepository.ts` defines separate `TodoQueryRepository` and `TodoCommandRepository` interfaces, composed into `TodoRepository` type.
- **Dependency inversion**: API routes resolve the concrete repository via `getTodoRepository()` from `infrastructure/database/TodoRepositoryProvider.ts`, then inject it into use case constructors.
- **Mapper layer**: `infrastructure/database/mappers/TodoMapper.ts` converts between Prisma models and domain entities.
- **API error handling**: `app/api/_utils/routeResponse.ts` provides `handleRouteError()` and `jsonError()` helpers. `app/api/todos/_utils.ts` has input parsing with `ValidationError`.
- **Client-side API layer**: `presentation/api/todoClient.ts` wraps fetch calls with `ApiErrorHandler` interface for error message customization.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

## API Endpoints

- `GET /api/todos` — List all todos
- `POST /api/todos` — Create todo (`{ title, description? }`)
- `GET /api/todos/[id]` — Get single todo
- `PATCH /api/todos/[id]` — Update todo (`{ title?, description? }`)
- `POST /api/todos/[id]/toggle` — Toggle completion
- `DELETE /api/todos/[id]` — Delete todo
