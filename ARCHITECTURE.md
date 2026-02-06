# アーキテクチャー詳細

## オニオンアーキテクチャーとは

オニオンアーキテクチャーは、ドメイン駆動設計（DDD）の原則に基づいた、レイヤードアーキテクチャーの一種です。
同心円状の層構造を持ち、内側の層は外側の層に依存しないという原則があります。

```
┌─────────────────────────────────────────┐
│      Presentation Layer (UI)            │  ← 最も外側
│  ┌───────────────────────────────────┐  │
│  │   Infrastructure Layer            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Application Layer          │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │   Domain Layer        │  │  │  │  ← 最も内側
│  │  │  │   (Core Business)     │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 各層の責務と実装

### 1. Domain Layer（ドメイン層）

**場所**: `domain/`

**責務**:
- ビジネスロジックの中核
- エンティティの定義
- ビジネスルールの実装
- リポジトリインターフェースの定義

**実装ファイル**:
- `domain/entities/Todo.ts` - Todoエンティティ
  - ビジネスルール（タイトル必須、完了/未完了の状態管理）
  - ファクトリーメソッド（create, fromPersistence）
  - ドメインロジック（complete, uncomplete, update系メソッド）

- `domain/repositories/ITodoRepository.ts` - リポジトリインターフェース
  - データアクセスの抽象化
  - 実装の詳細には依存しない

**依存関係**: なし（完全に独立）

---

### 2. Application Layer（アプリケーション層）

**場所**: `application/`

**責務**:
- ユースケースの実装
- ビジネスルールの調整
- トランザクション管理
- ドメイン層のオーケストレーション

**実装ファイル**:
- `CreateTodoUseCase.ts` - Todo作成
- `GetAllTodosUseCase.ts` - Todo一覧取得
- `GetTodoByIdUseCase.ts` - Todo詳細取得
- `UpdateTodoUseCase.ts` - Todo更新
- `ToggleTodoUseCase.ts` - 完了状態切り替え
- `DeleteTodoUseCase.ts` - Todo削除

**依存関係**: Domain Layer のみ

**特徴**:
- 各ユースケースは単一責任
- リポジトリインターフェース経由でデータアクセス
- ビジネスルールの違反をチェック

---

### 3. Infrastructure Layer（インフラストラクチャ層）

**場所**: `infrastructure/`

**責務**:
- 外部システムとの連携
- データベースアクセスの実装
- 外部APIの呼び出し
- ファイルシステムアクセス

**実装ファイル**:
- `infrastructure/database/prisma-client.ts` - Prismaクライアントのシングルトン
- `infrastructure/database/repositories/PrismaTodoRepository.ts` - リポジトリの実装
  - ITodoRepositoryインターフェースを実装
  - Prismaを使用したデータベース操作
  - ドメインエンティティとPrismaモデル間の変換

**依存関係**: Domain Layer, Application Layer

**特徴**:
- 技術的な実装の詳細を隠蔽
- インターフェースに対する実装を提供
- データベースを変更する場合、この層のみを書き換えればOK

---

### 4. Presentation Layer（プレゼンテーション層）

**場所**: `presentation/`, `app/`

**責務**:
- ユーザーインターフェース
- ユーザー入力の処理
- データの表示
- API エンドポイントの提供

**実装ファイル**:

**コンポーネント**:
- `presentation/components/TodoForm.tsx` - Todo作成フォーム
- `presentation/components/TodoItem.tsx` - Todo個別アイテム
- `presentation/components/TodoList.tsx` - Todoリスト

**カスタムフック**:
- `presentation/hooks/useTodos.ts` - Todo操作ロジック

**API Routes**:
- `app/api/todos/route.ts` - Todo一覧取得・作成
- `app/api/todos/[id]/route.ts` - Todo詳細・更新・削除
- `app/api/todos/[id]/toggle/route.ts` - 完了状態切り替え

**ページ**:
- `app/page.tsx` - メインページ
- `app/layout.tsx` - レイアウト

**依存関係**: すべての層（最も外側）

---

## データフロー

### 1. Todo作成のフロー

```
ユーザー入力
    ↓
