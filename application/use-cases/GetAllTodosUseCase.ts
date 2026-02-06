import { Todo } from '@/domain/entities/Todo';
import { TodoQueryRepository } from '@/domain/repositories/ITodoRepository';

/**
 * すべてのTodoを取得するユースケース
 */
export class GetAllTodosUseCase {
  constructor(private readonly todoRepository: TodoQueryRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}


