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
