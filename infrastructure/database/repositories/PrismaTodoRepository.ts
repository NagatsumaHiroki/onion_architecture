import {
  TodoCommandRepository,
  TodoQueryRepository,
} from '@/domain/repositories/ITodoRepository';
import { Todo } from '@/domain/entities/Todo';
import { prisma } from '../prisma-client';
import { TodoMapper } from '@/infrastructure/database/mappers/TodoMapper';

/**
 * PrismaによるTodoRepositoryの実装
 */
export class PrismaTodoRepository implements TodoQueryRepository, TodoCommandRepository {
  async findAll(): Promise<Todo[]> {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return TodoMapper.toDomainList(todos);
  }

  async findById(id: string): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return null;
    }

    return TodoMapper.toDomain(todo);
  }

  async create(todo: Todo): Promise<Todo> {
    const created = await prisma.todo.create({
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      },
    });

    return TodoMapper.toDomain(created);
  }

  async update(todo: Todo): Promise<Todo> {
    const updated = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      },
    });

    return TodoMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.todo.delete({
      where: { id },
    });
  }

  async findByCompletionStatus(completed: boolean): Promise<Todo[]> {
    const todos = await prisma.todo.findMany({
      where: { completed },
      orderBy: { createdAt: 'desc' },
    });

    return TodoMapper.toDomainList(todos);
  }
}


