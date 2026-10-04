import { baseApi } from "@/src/redux/api/baseApi";
import { TAG_TYPES } from "@/src/redux/api/tagTypes";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  User,
} from "@/src/types/auth";
import type { ApiResponse } from "@/src/types/common";
import { setCredentials } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.tokens?.accessToken) {
            dispatch(
              setCredentials({
                token: data.tokens.accessToken,
                refreshToken: data.tokens.refreshToken,
                user: data.user,
                role: data.user.role,
              })
            );
          }
        } catch {
          // Handled in caller component via .unwrap()
        }
      },
      invalidatesTags: [TAG_TYPES.USER, TAG_TYPES.PROFILE],
    }),

    register: builder.mutation<ApiResponse<User>, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.USER, TAG_TYPES.PROFILE],
    }),

    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.PROFILE],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
