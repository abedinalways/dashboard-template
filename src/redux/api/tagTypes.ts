export const TAG_TYPES = {
  USER: "User",
  PROFILE: "Profile",
  DASHBOARD_OVERVIEW: "DashboardOverview",
  SETTINGS: "Settings",
  NOTIFICATIONS: "Notifications",
} as const;

export const tagTypesList = Object.values(TAG_TYPES);
