# encrews site operations

## 現在の公開状態

**2026-07-13に、ユーザーの明示的な依頼によりサイトを完全停止しました。**

実施内容:

- Cloudflare DNSから次のWeb用CNAMEを削除
  - `encrews.co.jp` → `encrews-site.pages.dev`（Proxied / TTL Auto）
  - `www.encrews.co.jp` → `encrews-site.pages.dev`（Proxied / TTL Auto）
- Cloudflare Pagesプロジェクトから `encrews.co.jp` と `www.encrews.co.jp` のカスタムドメイン連携を解除
- Cloudflare Pagesプロジェクト `encrews-site` を削除
- `encrews-site.pages.dev` を含むすべてのPagesデプロイを削除

停止後、次のホストが外部DNSで名前解決されないことを確認しています。

- `encrews.co.jp`
- `www.encrews.co.jp`
- `encrews-site.pages.dev`

## 保持したもの

- GitHubリポジトリ `yusei284/encrews-site`
- ローカル作業コピー `/Users/yusei/claude/encrews_site`
- Cloudflareの `encrews.co.jp` ゾーン
- Google Workspace用のメールDNS
  - MX: `1 smtp.google.com.`
  - SPF: `v=spf1 include:_spf.google.com ~all`
  - DMARC: `v=DMARC1; p=reject;`
  - DKIM、Googleサイト確認用TXTなど、Web公開と無関係な既存レコード

メール用DNSは削除しないでください。

## 削除前のCloudflare設定

| 項目 | 値 |
| --- | --- |
| Account ID | `439fae69e1920e0587a6c1379db71758` |
| Zone ID | `57d40145200cfd61db8129b58794bc5a` |
| Pages project | `encrews-site` |
| Production branch | `main` |
| デプロイ方式 | Direct Upload / Wrangler（Git連携なし） |
| Placement | Default |
| Compatibility date | 2026-05-09 |
| Compatibility flags | なし |
| Fail mode | Fail open |

削除前の最終本番デプロイは `aa437b9b-2d47-4a36-b9a7-fa05c162faf9`、ソースコミットは `7fa9da9` でした。デプロイ自体はPagesプロジェクトとともに削除済みです。

## 公開再開手順

再公開は外部公開を伴います。必ずユーザーの明示的な承認を得てから実施してください。

1. ソースを確認する。

   ```sh
   cd /Users/yusei/claude/encrews_site
   git status
   git log --oneline -10
   git switch main
   git pull --ff-only origin main
   ```

2. Node.js 22.12.0以上で依存関係を復元し、ビルドと目視確認を行う。

   ```sh
   npm ci
   npm run build
   npm run preview
   ```

3. 対象CloudflareアカウントへWranglerでログインする。

   ```sh
   wrangler login
   wrangler whoami
   ```

4. Direct UploadでPagesプロジェクトを再作成する。

   ```sh
   wrangler pages deploy dist/ --project-name encrews-site --branch main
   ```

   作成されたPagesホスト名とプロジェクト設定を管理画面で確認してください。過去と同じ `encrews-site.pages.dev` が確保されるとは限らないため、実際の値を正とします。

5. PagesのCustom domainsから次を追加する。

   - `encrews.co.jp`
   - `www.encrews.co.jp`

6. Cloudflareの案内に従い、apexと`www`のCNAMEを再作成する。

   - Content: 再作成後のPagesホスト名
   - Proxy status: Proxied
   - TTL: Auto

   MX・SPF・DKIM・DMARCなどのメールDNSには触れないでください。

7. カスタムドメインのActive化とSSL発行を待ち、次を確認する。

   - `https://encrews.co.jp/`
   - `https://www.encrews.co.jp/`
   - `/about`
   - `/b` から `/` への301リダイレクト
   - モバイルとデスクトップの表示
   - MX・SPF・DKIM・DMARCが維持されていること

## 通常の変更時の注意

- `dist/` を直接編集しない。
- 本番トップで使う `components/b/*`、`Work.astro`、`Cases.astro`、`Footer.astro` を未使用と誤認して削除しない。
- 住所・連絡先を変更する場合は、AboutとFooterを同時に更新する。
- 公開停止中は、PRのマージやGitHubへのpushだけでは再公開されない。ただし `wrangler pages deploy` はPagesプロジェクトを再作成し得るため、承認なしに実行しない。
