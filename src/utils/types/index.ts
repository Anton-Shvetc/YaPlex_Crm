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

export interface UserI {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  email: string;
  avatar: string;
  userCompanyKey: string;
}

export interface DecodedToken {
  userId: string;
  userCompanyKey: string;
}

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
  dealsCount?: number;
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
  finish_at?: string;

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

export interface ButtonStatePropsI {
  text: string;
  onClick?: () => void;
  variant?: string;
}

export interface StatisticsI {
  name: string;
  on_today: number;
  today: number;
  week: number;
  month: number;
  quarter: number;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ConnectedAccount {
  id: string;
  type: "vk" | "google";
  connected: boolean;
  username?: string;
}

export interface MainPageInfoDesktopI {
  statisticsTableData: StatisticsI[];
  clients: Client[];
  deals: Deal[];
  tasks: Task[];
}


export interface LoginPageInfoI {
  showMobileForm: boolean;
  setActiveForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
  activeForm: string;
  setShowMobileForm: React.Dispatch<React.SetStateAction<boolean>>;
}


export type EntityType = "client" | "deal" | "task";
// type PageType = "clients" | "deals" | "tasks";

export type EntityFormMap = {
  client: Client;
  deal: Deal;
  task: Task;
};

export type EntityTableRowMap = {
  client: Client;
  deal: Deal;
  task: Task;
};