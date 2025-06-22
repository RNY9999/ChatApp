import { Request, Response } from 'express';
import * as userService from '../services/postgres/userService';

// ユーザの新規登録
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    console.error('Error creating user: ', error);
    res.status(500).json({ message: 'ユーザ作成に失敗しました'});
  }
};