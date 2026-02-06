import { NextRequest, NextResponse } from 'next/server';
import { GetAllTodosUseCase } from '@/application/use-cases/GetAllTodosUseCase';
import { CreateTodoUseCase } from '@/application/use-cases/CreateTodoUseCase';
import { handleRouteError, jsonError } from '@/app/api/_utils/routeResponse';
import { parseCreateTodoInput, ValidationError } from '@/app/api/todos/_utils';
import { getTodoRepository } from '@/infrastructure/database/TodoRepositoryProvider';

const todoRepository = getTodoRepository();

/**
 * GET /api/todos - すべてのTodoを取得
 */
export async function GET() {
  try {
    const useCase = new GetAllTodosUseCase(todoRepository);
    const todos = await useCase.execute();

    return NextResponse.json(todos);
  } catch (error) {
    return handleRouteError(error, 'Error fetching todos:', 'Todoの取得に失敗しました');
  }
}

/**
 * POST /api/todos - 新しいTodoを作成
 */
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await parseCreateTodoInput(request);
    const useCase = new CreateTodoUseCase(todoRepository);
    const todo = await useCase.execute({ title, description });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonError(error.message, 400);
    }
    return handleRouteError(error, 'Error creating todo:', 'Todoの作成に失敗しました');
  }
}


