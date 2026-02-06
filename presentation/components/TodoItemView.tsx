'use client';

import { Todo } from '@/domain/entities/Todo';

interface TodoItemViewProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: () => void;
}

export function TodoItemView({ todo, onToggle, onDelete, onEdit }: TodoItemViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </h3>
          
          {todo.description && (
            <p
              className={`text-sm mb-2 ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}
            >
              {todo.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>作成: {new Date(todo.createdAt).toLocaleDateString('ja-JP')}</span>
            {todo.createdAt.toString() !== todo.updatedAt.toString() && (
              <span>• 更新: {new Date(todo.updatedAt).toLocaleDateString('ja-JP')}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition font-medium"
          >
            編集
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition font-medium"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
