import { Todo } from '@/domain/entities/Todo';
import {
  ApiErrorHandler,
  defaultApiErrorHandler,
} from '@/presentation/api/apiErrorHandler';

async function ensureOk(
  response: Response,
  message: string,
  errorHandler: ApiErrorHandler
): Promise<void> {
  if (!response.ok) {
    throw new Error(errorHandler.getMessage(response, message));
  }
}

export async function getTodos(
  errorHandler: ApiErrorHandler = defaultApiErrorHandler
): Promise<Todo[]> {
  const response = await fetch('/api/todos');
  await ensureOk(response, 'Todoの取得に失敗しました', errorHandler);
  return await response.json();
}

export async function createTodo(
  title: string,
  description?: string,
  errorHandler: ApiErrorHandler = defaultApiErrorHandler
): Promise<void> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  await ensureOk(response, 'Todoの作成に失敗しました', errorHandler);
}

export async function updateTodo(
  id: string,
  title?: string,
  description?: string,
  errorHandler: ApiErrorHandler = defaultApiErrorHandler
): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  await ensureOk(response, 'Todoの更新に失敗しました', errorHandler);
}

export async function toggleTodo(
  id: string,
  errorHandler: ApiErrorHandler = defaultApiErrorHandler
): Promise<void> {
  const response = await fetch(`/api/todos/${id}/toggle`, {
    method: 'POST',
  });
  await ensureOk(response, 'Todoの状態切り替えに失敗しました', errorHandler);
}

export async function deleteTodo(
  id: string,
  errorHandler: ApiErrorHandler = defaultApiErrorHandler
): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  await ensureOk(response, 'Todoの削除に失敗しました', errorHandler);
}
