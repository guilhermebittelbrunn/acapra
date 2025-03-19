export enum UserTypeEnum {
  USER = 'user',
  ADMIN = 'admin',
  PARTNER = 'partner',
}

export interface ISessionUser {
  id: string;
  email: string;
  type: UserTypeEnum;
}
