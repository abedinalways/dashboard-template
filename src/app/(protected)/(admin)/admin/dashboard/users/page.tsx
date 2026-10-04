"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/src/components/layout/DashboardShell";
import { DataTable, Column } from "@/src/components/common/DataTable";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { User, Plus, Search, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  joinedDate: string;
  status: "Active" | "Inactive";
}

const mockUsers: UserRecord[] = [
  { id: "1", name: "David Kim", email: "david@example.com", role: "ADMIN", joinedDate: "Sep 15, 2026", status: "Active" },
  { id: "2", name: "Jessica Taylor", email: "jessica@example.com", role: "USER", joinedDate: "Sep 20, 2026", status: "Active" },
  { id: "3", name: "Marcus Chen", email: "marcus@example.com", role: "USER", joinedDate: "Oct 1, 2026", status: "Inactive" },
  { id: "4", name: "Sophia Williams", email: "sophia@example.com", role: "ADMIN", joinedDate: "Oct 3, 2026", status: "Active" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const columns: Column<UserRecord>[] = [
    {
      header: "Name",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.role === "ADMIN"
              ? "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {row.role === "ADMIN" && <ShieldCheck className="w-3 h-3 text-purple-500" />}
          {row.role}
        </span>
      ),
    },
    { header: "Joined Date", accessorKey: "joinedDate" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.status === "Active"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast(`Editing ${row.name}`)}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 cursor-pointer"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage all system users, permissions, and roles.
            </p>
          </div>

          <Button
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => toast.success("Add user modal opened")}
          >
            Add New User
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <span className="hidden sm:block text-xs text-gray-400">
            Showing {filteredUsers.length} users
          </span>
        </div>

        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </DashboardShell>
  );
}
