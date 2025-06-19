import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;
console.log(process.env.MESSAGE);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});