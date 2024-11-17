export enum Token {
  Access = 'access',
  Refresh = 'refresh',
}

export enum Roles {
  User = 'user',
  Admin = 'admin',
}

export enum Scopes {
  Read = 'read',
  Write = 'write',
}

type VerifyTokenSuccessResult<T> = { isValid: true; payload: T };
type VerifyTokenFailResult = { isValid: false; payload: null };

export type VerifyTokenResult<T> = VerifyTokenSuccessResult<T> | VerifyTokenFailResult;
