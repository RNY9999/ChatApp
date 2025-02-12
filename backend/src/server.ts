import app from './app';
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log(process.env.MESSAGE);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});