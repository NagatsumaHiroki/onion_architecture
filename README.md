# オニオンアーキテクチャーサンプル

オニオンアーキテクチャーを採用した、モダンなアプリケーションのサンプルプロジェクトです。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ORM**: Prisma
- **データベース**: MySQL 8.0
- **コンテナ化**: Docker

## アーキテクチャー

このプロジェクトはオニオンアーキテクチャーを採用しており、以下の層で構成されています：

### 📁 プロジェクト構造

```
onion-architecture-sample/
├── domain/                    # ドメイン層（最も内側の層）
│   ├── entities/             # エンティティ（ビジネスロジック）
│   │   └── Todo.ts
│   └── repositories/         # リポジトリインターフェース
│       └── ITodoRepository.ts
│
├── application/              # アプリケーション層
│   └── use-cases/           # ユースケース（ビジネスルール）
│       ├── CreateTodoUseCase.ts
│       ├── GetAllTodosUseCase.ts
│       ├── GetTodoByIdUseCase.ts
│       ├── UpdateTodoUseCase.ts
│       ├── ToggleTodoUseCase.ts
│       └── DeleteTodoUseCase.ts
│
├── infrastructure/           # インフラストラクチャ層
│   └── database/
│       ├── prisma-client.ts
│       └── repositories/    # リポジトリの実装
│           └── PrismaTodoRepository.ts
│
├── presentation/            # プレゼンテーション層（最も外側の層）
│   ├── components/         # UIコンポーネント
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   └── hooks/             # カスタムフック
│       └── useTodos.ts
│
└── app/                    # Next.js App Router
    ├── api/               # API Routes
    │   └── todos/
    ├── page.tsx          # メインページ
    └── layout.tsx        # レイアウト
```

### 層の説明

1. **Domain（ドメイン層）**
   - ビジネスロジックの中核
   - 外部の依存関係を持たない
   - エンティティとリポジトリインターフェースを定義

2. **Application（アプリケーション層）**
   - ビジネスルールの実行
   - ユースケースを実装
   - ドメイン層のみに依存

3. **Infrastructure（インフラストラクチャ層）**
   - 外部システムとの連携
   - データベース、API呼び出しなどの実装
   - リポジトリインターフェースの具体的な実装

4. **Presentation（プレゼンテーション層）**
   - ユーザーインターフェース
   - UIコンポーネントとフック
   - ユーザーとの対話

## セットアップ方法

### 前提条件

- Node.js 20以上
- npm または yarn
- MySQL 8.0以上（ローカル開発の場合）
- Docker & Docker Compose（推奨）

### ローカル開発環境のセットアップ

#### オプション1: Docker を使用（推奨）

1. **Docker Compose でMySQLとアプリを起動**

```bash
docker-compose up -d mysql
```

MySQLが起動するまで待ちます（約30秒）。

2. **依存関係のインストール**

```bash
npm install
```

3. **環境変数の設定**

`.env` ファイルを作成し、以下を設定：

```env
DATABASE_URL="mysql://todouser:todopassword@localhost:3306/todoapp"
NODE_ENV="development"
```

4. **Prismaクライアントの生成**

```bash
npx prisma generate
```

5. **データベースのマイグレーション**

```bash
npx prisma migrate dev --name init
```

6. **開発サーバーの起動**

```bash
npm run dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

#### オプション2: ローカルMySQLを使用

1. **MySQLをインストールして起動**

MySQLサーバーをローカルにインストールし、起動してください。

2. **データベースとユーザーを作成**

```sql
CREATE DATABASE todoapp;
CREATE USER 'todouser'@'localhost' IDENTIFIED BY 'todopassword';
GRANT ALL PRIVILEGES ON todoapp.* TO 'todouser'@'localhost';
FLUSH PRIVILEGES;
```

3. **環境変数の設定**

`.env` ファイルを作成し、以下を設定：

```env
DATABASE_URL="mysql://todouser:todopassword@localhost:3306/todoapp"
NODE_ENV="development"
```

4. **依存関係のインストール**

```bash
npm install
```

5. **Prismaクライアントの生成とマイグレーション**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

6. **開発サーバーの起動**

```bash
npm run dev
```

### Docker Compose を使用した本番環境セットアップ

1. **すべてのサービスを起動**

```bash
docker-compose up -d
```

これにより、MySQLコンテナとアプリケーションコンテナの両方が起動します。

2. **ログの確認**

```bash
docker-compose logs -f app
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

3. **停止する場合**

```bash
docker-compose down
```

データを完全に削除する場合：

```bash
docker-compose down -v
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクションビルドを作成
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintでコードをチェック
- `npx prisma studio` - Prisma Studio（データベースGUI）を起動

## 機能

- ✅ Todoの作成
- ✅ Todoの一覧表示
- ✅ Todoの編集
- ✅ Todoの削除
- ✅ 完了/未完了の切り替え
- ✅ 完了状態でのフィルタリング表示
- ✅ レスポンシブデザイン

## API エンドポイント

### GET /api/todos
すべてのTodoを取得

### POST /api/todos
新しいTodoを作成

**リクエストボディ:**
```json
{
  "title": "タイトル",
  "description": "説明（オプション）"
}
```

### GET /api/todos/[id]
特定のTodoを取得

### PATCH /api/todos/[id]
Todoを更新

**リクエストボディ:**
```json
{
  "title": "新しいタイトル",
  "description": "新しい説明"
}
```

### POST /api/todos/[id]/toggle
Todoの完了状態を切り替え

### DELETE /api/todos/[id]
Todoを削除

## オニオンアーキテクチャーの利点

1. **テスタビリティ**: 各層が独立しているため、単体テストが容易
2. **保守性**: 関心の分離により、コードの変更が容易
3. **柔軟性**: 外部依存を簡単に置き換え可能（例：MySQLからPostgreSQLへの変更）
4. **スケーラビリティ**: ビジネスロジックが独立しているため、拡張が容易

## ライセンス

MIT
