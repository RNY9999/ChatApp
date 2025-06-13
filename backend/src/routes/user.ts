import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// ユーザー一覧の取得
router.get('/', async (_req, res) => {
  try {
    const users = await prisma.user.findMany({ where: { deleted: false } });
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザー登録
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await prisma.user.create({ data: { username, password } });
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザー更新
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, password },
    });
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザー削除 (ソフトデリート)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { deleted: true },
    });
    res.status(200).json(deletedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
