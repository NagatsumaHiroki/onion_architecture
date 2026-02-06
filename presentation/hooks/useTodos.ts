'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/domain/entities/Todo';
import {
  getTodos,
  createTodo as createTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest,
  deleteTodo as deleteTodoRequest,
} from '@/presentation/api/todoClient';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (title: string, description?: string) => {
    try {
      await createTodoRequest(title, description);
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  const updateTodo = async (id: string, title?: string, description?: string) => {
    try {
      await updateTodoRequest(id, title, description);
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await toggleTodoRequest(id);
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoRequest(id);
      await fetchTodos();
    } catch (err) {
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}


