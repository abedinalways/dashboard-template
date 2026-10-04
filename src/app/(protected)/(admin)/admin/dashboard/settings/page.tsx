"use client";

import React, { Suspense } from "react";
import { DashboardShell } from "@/src/components/layout/DashboardShell";
import TopTabs, { TabItem } from "@/src/components/common/TopTabs";
import { useTopTabs } from "@/src/hooks/useTopTabs";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Shield, Bell, User, Check, Key } from "lucide-react";
import toast from "react-hot-toast";

type SettingsTab = "general" | "security" | "notifications";

function SettingsContent() {
  const [activeTab, setActiveTab] = useTopTabs<SettingsTab>("general");

  const tabs: TabItem<SettingsTab>[] = [
    { key: "general", label: "General Information" },
    { key: "security", label: "Security & Passwords" },
    { key: "notifications", label: "Notification Channels" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Tabs are synchronized directly with URL search params (e.g. ?tab={activeTab}).
        </p>
      </div>

      {/* TopTabs with URL Synchronization */}
      <TopTabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
        {activeTab === "general" && (
          <div className="max-w-xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" /> Organization Profile
            </h3>
            <Input label="Platform Name" defaultValue="My Enterprise App" />
            <Input label="Support Email" defaultValue="support@company.com" />
            <Button
              size="sm"
              onClick={() => toast.success("General settings saved!")}
            >
              Save Profile Changes
            </Button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" /> Security Credentials
            </h3>
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <div className="pt-2">
              <Button
                size="sm"
                onClick={() => toast.success("Password updated successfully!")}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" /> Notification Preferences
            </h3>
            <div className="space-y-3">
              {[
                "Email notifications on login alerts",
                "Weekly system activity digest",
                "Security anomaly detection notices",
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded-md text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <Button
              size="sm"
              onClick={() => toast.success("Preferences updated!")}
            >
              Save Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="p-8 text-center text-sm text-gray-400">Loading settings...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardShell>
  );
}
