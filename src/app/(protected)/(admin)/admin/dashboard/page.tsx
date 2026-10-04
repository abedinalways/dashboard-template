"use client";

import React, { Suspense } from "react";
import { DashboardShell } from "@/src/components/layout/DashboardShell";
import TopTabs, { TabItem } from "@/src/components/common/TopTabs";
import { StatCard } from "@/src/components/common/StatCard";
import { DataTable, Column } from "@/src/components/common/DataTable";
import { Button } from "@/src/components/ui/Button";
import { Modal } from "@/src/components/ui/Modal";
import { useModal } from "@/src/hooks/useModal";
import { useTopTabs } from "@/src/hooks/useTopTabs";
import {
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Plus,
  FileDown,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

type OverviewTab = "overview" | "stepper" | "filters";

interface ActivityRow {
  id: string;
  user: string;
  action: string;
  role: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

const mockActivities: ActivityRow[] = [
  { id: "1", user: "Alexander Wright", action: "Upgraded subscription", role: "Pro Member", date: "Oct 4, 2026", status: "Completed" },
  { id: "2", user: "Sarah Jenkins", action: "Changed password", role: "Editor", date: "Oct 3, 2026", status: "Completed" },
  { id: "3", user: "Devin Vance", action: "Generated API Key", role: "Developer", date: "Oct 2, 2026", status: "Pending" },
  { id: "4", user: "Elena Rostova", action: "Failed login attempt", role: "Member", date: "Oct 1, 2026", status: "Failed" },
];

function AdminDashboardContent() {
  // Sync tab states with URL (?tab=...) and sessionStorage so it never resets on refresh
  const [activeTab, setActiveTab] = useTopTabs<OverviewTab>("overview", "tab", "admin_main_tab");
  const [stepperStep, setStepperStep] = useTopTabs<string>("step-1", "step", "admin_stepper_step");
  const [filterTab, setFilterTab] = useTopTabs<string>("all", "filter", "admin_filter_tab");

  const { isOpen: isNewModalOpen, openModal: openNewModal, closeModal: closeNewModal } = useModal();

  const overviewTabs: TabItem<OverviewTab>[] = [
    { key: "overview", label: "Dashboard Overview" },
    { key: "stepper", label: "Wizard / Stepper Demo" },
    { key: "filters", label: "Filter Pills Demo" },
  ];

  const stepperTabs = [
    { key: "step-1", label: "Account Info" },
    { key: "step-2", label: "Preferences" },
    { key: "step-3", label: "Verification" },
    { key: "step-4", label: "Completion" },
  ];

  const filterTabs = [
    { key: "all", label: "All Items", count: 48 },
    { key: "active", label: "Active", count: 35 },
    { key: "pending", label: "Pending Review", count: 9 },
    { key: "archived", label: "Archived", count: 4 },
  ];

  const columns: Column<ActivityRow>[] = [
    {
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300 font-semibold text-xs">
            {row.user.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{row.user}</p>
            <p className="text-xs text-gray-400">{row.role}</p>
          </div>
        </div>
      ),
    },
    { header: "Action", accessorKey: "action" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.status === "Completed"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
              : row.status === "Pending"
              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Template demonstration showcasing TopTabs variants, KPIs, and data grids.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileDown className="w-4 h-4" />}
            onClick={() => toast.success("Exporting data report...")}
          >
            Export
          </Button>
          <Button
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={openNewModal}
          >
            Create New
          </Button>
        </div>
      </div>

      {/* TopTabs Demonstration Component */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Interactive TopTabs Component (State Persists on Refresh)
          </span>
          <span className="text-[11px] font-mono text-brand-600 dark:text-brand-400">
            ?tab={activeTab}
          </span>
        </div>

        <TopTabs
          tabs={overviewTabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          variant="segmented"
        />

        {activeTab === "stepper" && (
          <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-4">
            <p className="text-xs font-medium text-gray-500">
              Click steps to advance the wizard (Synced with ?step={stepperStep}):
            </p>
            <TopTabs
              tabs={stepperTabs}
              activeKey={stepperStep}
              onChange={setStepperStep}
              variant="stepper"
            />
          </div>
        )}

        {activeTab === "filters" && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-3">
            <p className="text-xs font-medium text-gray-500">
              Filter pills with live count badges (Synced with ?filter={filterTab}):
            </p>
            <TopTabs
              tabs={filterTabs}
              activeKey={filterTab}
              onChange={setFilterTab}
              variant="pills"
            />
          </div>
        )}
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="$128,450"
          changePercentage={14.8}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Active Members"
          value="14,290"
          changePercentage={8.2}
          icon={<Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          iconBgColor="bg-indigo-50 dark:bg-indigo-900/30"
        />
        <StatCard
          title="Live Sessions"
          value="1,842"
          changePercentage={-3.1}
          icon={<Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-900/30"
        />
        <StatCard
          title="Conversion Rate"
          value="4.86%"
          changePercentage={22.4}
          icon={<TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          iconBgColor="bg-amber-50 dark:bg-amber-900/30"
        />
      </div>

      {/* Data Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Recent Audit Log
          </h3>
          <span className="text-xs text-gray-500">Live RTK Query Integration</span>
        </div>

        <DataTable
          columns={columns}
          data={mockActivities}
          currentPage={1}
          totalPages={3}
          onPageChange={(p) => toast(`Page ${p} selected`)}
        />
      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={closeNewModal}
        title="Create New Dashboard Item"
        description="This modal demonstrates the lightweight useModal hook."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeNewModal}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toast.success("Item saved successfully!");
                closeNewModal();
              }}
            >
              Save Item
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p>
            You can inject any form, stepper, or content inside this reusable modal.
          </p>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Focus-Trapped & Escape-to-close
            </p>
            <p className="text-gray-500">
              Built with responsive backdrop-blur and animation transitions.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="p-8 text-center text-sm text-gray-400">Loading dashboard...</div>}>
        <AdminDashboardContent />
      </Suspense>
    </DashboardShell>
  );
}
