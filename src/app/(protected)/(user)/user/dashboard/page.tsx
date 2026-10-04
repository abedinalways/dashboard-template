"use client";

import React from "react";
import { DashboardShell } from "@/src/components/layout/DashboardShell";
import { StatCard } from "@/src/components/common/StatCard";
import { useAuth } from "@/src/hooks/useAuth";
import { FolderGit2, Star, Clock, CheckCircle } from "lucide-react";

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-brand-600 to-indigo-600 text-white shadow-md space-y-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
            Standard User Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {user?.name ?? "User"}!
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-lg">
            This dashboard demonstrates role-based isolation. Standard users have access to personal projects, resources, and settings without admin privileges.
          </p>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="My Projects"
            value="8"
            changePercentage={12}
            period="vs last quarter"
            icon={<FolderGit2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          />
          <StatCard
            title="Saved Bookmarks"
            value="34"
            icon={<Star className="w-5 h-5 text-amber-500" />}
            iconBgColor="bg-amber-50 dark:bg-amber-950/40"
          />
          <StatCard
            title="Hours Logged"
            value="142 hrs"
            changePercentage={5.4}
            icon={<Clock className="w-5 h-5 text-emerald-500" />}
            iconBgColor="bg-emerald-50 dark:bg-emerald-950/40"
          />
        </div>

        {/* Instructions Card */}
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Role Guard Testing
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            If you try to manually navigate to <code>/admin/dashboard</code> in the URL bar, the Next.js edge route guard (<code>proxy.ts</code>) will automatically detect your <strong>USER</strong> role and bounce you back to this authorized dashboard!
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
