export enum UserTypeEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export interface ISessionUser {
  id: string;
  email: string;
  type: UserTypeEnum;
}
