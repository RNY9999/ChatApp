import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';

dotenv.config();

const app = express();

if (process.env.DEV_FRONTEND_URL && process.env.DEV_ADMIN_URL) {
  app.use(
    cors({
      origin: [process.env.DEV_FRONTEND_URL, process.env.DEV_ADMIN_URL],
      credentials: true,
    })
  );
}

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (_req, res) => {
  res.send('Hello Express!');
});

export default app;
