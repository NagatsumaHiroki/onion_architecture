'use client';

import { Todo } from '@/domain/entities/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div>
      {incompleteTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {incompleteTodos.length}
            </span>
            未完了のTodo
          </h2>
          {incompleteTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
              {completedTodos.length}
            </span>
            完了したTodo
          </h2>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}

      {todos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">まだTodoがありません</p>
          <p className="text-sm mt-2">上のフォームから新しいTodoを追加してください</p>
        </div>
      )}
    </div>
  );
}


