# プロジェクト概要: onion_architecture_sample

## 目的
オニオンアーキテクチャで構築したTodoアプリケーション。UIテキスト・エラーメッセージは日本語。

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router) + TypeScript
- **スタイル**: Tailwind CSS
- **ORM**: Prisma + MySQL 8.0
- **コンテナ**: Docker Compose

## アーキテクチャ（依存関係のルール）
内側のレイヤーは外側に依存しない。

```
Domain（最内層）→ Application → Infrastructure → Presentation / App（最外層）
```

### レイヤー構成
- **domain/** — エンティティとリポジトリインターフェース。外部依存なし。`Todo` は `Todo.create()` / `Todo.fromPersistence()` で生成。
- **application/use-cases/** — ユースケース1クラス1ファイル。コンストラクタでリポジトリインターフェースを注入。domain のみ依存。
- **infrastructure/database/** — Prisma によるリポジトリ実装。`TodoRepositoryProvider.getTodoRepository()` がシングルトン。`TodoMapper` で Prisma ↔ ドメイン変換。
- **presentation/** — React コンポーネント、カスタムフック（`useTodos`）、API クライアント（`todoClient.ts`）。`'use client'` のみ。
- **app/** — Next.js のページと API ルート。API ルートで `getTodoRepository()` からリポジトリを取得しユースケースに注入。

### 主なパターン
- リポジトリ + CQS: `ITodoRepository.ts` で `TodoQueryRepository` と `TodoCommandRepository` を分離し、`TodoRepository` 型で合成。
- 依存性逆転: API ルートは `getTodoRepository()` で具象を解決し、ユースケースに注入。
- パスエイリアス: `@/*` → プロジェクトルート（tsconfig.json）。

## API エンドポイント
- GET/POST `/api/todos` — 一覧・作成
- GET/PATCH/DELETE `/api/todos/[id]` — 取得・更新・削除
- POST `/api/todos/[id]/toggle` — 完了トグル
