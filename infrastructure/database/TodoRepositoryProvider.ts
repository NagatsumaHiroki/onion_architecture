import { TodoRepository } from '@/domain/repositories/ITodoRepository';
import { PrismaTodoRepository } from '@/infrastructure/database/repositories/PrismaTodoRepository';

type TodoRepositoryType = 'prisma';

let repository: TodoRepository | null = null;

export function getTodoRepository(): TodoRepository {
  if (repository) {
    return repository;
  }

  const repositoryType = (process.env.TODO_REPOSITORY || 'prisma') as TodoRepositoryType;

  switch (repositoryType) {
    case 'prisma':
    default:
      repository = new PrismaTodoRepository();
      return repository;
  }
}
