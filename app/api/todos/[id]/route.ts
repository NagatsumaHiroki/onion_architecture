import { NextRequest, NextResponse } from 'next/server';
import { GetTodoByIdUseCase } from '@/application/use-cases/GetTodoByIdUseCase';
import { UpdateTodoUseCase } from '@/application/use-cases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from '@/application/use-cases/DeleteTodoUseCase';
import { handleRouteError, jsonError } from '@/app/api/_utils/routeResponse';
import { parseUpdateTodoInput } from '@/app/api/todos/_utils';
import { getTodoRepository } from '@/infrastructure/database/TodoRepositoryProvider';

const todoRepository = getTodoRepository();

/**
 * GET /api/todos/[id] - IDでTodoを取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const useCase = new GetTodoByIdUseCase(todoRepository);
    const todo = await useCase.execute(id);

    if (!todo) {
      return jsonError('Todoが見つかりません', 404);
    }

    return NextResponse.json(todo);
  } catch (error) {
    return handleRouteError(error, 'Error fetching todo:', 'Todoの取得に失敗しました');
  }
}

/**
 * PATCH /api/todos/[id] - Todoを更新
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, description } = await parseUpdateTodoInput(request);

    const useCase = new UpdateTodoUseCase(todoRepository);
    const todo = await useCase.execute({ id, title, description });

    return NextResponse.json(todo);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Todoの更新に失敗しました';
    return handleRouteError(error, 'Error updating todo:', message);
  }
}

/**
 * DELETE /api/todos/[id] - Todoを削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const useCase = new DeleteTodoUseCase(todoRepository);
    await useCase.execute(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Todoの削除に失敗しました';
    return handleRouteError(error, 'Error deleting todo:', message);
  }
}


