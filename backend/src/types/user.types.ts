// '>=' | '>' | '=' | '<' | '<=' | '<>' = 'gte' | 'gt' | 'equals' | 'lt' | 'lte' | 'not'
export type Operator = 'gte' | 'gt' | 'equals' | 'lt' | 'lte' | 'not';

export type SelectOptions = {
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

export type CreateUser = {
  username: string,
  global_display_name?: string,
  password: string,
  icon_url?: string,
  banner_url?: string,
  admin_note?: string,
};

export type UpdateUser = {
  username?: string,
  global_display_name?: string,
  icon_url?: string,
  banner_url?: string,
  deleted?: boolean,
  admin_note?: string,
};

export type UpdateUserId = {
  id: number,
};

export type GetUsers = {
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

export type GetUserById = {
  id: number,
};

export type DeleteUserId = {
  id: number,
};

export type Options = {
  sortColumn?: string,
  sortType?: 'asc' | 'desc',
  limit?: number
};

export const defaultSelectOptions: SelectOptions = {
  id: true,
  username: true,
  global_display_name: true,
  icon_url: true,
  banner_url: true,
  deleted: true,
  admin_note: true,
  createdAt: true,
  updatedAt: true,
}