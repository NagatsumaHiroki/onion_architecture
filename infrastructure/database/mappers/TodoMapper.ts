import { Todo } from '@/domain/entities/Todo';
import { Todo as PrismaTodo } from '@prisma/client';

export class TodoMapper {
  static toDomain(prismaTodo: PrismaTodo): Todo {
    return Todo.fromPersistence({
      id: prismaTodo.id,
      title: prismaTodo.title,
      description: prismaTodo.description,
      completed: prismaTodo.completed,
      createdAt: prismaTodo.createdAt,
      updatedAt: prismaTodo.updatedAt,
    });
  }

  static toDomainList(prismaTodos: PrismaTodo[]): Todo[] {
    return prismaTodos.map((todo) => TodoMapper.toDomain(todo));
  }
}
