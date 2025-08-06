import { Prisma } from '@prisma/client';
import { prisma } from '@lib/prisma';

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
} from "../../types/user.types"
/**
 * todo
 * ・ページネーション対応：pageとlimitによるリスト分割
 * ・トランザクション対応：複数のDB操作をまとめて実行
 * ・Prismaのmiddleware活用：ログ出力や共通バリデーションなど
 * ・Where句の別ファイルへの切り分け：共通関数として再利用性を高める
 */


// ユーザの作成
export const createUser = async (
  data: CreateUser,
  selectOptions: SelectOptions = defaultSelectOptions
) => {
  return await prisma.user.create({
    select: selectOptions,
    data: data,
  });
};

// 複数ユーザの取得
export const getUsers = async (
  searchData: GetUsers, 
  options: Options,
  selectOptions: SelectOptions = defaultSelectOptions
) => {
  const {
    ids, 
    username, 
    username_like, 
    global_display_name, 
    global_display_name_like, 
    deleted, 
    compCreatedAt, 
    createdAtOperator, 
    compUpdatedAt, 
    updatedAtOperator
  } = searchData;
  const { sortColumn, sortType, limit } = options;

  // where句の組み立て
  const where: Prisma.UserWhereInput = {};

  if (ids && ids.length > 0) {
    where.id = {
      in: ids,
    };
  }

  if (username) {
    where.username = username;
  }

  if (username_like) {
    where.username = {
      contains: username_like,
      mode: 'insensitive', // 大文字・小文字を区別しない
    };
  }

  if (global_display_name) {
    where.global_display_name = global_display_name;
  }

  if (global_display_name_like) {
    where.global_display_name = {
      contains: global_display_name_like,
      mode: 'insensitive',
    };
  }

  if (deleted !== undefined) {
    where.deleted = deleted;
  }

  if (compCreatedAt && createdAtOperator) {
    where.createdAt = {
      [createdAtOperator]: new Date(compCreatedAt),
    };
  }

  if (compUpdatedAt && updatedAtOperator) {
    where.updatedAt = {
      [updatedAtOperator]: new Date(compUpdatedAt),
    };
  }

  return await prisma.user.findMany({
    select: selectOptions,
    where,
    orderBy: sortColumn && sortType ? { [sortColumn]: sortType }: undefined,
    take: limit ?? undefined,
  });
};

// idによるユーザ1人の取得
export const getUserById = async (
  searchData: GetUserById,
  selectOptions: SelectOptions = defaultSelectOptions
) => {
  const { id } = searchData;
  return prisma.user.findUnique({
    select: selectOptions,
    where: {
      id: id,
    },
  })
};

// ユーザのアップデート
export const updateUser = async (
  data: UpdateUser,
  searchData: UpdateUserId
) => {
  const { id } = searchData;
  return prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
}

// ユーザの削除（論理削除）
export const deleteUser = async (
  searchData: DeleteUserId
) => {
  const { id } = searchData;
  return prisma.user.update({
    where: { id: id },
    data: { deleted: true },
  });
};