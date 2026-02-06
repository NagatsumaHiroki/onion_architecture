# セットアップガイド

このガイドでは、オニオンアーキテクチャーサンプルをMySQLデータベースと共にセットアップする方法を説明します。

## 前提条件

- Node.js 20以上
- Docker & Docker Compose（推奨）
- または、ローカルにMySQL 8.0以上

## セットアップ方法

### 方法1: Docker Composeを使用（推奨・最も簡単）

すべてのサービス（MySQL + アプリ）をDockerで起動します。

```bash
# プロジェクトディレクトリに移動
cd onion-architecture-sample

# すべてのサービスを起動
docker-compose up -d

# ログを確認
docker-compose logs -f app
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

**データベース接続情報:**
- ホスト: localhost
- ポート: 3306
- データベース: todoapp
- ユーザー: todouser
- パスワード: todopassword

### 方法2: DockerのMySQLを使用 + ローカルでアプリを起動

MySQLのみDockerで起動し、アプリはローカルで開発します。

#### ステップ1: MySQLコンテナを起動

```bash
docker-compose up -d mysql
```

MySQLが起動するまで待ちます（約30秒）。以下のコマンドで確認できます：

```bash
docker-compose logs mysql
```

`ready for connections` というメッセージが表示されればOKです。

#### ステップ2: 環境変数を設定

`.env` ファイルを作成します：

```bash
cp .env.template .env
```

`.env` ファイルの内容：

```env
DATABASE_URL="mysql://todouser:todopassword@localhost:3306/todoapp"
NODE_ENV="development"
```

#### ステップ3: 依存関係をインストール

```bash
npm install
```

#### ステップ4: Prismaクライアントを生成

```bash
npx prisma generate
```

#### ステップ5: データベースマイグレーション

```bash
npx prisma migrate dev --name init
```

#### ステップ6: 開発サーバーを起動

```bash
npm run dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

### 方法3: ローカルMySQLを使用

既にMySQLがローカルにインストールされている場合。

#### ステップ1: データベースとユーザーを作成

MySQLにログインして以下を実行：

```sql
CREATE DATABASE todoapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'todouser'@'localhost' IDENTIFIED BY 'todopassword';
GRANT ALL PRIVILEGES ON todoapp.* TO 'todouser'@'localhost';
FLUSH PRIVILEGES;
```

#### ステップ2: 環境変数を設定

`.env` ファイルを作成：

```env
DATABASE_URL="mysql://todouser:todopassword@localhost:3306/todoapp"
NODE_ENV="development"
```

#### ステップ3: 依存関係をインストール

```bash
npm install
```

#### ステップ4: Prismaクライアントを生成

```bash
npx prisma generate
```

#### ステップ5: データベースマイグレーション

```bash
npx prisma migrate dev --name init
```

#### ステップ6: 開発サーバーを起動

```bash
npm run dev
```

## データベース管理

### Prisma Studio（データベースGUI）

データベースの内容を視覚的に確認・編集できます：

```bash
npm run db:studio
```

ブラウザで [http://localhost:5555](http://localhost:5555) が開きます。

### マイグレーション

新しいマイグレーションを作成：

```bash
npx prisma migrate dev --name 変更内容の説明
```

マイグレーションを本番環境に適用：

```bash
npx prisma migrate deploy
```

### データベースをリセット

開発中にデータベースをリセットしたい場合：

```bash
npx prisma migrate reset
```

**注意**: これはすべてのデータを削除します！

## トラブルシューティング

### MySQLに接続できない

**Docker使用時:**

```bash
# MySQLコンテナが起動しているか確認
docker-compose ps

# MySQLのログを確認
docker-compose logs mysql

# MySQLコンテナを再起動
docker-compose restart mysql
```

**ローカルMySQL使用時:**

```bash
# MySQLサービスが起動しているか確認
mysql -u todouser -p -h localhost
# パスワード: todopassword

# 接続できたら、データベースを確認
SHOW DATABASES;
```

### マイグレーションエラー

```bash
# Prismaクライアントを再生成
npx prisma generate

# データベースをリセット（開発環境のみ）
npx prisma migrate reset

# マイグレーションを再実行
npx prisma migrate dev
```

### ポート3306が既に使用されている

ローカルにMySQLが既に起動している場合、docker-compose.ymlでポートを変更：

```yaml
services:
  mysql:
    ports:
      - "3307:3306"  # ホスト側を3307に変更
```

その場合、`.env`ファイルも更新：

```env
DATABASE_URL="mysql://todouser:todopassword@localhost:3307/todoapp"
```

## 次のステップ

セットアップが完了したら：

1. [http://localhost:3000](http://localhost:3000) にアクセス
2. Todoを作成してみる
3. `ARCHITECTURE.md` でアーキテクチャーを学ぶ
4. コードを探索して、オニオンアーキテクチャーを理解する

楽しい開発を！ 🚀

