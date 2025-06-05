import { Router } from 'express';
import prisma from '../prisma';
import User from '../models/user';

const router = Router();

// ユーザ詳細の取得
router.get('/detail/:id', async (req, res): Promise<void> => {
  console.log('Fetching user details for ID:', req.params.id);
  const id: number = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
      return;
    } else {
      console.log('User details fetched:', user);
      res.status(200).json(user);
    }

  } catch (error: any) {
    console.error('Error fetching user details: ', error);
    res.status(500).json({ error: error.message });
  }

});

// ユーザー一覧の取得 PostgreSQL
router.get('/getList', async (req, res): Promise<void> => {
  console.log('Fetching user list');
  try {
      const users = await prisma.user.findMany({
          select: {
              id: true,
              username: true,
              password: true,
              deleted: true,
              createdAt: true,
              updatedAt: true,
          },
          orderBy: {
              id: 'desc',
          }
      });
      res.status(200).json(users);
  } catch (err: any) {
      console.error('Error fetching users:', err);
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

// ユーザ削除
router.post('/delete/:id', async (req, res): Promise<void> => {
  console.log('Deleting user with ID: ', req.params.id);
  const id: number = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log('User not found for deletion');
      res.status(404).json({ error: 'User not found' });
      return;
    };

    if (user.deleted) {
      console.log('User already deleted');
      res.status(400).json({ error: 'User already deleted' });
      return;
    }

    // 論理削除
    const deletedUser = await prisma.user.update({
      where: { id },
      data: { deleted: true},
    });

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    return;
  } catch (err: any) {
    console.error('Error deleting user: ', err);
    res.status(500).json({ error: err.message });
    return;
  }
});

export default router;