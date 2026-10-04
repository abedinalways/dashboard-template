"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/src/context/SidebarContext";
import { useAuth } from "@/src/hooks/useAuth";
import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Layers,
  Component,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar, isMobileOpen, closeMobileSidebar } = useSidebar();
  const { role, logout, user } = useAuth();

  const adminNavItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Component Library", href: "/admin/dashboard/components", icon: Component },
    { label: "User Management", href: "/admin/dashboard/users", icon: Users },
    { label: "System Settings", href: "/admin/dashboard/settings", icon: Settings },
  ];

  const userNavItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { label: "Settings", href: "/user/dashboard/settings", icon: Settings },
  ];

  const navItems = role === "ADMIN" ? adminNavItems : userNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200/80 dark:border-gray-800 transition-all duration-300 ease-in-out",
          isExpanded ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Floating Toggle Button on the Right Border (Desktop) */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-5 z-50 h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-200 cursor-pointer"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronLeft
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300",
              !isExpanded && "rotate-180"
            )}
          />
        </button>

        {/* Brand Header */}
        <div
          className={cn(
            "flex items-center h-16 border-b border-gray-100 dark:border-gray-800 transition-all duration-300",
            isExpanded ? "justify-start px-4" : "justify-center px-0"
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 overflow-hidden",
              !isExpanded && "justify-center w-full"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs font-bold text-lg">
              <Layers className="w-5 h-5 shrink-0" />
            </div>

            {isExpanded && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white truncate">
                  DashTemplate
                </span>
                <span className="text-[11px] text-gray-400 font-medium truncate">
                  {role === "ADMIN" ? "Admin Portal" : "User Portal"}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                className={cn(
                  "menu-item",
                  isActive ? "menu-item-active" : "menu-item-inactive",
                  !isExpanded && "w-10 h-10 p-0 mx-auto justify-center rounded-xl"
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-500"
                  )}
                />
                {isExpanded && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile & Logout */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
          {isExpanded && user && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-semibold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={logout}
            className={cn(
              "flex items-center w-full gap-3 px-3 py-2 text-xs font-medium rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer",
              !isExpanded && "w-10 h-10 p-0 mx-auto justify-center rounded-xl"
            )}
            title={!isExpanded ? "Log out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isExpanded && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
