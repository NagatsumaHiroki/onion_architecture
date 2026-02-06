import { TodoRepository } from '@/domain/repositories/ITodoRepository';

/**
 * Todoを削除するユースケース
 */
export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    
    if (!todo) {
      throw new Error('Todoが見つかりません');
    }

    await this.todoRepository.delete(id);
  }
}


