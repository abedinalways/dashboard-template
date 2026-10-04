import type { AuthRole } from "@/src/types/auth";

export const authCookieNames = {
  token: "dash_auth_token",
  refreshToken: "dash_refresh_token",
  role: "dash_auth_role",
} as const;

export const authRoutes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  adminDashboard: "/admin/dashboard",
  userDashboard: "/user/dashboard",
} as const;

export const normalizeAuthRole = (role?: string | null): AuthRole => {
  if (role === "ADMIN" || role === "USER") {
    return role;
  }
  return null;
};

export const getDefaultRouteForRole = (role?: string | null): string => {
  const normalized = normalizeAuthRole(role);
  if (normalized === "ADMIN") return authRoutes.adminDashboard;
  if (normalized === "USER") return authRoutes.userDashboard;
  return authRoutes.login;
};

export const isAllowedRedirectForRole = (
  role: AuthRole,
  pathname?: string | null
): boolean => {
  if (!pathname || !pathname.startsWith("/")) return false;

  if (role === "ADMIN") {
    return pathname.startsWith("/admin");
  }
  if (role === "USER") {
    return pathname.startsWith("/user");
  }
  return false;
};

export const resolvePostLoginPath = (
  role: AuthRole,
  requestedPath?: string | null
): string => {
  if (isAllowedRedirectForRole(role, requestedPath)) {
    return requestedPath!;
  }
  return getDefaultRouteForRole(role);
};
