import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/src/lib/env";
import { logOut, setCredentials } from "@/src/redux/features/auth/authSlice";
import type { RootState } from "@/src/redux/store";
import { tagTypesList } from "./tagTypes";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;

    headers.set("Accept", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

let refreshPromise: Promise<QueryReturnValue<unknown, FetchBaseQueryError>> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const isRefreshRequest =
    typeof args === "object" && "url" in args
      ? args.url === "/auth/refresh-token"
      : args === "/auth/refresh-token";

  if (result.error?.status === 401 && !isRefreshRequest) {
    const state = api.getState() as RootState;
    const { token, refreshToken, role, user } = state.auth;

    if (refreshToken) {
      try {
        if (!refreshPromise) {
          refreshPromise = Promise.resolve(
            rawBaseQuery(
              {
                url: "/auth/refresh-token",
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions
            )
          );
        }

        const refreshResult = await refreshPromise;
        refreshPromise = null;

        if (refreshResult.data && typeof refreshResult.data === "object") {
          const data = refreshResult.data as {
            tokens?: { accessToken: string; refreshToken?: string };
            accessToken?: string;
          };

          const newAccessToken = data.tokens?.accessToken ?? data.accessToken;
          const newRefreshToken = data.tokens?.refreshToken ?? refreshToken;

          if (newAccessToken) {
            api.dispatch(
              setCredentials({
                token: newAccessToken,
                refreshToken: newRefreshToken,
                role,
                user,
              })
            );

            // Retry original query with the refreshed access token
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            throw new Error("No access token returned from refresh endpoint.");
          }
        } else {
          throw new Error("Session refresh failed.");
        }
      } catch {
        refreshPromise = null;
        api.dispatch(logOut());

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    } else {
      api.dispatch(logOut());
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
