■バックエンド環境構築

■事前準備
```bash
// backendディレクトリの作成
mkdir backend
cd backend

// プロジェクトの初期か
npm init -y
```

■Expressの環境構築
・Expressのインストール

```bash
// Expressのインストール
npm i express

// typescriptの設定
npm install --save-dev typescript @types/express @types/node ts-node nodemon

// tsconfig.jsonの作成
npx tsc --init
```

・Expressのディレクトリ構造
```
backend/
├── src/
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```