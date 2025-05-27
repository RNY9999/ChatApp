import { Router } from 'express';
import User from '../models/user';

const router = Router();


// ユーザー一覧の取得
router.get('/getList', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザー登録
router.post('/register', async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;