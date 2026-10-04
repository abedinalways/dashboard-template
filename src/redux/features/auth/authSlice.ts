"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authCookieNames, normalizeAuthRole } from "@/src/lib/auth/config";
import type { AuthRole, User } from "@/src/types/auth";
import type { RootState } from "@/src/redux/store";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  role: AuthRole;
}

interface SetCredentialsPayload {
  user?: User | null;
  token: string;
  refreshToken?: string | null;
  role?: AuthRole;
}

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  return Cookies.get(name) ?? null;
};

const getInitialUser = (): User | null => {
  const role = normalizeAuthRole(getCookie(authCookieNames.role));
  const token = getCookie(authCookieNames.token);
  if (!token || !role) return null;

  return {
    id: "temp-id",
    name: role === "ADMIN" ? "Admin User" : "Demo User",
    email: role === "ADMIN" ? "admin@example.com" : "user@example.com",
    role,
  };
};

const initialState: AuthState = {
  token: getCookie(authCookieNames.token),
  refreshToken: getCookie(authCookieNames.refreshToken),
  role: normalizeAuthRole(getCookie(authCookieNames.role)),
  user: getInitialUser(),
};

const cookieOptions: Cookies.CookieAttributes = {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  expires: 7, // 7 days
};

const persistCookies = (token: string, refreshToken?: string | null, role?: AuthRole) => {
  Cookies.set(authCookieNames.token, token, cookieOptions);
  if (refreshToken) {
    Cookies.set(authCookieNames.refreshToken, refreshToken, cookieOptions);
  }
  if (role) {
    Cookies.set(authCookieNames.role, role, cookieOptions);
  }
};

const clearCookies = () => {
  Cookies.remove(authCookieNames.token, { path: "/" });
  Cookies.remove(authCookieNames.refreshToken, { path: "/" });
  Cookies.remove(authCookieNames.role, { path: "/" });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user = null, token, refreshToken = null, role = null } = action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.role = role ?? user?.role ?? null;
      state.user = user ?? (role ? { id: "1", name: role, email: `${role.toLowerCase()}@test.com`, role } : null);

      persistCookies(token, refreshToken, state.role);
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logOut: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.user = null;

      clearCookies();
    },
  },
});

export const { setCredentials, updateUser, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token && state.auth.role);

export default authSlice.reducer;
