export const JWT_DEFAULT_STRATEGY = 'jwt';

export const JWT_REFRESH_STRATEGY = 'jwt-refresh';

export interface ITokenPayload {
  sub: string;
  email: string;
  type: string;
  iat: number;
  exp: number;
}