TodoForm (Presentation)
    ↓
useTodos.createTodo (Presentation Hook)
    ↓
POST /api/todos (API Route)
    ↓
CreateTodoUseCase (Application)
    ↓
Todo.create() (Domain Entity)
    ↓
todoRepository.create() (Domain Interface)
    ↓
PrismaTodoRepository.create() (Infrastructure)
    ↓
Prisma Client
    ↓
SQLite Database
```

### 2. Todo一覧取得のフロー

```
ページ表示
    ↓
useTodos.fetchTodos (Presentation Hook)
    ↓
GET /api/todos (API Route)
    ↓
GetAllTodosUseCase (Application)
    ↓
todoRepository.findAll() (Domain Interface)
    ↓
PrismaTodoRepository.findAll() (Infrastructure)
    ↓
Prisma Client
    ↓
MySQL Database
    ↓
Todo[] (Domain Entities)
    ↓
TodoList Component (Presentation)
```

## 依存性逆転の原則（DIP）

オニオンアーキテクチャーの核心は、依存性逆転の原則です。

**従来のアーキテクチャー**:
```
Domain → Repository Implementation (具体的な実装に依存)
```

**オニオンアーキテクチャー**:
```
Domain ← Infrastructure (抽象に依存)
   ↓
IRepository Interface (抽象)
   ↑
Repository Implementation (具体的な実装)
```

この構造により：
- ドメイン層は技術的な実装の詳細を知らない
- データベースを変更しても、ドメイン層は影響を受けない
- テストが容易（モックリポジトリを簡単に注入できる）

## テスタビリティ

各層は独立してテスト可能です：

### Domain Layer のテスト
```typescript
// エンティティのビジネスロジックをテスト
const todo = Todo.create('テスト', 'これはテストです');
expect(todo.completed).toBe(false);
todo.complete();
expect(todo.completed).toBe(true);
```

### Application Layer のテスト
```typescript
// モックリポジトリを使用してユースケースをテスト
const mockRepository: ITodoRepository = {
  create: jest.fn(),
  // ... 他のメソッド
};
const useCase = new CreateTodoUseCase(mockRepository);
await useCase.execute({ title: 'テスト' });
expect(mockRepository.create).toHaveBeenCalled();
```

### Infrastructure Layer のテスト
```typescript
// 実際のデータベース（またはテストDB）を使用してリポジトリをテスト
const repository = new PrismaTodoRepository();
const todo = await repository.create(/* ... */);
expect(todo.id).toBeDefined();
```

## メリット

1. **保守性**
   - 各層の責務が明確
   - 変更の影響範囲が限定的

2. **テスタビリティ**
   - 各層を独立してテスト可能
   - モックが容易

3. **柔軟性**
   - データベースやフレームワークの変更が容易
   - ビジネスロジックは技術的な変更に影響されない

4. **スケーラビリティ**
   - 新機能の追加が容易
   - チーム開発がしやすい

5. **再利用性**
   - ドメイン層とアプリケーション層は他のプロジェクトでも再利用可能
   - UIを変更しても、ビジネスロジックは変わらない

## デメリット（トレードオフ）

1. **初期コストが高い**
   - 簡単なCRUDアプリには過剰
   - ファイル数が多くなる

2. **学習曲線**
   - 理解に時間がかかる
   - チーム全体の理解が必要

3. **ボイラープレートコード**
   - インターフェースや抽象化により、コード量が増える

## いつ使うべきか

**適している場合**:
- ビジネスロジックが複雑
- 長期運用するプロジェクト
- チーム開発
- 技術的な変更が予想される

**適していない場合**:
- 単純なCRUD
- プロトタイプ開発
- 短期間のプロジェクト
- 小規模なアプリケーション

## まとめ

このサンプルプロジェクトは教育目的でオニオンアーキテクチャーを採用しています。
実際のプロジェクトでは、要件と複雑性に応じて適切なアーキテクチャーを選択することが重要です。

