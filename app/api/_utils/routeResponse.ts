import { NextResponse } from 'next/server';

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function handleRouteError(
  error: unknown,
  logMessage: string,
  clientMessage: string
) {
  console.error(logMessage, error);
  return jsonError(clientMessage, 500);
}
