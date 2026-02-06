import { NextRequest } from 'next/server';

export class ValidationError extends Error {}

export async function parseCreateTodoInput(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;

  if (!title) {
    throw new ValidationError('タイトルは必須です');
  }

  return { title, description };
}

export async function parseUpdateTodoInput(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;
  return { title, description };
}
