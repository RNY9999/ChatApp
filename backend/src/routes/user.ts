import { Router } from 'express';
import prisma from '../prisma';
import User from '../models/user';
import { uploadBanner, uploadIcon } from '../middleware/upload';
import fs from 'fs';
import path from 'path';
import { error } from 'console';

const router = Router();

/**
 * Userテーブルに対するCRUD操作
 */

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

// ユーザアップデート
router.put('/update/:id', async (req, res): Promise<void> => {
  console.log('update user : ' , req.params.id);
  const id: number = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  const username: string = req.body.username;
  const password: string = req.body.password;
  let deleted: boolean = false;
  if (req.body.deleted === 'true') {
    deleted = true;
  }

  try {
    console.log('update start');
    await prisma.user.update({
      where: {id},
      data: {
        username: username,
        password: password,
        deleted: deleted,
      }
    })
    res.status(200).json({ message: 'User updated successfully' });
  } catch(error: any) {
    res.status(500).json({ error: error.message });
    return;
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

// バナー画像のアップロード
router.post('/upload/banner/:id', uploadBanner.single('banner'), async(req, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'ファイルが選択されていません' });
      return;
    }

    const userId = parseInt(req.params.id, 10);
    const bannerUrl = `/banner/${req.file.filename}`;

    // 既存のバナー画像を削除
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { banner_url: true }
    });

    if (existingUser?.banner_url) {
      const oldFilePath = path.join(__dirname, '../public', existingUser.banner_url);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // データベースを更新
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { banner_url: bannerUrl },
      select: {
        id: true,
        username: true,
        global_display_name: true,
        icon_url: true,
        banner_url: true
      }
    });

    res.status(200).json( {message: 'バナー画像がアップロードされました。'});
    return;
  } catch (error: any) {
    // エラー時はアップロードされたファイルを削除
    if (req.file) {
      const filePath = path.join(__dirname, '../public/banner', req.file.fieldname);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ error: error.message });
    return;
  }
});

export default router;