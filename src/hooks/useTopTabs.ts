"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Manages active tab state synced with URL search params (?tab=key).
 */
export function useTopTabs<T extends string>(defaultTab: T, paramName: string = "tab") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = (searchParams.get(paramName) as T) || defaultTab;

  const setTab = useCallback(
    (newTab: T) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, newTab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, paramName]
  );

  return [currentTab, setTab] as const;
}
