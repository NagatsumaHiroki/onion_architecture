# コードベース構造（概要）

- **domain/** — entities/Todo.ts, repositories/ITodoRepository.ts
- **application/use-cases/** — CreateTodo, GetAllTodos, GetTodoById, UpdateTodo, ToggleTodo, DeleteTodo
- **infrastructure/database/** — TodoRepositoryProvider, prisma-client, repositories/PrismaTodoRepository, mappers/TodoMapper
- **presentation/** — components（TodoList, TodoItem, TodoForm 等）, hooks/useTodos, api/todoClient, apiErrorHandler
- **app/** — layout, page, globals.css, api/_utils, api/todos（route, [id], [id]/toggle）
- **prisma/** — スキーマ・マイグレーション
- 設定: package.json, tsconfig.json, eslint.config.mjs, next.config.ts, docker-compose.yml
