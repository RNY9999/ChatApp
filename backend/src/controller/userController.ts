import { Request, Response } from 'express';
import * as userService from '../services/postgres/userService';

// 型情報のimport
import {
  SelectOptions,
  CreateUser,
  UpdateUser,
  UpdateUserId,
  GetUsers,
  GetUserById,
  DeleteUserId,
  Options,
  defaultSelectOptions,
} from "../types/user.types"

// ユーザの新規登録
export const createUser = async (req: Request, res: Response) => {
  const role: string = req.body.role;
  const selectOptions: SelectOptions = { ...defaultSelectOptions };
  const createUserInfo: CreateUser = {
    username: String(req.body.username),
    global_display_name: String(req.body.global_display_name ?? null),
    password: String(req.body.password),
    icon_url: String(req.body.banner_url ?? null),
    admin_note: String(req.body.admin_note ?? null),
  };

  switch (role) {
    case 'user':
      // userの場合の処理を追記
      selectOptions.deleted = false;
      selectOptions.admin_note = false;
      break;
    case 'admin':
      // adminの場合の処理を追記
      // 現時点ではadmin側の処理は特になし
      break;
    default:
      return res.status(500).json({ message: 'unknown role: ', role });
  }
  const user = await userService.createUser(createUserInfo, selectOptions);
  return res.status(201).json(user);
};

// ユーザ情報の取得
export const getUsers = async (req: Request, res: Response) => {
  const role: string = req.body.role;
  const selectOptions: SelectOptions = { ...defaultSelectOptions };
  const searchData: GetUsers = {};
  // queryパラメータを確認
  
  // ids
  const queryIds: string[] | undefined = req.query.ids as string[];
  const searchIds: number[] = [];
  if (queryIds.length > 0) {
    queryIds.forEach((id) => {
      const parseIntId: number = parseInt(id, 10);
      if (isNaN(parseIntId)) {
        return res.status(500).json({ error: 'Invalid user ID' });
      }
      searchIds.push(parseIntId);
    });
    searchData.ids = searchIds;
  };

  // username
  const searchUsername = req.query.username as string;

  switch (role) {
    case 'user':
      // userの場合の処理を追記
      selectOptions.deleted = false;
      selectOptions.admin_note = false;
      break;
    case 'admin':
      // adminの場合の処理を追記
      // 現時点ではadmin側の処理は特になし
      break;
    default:
      return res.status(500).json({ message: 'unknown role: ', role });
  }

}