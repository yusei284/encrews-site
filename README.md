# encrews corporate site

株式会社エンクルーズ（encrews）のコーポレートサイトです。

> [!IMPORTANT]
> **公開状態: 停止中（2026-07-13〜）**
>
> Cloudflare PagesプロジェクトとWeb用DNSレコードは意図的に削除されています。
> `wrangler pages deploy` を実行すると再公開につながるため、明示的な承認なしにデプロイしないでください。

公開停止の内容と復旧手順は [docs/operations.md](docs/operations.md) を参照してください。

## 構成

- Astro 6
- Tailwind CSS 4
- Node.js 22.12.0以上
- 静的サイト（バックエンド・データベース・APIなし）
- 本番採用デザイン: B（Documentary Story）

主なページはトップ `/` と会社概要 `/about` です。`/b` はトップへの301リダイレクト、`/a` と `/c` は採用されなかったデザイン案です。

## 開発

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`dist/` はビルド生成物です。直接編集しないでください。

## 本番トップの構成

`src/pages/index.astro` は次のコンポーネントを使用します。

1. `src/components/b/HeaderB.astro`
2. `src/components/b/HeroB.astro`
3. `src/components/b/NameMeaningB.astro`
4. `src/components/b/StoryB.astro`
5. `src/components/Work.astro`
6. `src/components/Cases.astro`
7. `src/components/b/CTAB.astro`
8. `src/components/Footer.astro`

会社住所と連絡先は `src/pages/about.astro` と `src/components/Footer.astro` の両方に存在します。変更時は必ず整合させてください。

## ソース管理

- GitHub: `yusei284/encrews-site`
- 通常ブランチ: `main`
- ローカル作業コピー: `/Users/yusei/claude/encrews_site`

公開再開時は、コード・Git履歴・[運用手順](docs/operations.md)を照合してからCloudflareを再構築してください。
