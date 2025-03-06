import express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import userRoutes from './routes/user';
import cors from 'cors';

// .envファイルの読み込み
dotenv.config();

const app = express();

// CORSの設定
app.use(cors({
  origin: process.env.DEV_FRONTEND_URL,
  credentials: true,
}));

// ミドルウェアの設定
app.use(express.json());

// ルートの設定
// サーバに対してリクエストがあった際に、console.logで表示する


app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello Express!');
  console.log('hello');
});

const mongoOptions: ConnectOptions = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};

// MongoDBの接続
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, mongoOptions)
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err: Error) => {
  console.error(err);
})

export default app;