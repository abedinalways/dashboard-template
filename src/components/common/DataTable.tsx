"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/src/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react";
import { Input } from "@/src/components/ui/Input";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  sortable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  bulkActions?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  searchable = false,
  searchPlaceholder = "Search records...",
  selectable = false,
  onSelectionChange,
  bulkActions,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((val) =>
        String(val ?? "").toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortDirection === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [filteredData, sortKey, sortDirection]);

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else {
        setSortKey(null);
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = new Set(sortedData.map((d, i) => d.id ?? i));
      setSelectedIds(allIds);
      onSelectionChange?.(sortedData);
    } else {
      setSelectedIds(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string | number, row: T) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);

    setSelectedIds(next);
    const selected = sortedData.filter((d, i) => next.has(d.id ?? i));
    onSelectionChange?.(selected);
  };

  const isAllSelected =
    sortedData.length > 0 && selectedIds.size === sortedData.length;

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs",
        className
      )}
    >
      {/* Header Bar: Search & Bulk Actions */}
      {(searchable || (selectable && selectedIds.size > 0)) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
          {searchable && (
            <div className="w-full sm:w-72">
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
          )}

          {selectable && selectedIds.size > 0 && (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {selectedIds.size} row(s) selected
              </span>
              {bulkActions}
            </div>
          )}
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200/80 dark:border-gray-800">
              {selectable && (
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded-md text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                </th>
              )}

              {columns.map((col, index) => {
                const isSorted = sortKey === col.accessorKey;
                return (
                  <th
                    key={index}
                    onClick={() => col.sortable && handleSort(col.accessorKey)}
                    className={cn(
                      "py-3.5 px-4 font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none",
                      col.sortable && "cursor-pointer hover:text-gray-800 dark:hover:text-gray-200",
                      col.className
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-gray-400">
                          {isSorted ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="w-3.5 h-3.5 text-brand-600" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-brand-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-gray-400"
                >
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
                  <p className="mt-2 text-xs">Loading data...</p>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-gray-400"
                >
                  <Inbox className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm font-medium">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const rowId = row.id ?? rowIndex;
                const isSelected = selectedIds.has(rowId);

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors",
                      isSelected && "bg-brand-50/30 dark:bg-brand-950/20"
                    )}
                  >
                    {selectable && (
                      <td className="py-3.5 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId, row)}
                          className="h-4 w-4 rounded-md text-brand-600 focus:ring-brand-500 cursor-pointer"
                        />
                      </td>
                    )}

                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={cn("py-3.5 px-4 text-gray-700 dark:text-gray-300", col.className)}
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages} ({sortedData.length} records)
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
