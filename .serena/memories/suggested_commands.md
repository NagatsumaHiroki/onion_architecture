# 推奨コマンド（開発時）

## 開発サーバー・ビルド
- `npm run dev` — 開発サーバー起動 (http://localhost:3000)
- `npm run build` — 本番ビルド
- `npm run start` — 本番サーバー起動

## リント・品質
- `npm run lint` — ESLint 実行

## データベース（Prisma）
- `npm run db:generate` — Prisma クライアント生成
- `npm run db:migrate` — マイグレーション実行（開発）
- `npm run db:studio` — Prisma Studio (http://localhost:5555)
- `npm run db:seed` — シード実行

## Docker（DB セットアップ）
- `docker-compose up -d mysql` — MySQL のみ起動
- スキーマ変更後: `npx prisma generate` → `npx prisma migrate dev --name <説明>`

## システム（Darwin）
- `git`, `ls`, `cd`, `grep`, `find` 等は通常の Unix 系コマンドとして利用可能。
