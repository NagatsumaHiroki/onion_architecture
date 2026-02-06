'use client';

import { useState } from 'react';
import { Todo } from '@/domain/entities/Todo';
import { TodoItemEdit } from '@/presentation/components/TodoItemEdit';
import { TodoItemView } from '@/presentation/components/TodoItemView';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    try {
      await onUpdate(todo.id, editTitle, editDescription);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TodoItemEdit
        title={editTitle}
        description={editDescription}
        onTitleChange={setEditTitle}
        onDescriptionChange={setEditDescription}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <TodoItemView
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
      onEdit={() => setIsEditing(true)}
    />
  );
}


