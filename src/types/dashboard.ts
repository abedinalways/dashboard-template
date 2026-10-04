export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  changePercentage: number;
  isPositive: boolean;
  period: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

export interface DashboardOverviewData {
  stats: DashboardStat[];
  recentActivities: ActivityItem[];
}
