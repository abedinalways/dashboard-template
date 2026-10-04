"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Manages active tab state synced with URL search params (?tab=key)
 * and optional sessionStorage persistence across refreshes.
 */
export function useTopTabs<T extends string>(
  defaultTab: T,
  paramName: string = "tab",
  storageKey?: string
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = useMemo(() => {
    const urlTab = searchParams.get(paramName) as T | null;
    if (urlTab) return urlTab;

    if (typeof window !== "undefined" && storageKey) {
      const stored = sessionStorage.getItem(`dash_tab_${storageKey}`) as T | null;
      if (stored) return stored;
    }

    return defaultTab;
  }, [searchParams, paramName, defaultTab, storageKey]);

  const setTab = useCallback(
    (newTab: T) => {
      if (typeof window !== "undefined" && storageKey) {
        sessionStorage.setItem(`dash_tab_${storageKey}`, newTab);
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, newTab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, paramName, storageKey]
  );

  return [currentTab, setTab] as const;
}

/**
 * Backward-compatible alias matching `useTabsQueryState` from zvonsystem-dashboard
 */
export function useTabsQueryState<T extends string>(
  queryKey: string,
  defaultKey: T,
  storageKey?: string
) {
  return useTopTabs<T>(defaultKey, queryKey, storageKey);
}
