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
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  clientCompanyName?: string | null;
  userCompanyKey: string;
  comment?: string | null;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
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
