# コードスタイル・規約

## 言語・設定
- TypeScript 厳格モード（tsconfig.json: `strict: true`）
- ESLint: eslint-config-next（core-web-vitals + typescript）
- パスエイリアス: `@/*` でプロジェクトルートを参照（例: `@/domain/entities/Todo`）。同一レイヤー内の近い参照のみ相対パス可（例: `../entities/Todo`）

## 命名規約

### ファイル名
- エンティティ・ユースケース・コンポーネント: **PascalCase**（`Todo.ts`, `CreateTodoUseCase.ts`, `TodoItem.tsx`）
- リポジトリ**インターフェース**: **I 接頭辞**（`ITodoRepository.ts`）
- リポジトリ実装・マッパー: **PascalCase**（`PrismaTodoRepository.ts`, `TodoMapper.ts`）
- API ルート・ユーティリティ: **camelCase または route.ts / _utils.ts**（`route.ts`, `_utils.ts`, `todoClient.ts`）

### シンボル名
- クラス・インターフェース・型: **PascalCase**
- メソッド・関数・変数: **camelCase**
- コンポーネントの Props 型: **ComponentNameProps**（例: `TodoItemProps`）
- ユースケースの入力型: ***Input**（例: `CreateTodoInput`）
- 合成型は **type**（例: `TodoRepository = TodoQueryRepository & TodoCommandRepository`）

### 定数・インスタンス
- 定数・デフォルトインスタンス: **camelCase**（例: `defaultApiErrorHandler`）

## コメント・JSDoc
- **ドメイン**（エンティティ・リポジトリインターフェース）: クラスと公開メソッドに JSDoc を付ける。説明は**日本語**（例: `/** Todoを完了状態にする */`）
- **ユースケース**: クラスに JSDoc で責務を1行で説明
- **API ルート**: 各ハンドラ（GET/POST 等）にエンドポイント説明の JSDoc（例: `/** GET /api/todos - すべてのTodoを取得 */`）
- マッパー・単純なユーティリティは JSDoc 省略可

## アーキテクチャ規約
- ドメイン層は外部ライブラリに依存しない
- ユースケースはリポジトリを**インターフェース**で受け取り、**コンストラクタインジェクション**（`constructor(private readonly todoRepository: TodoCommandRepository)`）
- API ルートは `getTodoRepository()` でリポジトリを取得し、ユースケースに渡す
- エンティティは `Todo.create()`（新規）と `Todo.fromPersistence()`（永続化からの復元）で生成
- 不変にしたいプロパティは **readonly** を付ける（id, createdAt 等）

## React（presentation）
- **関数コンポーネント** + **named export**（`export function TodoItem(...)`）
- Props は **interface** で定義し、分割代入で受け取る
- クライアント専用の場合はファイル先頭に **`'use client';`** を1行で記述

## API・エラー
- **バリデーション**: `ValidationError` を throw、メッセージは**日本語**（例: `'タイトルは必須です'`）
- **ルート共通**: `app/api/_utils/routeResponse.ts` の `handleRouteError()`, `jsonError()` を使用。クライアント向けメッセージは日本語
- **クライアント**: `presentation/api/apiErrorHandler.ts` の `ApiErrorHandler` でエラーメッセージを統一。デフォルトは日本語メッセージを返す

## その他
- UI・ログ以外の**ユーザー向けメッセージ・エラーメッセージは日本語**で統一
- Prisma 型と同名のドメイン型がある場合は **import でエイリアス**（例: `import { Todo as PrismaTodo } from '@prisma/client'`）
- マッパーは **static メソッド**（`toDomain`, `toDomainList` 等）で Prisma ↔ ドメイン変換
