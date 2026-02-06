import { Todo } from '@/domain/entities/Todo';
import { TodoRepository } from '@/domain/repositories/ITodoRepository';

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string | null;
}

/**
 * Todoを更新するユースケース
 */
export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.findById(input.id);
    
    if (!todo) {
      throw new Error('Todoが見つかりません');
    }

    if (input.title !== undefined) {
      todo.updateTitle(input.title);
    }

    if (input.description !== undefined) {
      todo.updateDescription(input.description);
    }

    return await this.todoRepository.update(todo);
  }
}


