import express from 'express';
import path from 'path';
import applyMiddleWare from './middleware/index';
import routes from './routes/index';
import { IS_DEV } from './lib/env';

const app = express();

// ミドルウェアの適用
applyMiddleWare(app);

// 静的ファイル
app.use('/public', express.static(path.join(__dirname, 'public')));

// ルーティング
app.use('/api', routes);

if (IS_DEV) {
  // 開発環境時限定のルーティング
  app.get('/test', (_, res) => {
    res.send('hello Express');
  })
}

// 共通エラーハンドラ
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('エラー発生: ', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message ?? 'This error has no information'})
});

export default app;