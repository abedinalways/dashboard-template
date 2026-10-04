export type AuthRole = "ADMIN" | "USER" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  avatarUrl?: string;
  phone?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokenPayload {
  sub?: string;
  email?: string;
  role?: string;
  type?: string;
  exp?: number;
  iat?: number;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenResponse {
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}
