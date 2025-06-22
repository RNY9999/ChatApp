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
export default app;