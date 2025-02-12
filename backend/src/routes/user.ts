import { Router } from 'express';
import User from '../models/user';

const router = Router();

// ユーザー登録
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;