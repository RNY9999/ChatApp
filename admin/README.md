## adminサーバ

### NEXTプロジェクト作成

```bash
# プロジェクトの作成
npx create-next-app@latest . --ts

# 各設定
? Would you like to use ESLint? » No / Yes => [yes]
? Would you like to use Tailwind CSS? » No / Yes => [no]
? Would you like your code inside a `src/` directory? » No / Yes => [yes]
? Would you like to use App Router? (recommended) » No / Yes => [yes]
? Would you like to use Turbopack for `next dev`? » No / Yes => [yes]
? Would you like to customize the import alias (`@/*` by default)? » No / Yes => [no]
```

### サーバ設定

package.json内の設定
```
# portの指定

"dev": "next dev -p 3010 --turbopack"
```

