const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value == null) return fallback;
  return !["0", "false", "no", "off"].includes(value.toLowerCase());
};

export const env = {
  // Public client-side configs
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api"
  ),
  isDesignMode: toBoolean(process.env.NEXT_PUBLIC_DESIGN_MODE, false),
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Dashboard Template",

  // Server-only configs (NOT prefixed with NEXT_PUBLIC_ for security)
  jwtSecret: process.env.JWT_SECRET ?? "default_development_secret_change_in_production",
};
