export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export enum AUTH_ACTIONS {
  SIGN_IN = 'SIGN_IN',
  DASH_BOARD = 'DASH_BOARD',
  HOME = 'HOME',
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  MEMBER = 'member',
  PERSONAL = 'personal',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
