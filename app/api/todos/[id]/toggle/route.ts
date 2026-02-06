import { NextRequest, NextResponse } from 'next/server';
import { ToggleTodoUseCase } from '@/application/use-cases/ToggleTodoUseCase';
import { handleRouteError } from '@/app/api/_utils/routeResponse';
import { getTodoRepository } from '@/infrastructure/database/TodoRepositoryProvider';

const todoRepository = getTodoRepository();

/**
 * POST /api/todos/[id]/toggle - Todoの完了状態を切り替え
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const useCase = new ToggleTodoUseCase(todoRepository);
    const todo = await useCase.execute(id);

    return NextResponse.json(todo);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Todoの状態切り替えに失敗しました';
    return handleRouteError(error, 'Error toggling todo:', message);
  }
}


