export type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userCompanyKey: string;
  password: string;
  confirmPassword?: string;
};

export type LoginFormDataType = {
  email: string;

  password: string;
};

export type CreateClientDataType = {
  name: string;
  tel: string;
  email: string;
  website: string;
  userCompanyKey: string;
  authorId: string;
  comment: string;
  company: string;
};

// Тип для клиента

export interface Client {
  id?: number;
  name: string;
  phone?: string;
  email: string;
  website?: string;
  company?: string;
  userCompanyKey: string;
  comment?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
  authorId: string;
}

export interface Deal {
  id?: number;
  name: string;
  clientId?: number;
  description?: string;
  status?: string;
  amount?: number;
  userCompanyKey: string;

  created_at?: string;
  update_at?: string;

  authorId: string;
}

export interface Task {
  id?: number;
  name: string;

  description?: string;
  deadline?: string;
  dealId?: number;
  executor?: string;
  status?: string;
  amount?: number;

  created_at?: string;
  update_at?: string;
  finish_at?: string;
  userCompanyKey: string;
  authorId: string;
}

export type ColumnDefinition<T> = {
  key: string;
  label: string;
  render?: (value: string | number, row: T) => React.ReactNode;
};

export interface TokenDataI {
  userId: string;
  userCompanyKey: string;
}

// Тип для сделки
// export interface Deal {
//   id?: number;
//   dealName: string;
//   clientId: number;
//   amount?: number | null;
//   status?: string | null;
//   userCompanyKey: string;

// }

// Тип для задачи
// export interface Task {
//   id?: number;
//   taskName: string;
//   clientId?: number | null;
//   dealId?: number | null;
//   dueDate?: string | null;
//   status?: string | null;
//   userCompanyKey: string;

// }
