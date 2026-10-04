import { baseApi } from "@/src/redux/api/baseApi";
import { TAG_TYPES } from "@/src/redux/api/tagTypes";
import type { DashboardOverviewData } from "@/src/types/dashboard";
import type { ApiResponse } from "@/src/types/common";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<DashboardOverviewData, void>({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.DASHBOARD_OVERVIEW],
      // DTO to ViewModel mapping pattern
      transformResponse: (response: ApiResponse<DashboardOverviewData>) => {
        return response?.data ?? { stats: [], recentActivities: [] };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetDashboardOverviewQuery } = dashboardApi;
