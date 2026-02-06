import { Todo } from '@/domain/entities/Todo';
import { TodoQueryRepository } from '@/domain/repositories/ITodoRepository';

/**
 * IDでTodoを取得するユースケース
 */
export class GetTodoByIdUseCase {
  constructor(private readonly todoRepository: TodoQueryRepository) {}

  async execute(id: string): Promise<Todo | null> {
    return await this.todoRepository.findById(id);
  }
}


