"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  logOut as sliceLogOut,
  selectCurrentRole,
  selectCurrentToken,
  selectCurrentUser,
  selectIsAuthenticated,
  setCredentials,
} from "@/src/redux/features/auth/authSlice";
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/src/redux/features/auth/authApi";
import { baseApi } from "@/src/redux/api/baseApi";
import type { LoginCredentials } from "@/src/types/auth";
import { getErrorMessage } from "@/src/lib/getErrorMessage";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const role = useAppSelector(selectCurrentRole);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loginTrigger, loginState] = useLoginMutation();
  const [logoutTrigger, logoutState] = useLogoutMutation();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await loginTrigger(credentials).unwrap();
      return response;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Login failed."));
    }
  };

  /**
   * Mock login helper for testing and rapid development without backend
   */
  const handleMockLogin = (mockRole: "ADMIN" | "USER" = "ADMIN") => {
    const dummyToken = "mock_jwt_token_for_template_testing";
    const dummyRefreshToken = "mock_refresh_token_for_template_testing";
    const mockUser = {
      id: "mock-1",
      name: mockRole === "ADMIN" ? "Super Admin" : "Standard User",
      email: mockRole === "ADMIN" ? "admin@dashboard.com" : "user@dashboard.com",
      role: mockRole,
    };

    dispatch(
      setCredentials({
        token: dummyToken,
        refreshToken: dummyRefreshToken,
        role: mockRole,
        user: mockUser,
      })
    );
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutTrigger().unwrap();
      }
    } catch {
      // Ignore API logout error and clear client state anyway
    } finally {
      dispatch(sliceLogOut());
      dispatch(baseApi.util.resetApiState());
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };

  return {
    user,
    token,
    role,
    isAuthenticated,
    login: handleLogin,
    mockLogin: handleMockLogin,
    logout: handleLogout,
    isLoginLoading: loginState.isLoading,
    isLogoutLoading: logoutState.isLoading,
    isLoading: loginState.isLoading || logoutState.isLoading,
  };
};
