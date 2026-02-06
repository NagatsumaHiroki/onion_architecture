import { Todo } from '@/domain/entities/Todo';
import { TodoRepository } from '@/domain/repositories/ITodoRepository';

/**
 * Todoの完了状態を切り替えるユースケース
 */
export class ToggleTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    
    if (!todo) {
      throw new Error('Todoが見つかりません');
    }

    if (todo.completed) {
      todo.uncomplete();
    } else {
      todo.complete();
    }

    return await this.todoRepository.update(todo);
  }
}


