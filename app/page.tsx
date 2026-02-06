'use client';

import { useTodos } from '@/presentation/hooks/useTodos';
import { TodoForm } from '@/presentation/components/TodoForm';
import { TodoList } from '@/presentation/components/TodoList';

export default function Home() {
  const { todos, loading, error, createTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-bold">エラーが発生しました</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Todo アプリ</h1>
          <p className="text-gray-600">オニオンアーキテクチャーで構築</p>
        </header>

        <TodoForm onSubmit={createTodo} />
        
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
}
