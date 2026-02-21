# タスク完了時のチェック

- **リント**: `npm run lint` でエラー・警告がないこと
- **ビルド**: `npm run build` が成功すること
- **アーキテクチャ**: レイヤー間の依存が逆転していないこと（domain → application → infrastructure → presentation/app）
- **型**: TypeScript の型エラーがないこと（ビルドで確認）

テスト・フォーマット用の専用スクリプトは package.json に未定義。必要に応じて追加する。
