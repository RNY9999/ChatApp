import express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import userRoutes from './routes/user';
import cors from 'cors';
import path from 'path';

// .envファイルの読み込み
dotenv.config();

const app = express();

// CORSの設定
if (process.env.DEV_FRONTEND_URL && process.env.DEV_ADMIN_URL) {
  app.use(cors({
    origin: [process.env.DEV_FRONTEND_URL, process.env.DEV_ADMIN_URL],
    credentials: true,
  }));
}

// ミドルウェアの設定
app.use(express.json());

// 静的ファイルの公開
app.use('/public', express.static(path.join(__dirname, 'public')));

// ルートの設定
// サーバに対してリクエストがあった際に、console.logで表示する

app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.send('this is test');
  console.log('this is test too');
})

app.get('/', (req, res) => {
  res.send('Hello Express!');
  console.log('hello');
});

const mongoOptions: ConnectOptions = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

// MongoDBの接続
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`, mongoOptions)
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err: Error) => {
  console.error(err);
})

export default app;