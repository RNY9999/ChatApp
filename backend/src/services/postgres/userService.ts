import { Prisma } from '@prisma/client';
import { prisma } from '@lib/prisma';
/**
 * todo
 * ・ページネーション対応：pageとlimitによるリスト分割
 * ・トランザクション対応：複数のDB操作をまとめて実行
 * ・Prismaのmiddleware活用：ログ出力や共通バリデーションなど
 * ・Where句の別ファイルへの切り分け：共通関数として再利用性を高める
 */
// '>=' | '>' | '=' | '<' | '<=' | '<>' = 'gte' | 'gt' | 'equals' | 'lt' | 'lte' | 'not'
type Operator = 'gte' | 'gt' | 'equals' | 'lt' | 'lte' | 'not'
type SelectOptions = {
  id?: boolean,
  username?: boolean,
  global_display_name?: boolean,
  icon_url?: boolean,
  banner_url?: boolean,
  deleted?: boolean,
  admin_note?: boolean,
  createdAt?: boolean,
  updatedAt?: boolean,
};

type CreateUser = {
  username: string,
  global_display_name?: string,
  password: string,
  icon_url?: string,
  banner_url?: string,
  admin_note?: string,
};

type UpdateUser = {
  username?: string,
  global_display_name?: string,
  icon_url?: string,
  banner_url?: string,
  deleted?: boolean,
  admin_note?: string,
};

type UpdateUserId = {
  id: number,
};

type GetUsers = {
  ids?: number[],
  username?: string,
  username_like?: string,
  global_display_name?: string,
  global_display_name_like?: string,
  deleted?: boolean,
  compCreatedAt?: string,
  createdAtOperator?: Operator,
  compUpdatedAt?: string,
  updatedAtOperator?: Operator,
};

type GetUserById = {
  id: number,
};

type DeleteUserId = {
  id: number,
};

type Options = {
  sortColumn?: string,
  sortType?: 'asc' | 'desc',
  limit?: number
};

const defaultSelectOptions: SelectOptions = {
  id: false,
  username: false,
  global_display_name: false,
  icon_url: false,
  banner_url: false,
  deleted: false,
  admin_note: false,
  createdAt: false,
  updatedAt: false,
}

// ユーザの作成
export const createUser = async (data: CreateUser) => {
  return await prisma.user.create({
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

// idによるユーザ一人の取得
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