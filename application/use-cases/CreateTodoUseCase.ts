import { Todo } from '@/domain/entities/Todo';
import { TodoCommandRepository } from '@/domain/repositories/ITodoRepository';

export interface CreateTodoInput {
  title: string;
  description?: string | null;
}

/**
 * Todoを作成するユースケース
 */
export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoCommandRepository) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    const todo = Todo.create(input.title, input.description || null);
    return await this.todoRepository.create(todo);
  }
}


