"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/src/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, MetricCard } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Modal } from "@/src/components/ui/Modal";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { DropdownMenu } from "@/src/components/ui/DropdownMenu";
import { DataTable, Column } from "@/src/components/common/DataTable";
import { DashboardLineChart } from "@/src/components/charts/DashboardLineChart";
import { DashboardBarChart } from "@/src/components/charts/DashboardBarChart";
import { DashboardPieChart } from "@/src/components/charts/DashboardPieChart";
import { DashboardMap, type MapMarkerData } from "@/src/components/common/DashboardMap";
import { useModal } from "@/src/hooks/useModal";
import {
  MoreVertical,
  Trash2,
  Edit,
  Download,
  Share2,
  TrendingUp,
  Activity,
  Layers,
  MapPin,
  BarChart3,
  PieChart as PieIcon,
  Table as TableIcon,
} from "lucide-react";
import toast from "react-hot-toast";

// Sample chart data
const revenueLineData = [
  { month: "Jan", revenue: 45000, expenses: 28000 },
  { month: "Feb", revenue: 52000, expenses: 31000 },
  { month: "Mar", revenue: 61000, expenses: 35000 },
  { month: "Apr", revenue: 58000, expenses: 32000 },
  { month: "May", revenue: 73000, expenses: 40000 },
  { month: "Jun", revenue: 85000, expenses: 42000 },
  { month: "Jul", revenue: 98000, expenses: 48000 },
];

const salesBarData = [
  { category: "Web Apps", current: 320, previous: 240 },
  { category: "Mobile Apps", current: 280, previous: 190 },
  { category: "Cloud APIs", current: 410, previous: 350 },
  { category: "Design Kits", current: 190, previous: 160 },
];

const trafficPieData = [
  { name: "Direct Traffic", value: 45, color: "#3b82f6" },
  { name: "Organic Search", value: 30, color: "#10b981" },
  { name: "Referral Links", value: 15, color: "#f59e0b" },
  { name: "Social Media", value: 10, color: "#8b5cf6" },
];

// Sample map markers (Dhaka hub demo)
const mapMarkers: MapMarkerData[] = [
  { id: "hub-1", lat: 23.7925, lng: 90.4078, title: "Gulshan Tech Hub", subtitle: "Active Server Node", badge: "Primary" },
  { id: "hub-2", lat: 23.7461, lng: 90.3742, title: "Dhanmondi Center", subtitle: "Regional Data Relay", badge: "Relay" },
  { id: "hub-3", lat: 23.8699, lng: 90.3984, title: "Uttara Cloud Hub", subtitle: "Edge Storage Center", badge: "Edge" },
];

interface ProductRecord {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const tableData: ProductRecord[] = [
  { id: "p1", name: "Enterprise Next.js Boilerplate", category: "Templates", price: "$99", stock: 150, status: "In Stock" },
  { id: "p2", name: "Fullstack Mobile App Kit", category: "Mobile", price: "$149", stock: 4, status: "Low Stock" },
  { id: "p3", name: "AI Agent Orchestrator", category: "SaaS", price: "$299", stock: 80, status: "In Stock" },
  { id: "p4", name: "Tailwind UI Master Pack", category: "UI Kits", price: "$59", stock: 0, status: "Out of Stock" },
];

export default function ComponentLibraryPage() {
  const [btnLoading, setBtnLoading] = useState(false);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const { isOpen: isConfirmOpen, openModal: openConfirm, closeModal: closeConfirm } = useModal();

  const handleSimulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      toast.success("Action completed!");
    }, 1500);
  };

  const columns: Column<ProductRecord>[] = [
    { header: "Product Name", accessorKey: "name", sortable: true },
    { header: "Category", accessorKey: "category", sortable: true },
    { header: "Price", accessorKey: "price", sortable: true },
    { header: "Stock", accessorKey: "stock", sortable: true },
    {
      header: "Status",
      render: (row) => {
        const variant =
          row.status === "In Stock" ? "success" : row.status === "Low Stock" ? "warning" : "danger";
        return (
          <Badge variant={variant} hasDot>
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      render: (row) => (
        <DropdownMenu
          trigger={
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          items={[
            { id: "edit", label: "Edit Item", icon: <Edit className="w-3.5 h-3.5" />, onClick: () => toast(`Editing ${row.name}`) },
            { id: "download", label: "Download Spec", icon: <Download className="w-3.5 h-3.5" />, onClick: () => toast.success("Spec downloaded") },
            { id: "delete", label: "Delete", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, divider: true, onClick: openConfirm },
          ]}
        />
      ),
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80 mb-2">
            <Layers className="w-3.5 h-3.5" /> Reusable Component System
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Component Library & Showcase
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            A comprehensive catalog of all production-ready UI components, charts, tables, and map widgets.
          </p>
        </div>

        {/* 1. Metric Cards Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            1. Cards & Metric Widgets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Cloud Bandwidth"
              value="842.6 GB"
              subtitle="Monthly Limit"
              progress={74}
              badgeText="Normal"
              badgeType="success"
              icon={<Activity className="w-5 h-5" />}
            />
            <MetricCard
              title="API Throughput"
              value="12,490 /s"
              subtitle="Peak Load"
              progress={92}
              badgeText="High Load"
              badgeType="warning"
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <Card variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Glassmorphic Card</span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Sleek Backdrop Blur</h4>
                <p className="text-xs text-gray-400 mt-1">Built with pure Tailwind v4 tokens.</p>
              </div>
              <Badge variant="brand" className="w-fit mt-4">Glass Accent</Badge>
            </Card>
            <Card className="p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Elevated Card</span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Structured Box</h4>
                <p className="text-xs text-gray-400 mt-1">Includes border & subtle shadow.</p>
              </div>
              <Button size="sm" variant="outline" className="w-fit mt-3">Card Action</Button>
            </Card>
          </div>
        </div>

        {/* 2. Charts Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-500" /> 2. Interactive Charts (Recharts)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line / Area Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div>
                  <CardTitle>Revenue & Expenses Trend</CardTitle>
                  <CardDescription>Smooth curves with responsive gradient fill</CardDescription>
                </div>
                <Badge variant="brand">Area Monotone</Badge>
              </CardHeader>
              <CardContent>
                <DashboardLineChart
                  data={revenueLineData}
                  xAxisKey="month"
                  series={[
                    { dataKey: "revenue", name: "Revenue ($)", color: "#3b82f6" },
                    { dataKey: "expenses", name: "Expenses ($)", color: "#10b981" },
                  ]}
                  height={280}
                />
              </CardContent>
            </Card>

            {/* Donut Chart */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Traffic Channels</CardTitle>
                  <CardDescription>Donut distribution breakdown</CardDescription>
                </div>
                <PieIcon className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <DashboardPieChart
                  data={trafficPieData}
                  height={280}
                  innerRadius={65}
                  outerRadius={95}
                  centerText="100%"
                  centerSubtext="Total Reach"
                />
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div>
                  <CardTitle>Sales Comparison by Category</CardTitle>
                  <CardDescription>Monthly current vs previous period comparisons</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <DashboardBarChart
                  data={salesBarData}
                  xAxisKey="category"
                  series={[
                    { dataKey: "current", name: "Current Period", color: "#3b82f6" },
                    { dataKey: "previous", name: "Previous Period", color: "#94a3b8" },
                  ]}
                  height={260}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3. Interactive Leaflet Map */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" /> 3. Interactive Leaflet Map (SSR-Safe)
          </h3>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Geographical Server Clusters</CardTitle>
                <CardDescription>Click markers to inspect hub details & live status popups</CardDescription>
              </div>
              <Badge variant="success" hasDot>3 Nodes Active</Badge>
            </CardHeader>
            <CardContent className="p-0 sm:p-5">
              <DashboardMap
                markers={mapMarkers}
                center={[23.8103, 90.4125]}
                zoom={11}
                height={380}
              />
            </CardContent>
          </Card>
        </div>

        {/* 4. Advanced DataTable Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-indigo-500" /> 4. Feature-Rich DataTable
          </h3>
          <DataTable
            columns={columns}
            data={tableData}
            searchable
            searchPlaceholder="Search products by name or category..."
            selectable
            onSelectionChange={(selected) => toast(`${selected.length} items selected`)}
            bulkActions={
              <Button size="sm" variant="danger" onClick={openConfirm}>
                Delete Selected
              </Button>
            }
          />
        </div>

        {/* 5. Buttons, Badges & Modals Playground */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons & Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons & Badges</CardTitle>
              <CardDescription>Multiple variants, sizes, and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary Sm</Button>
                <Button size="md">Primary Md</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button
                  isLoading={btnLoading}
                  onClick={handleSimulateLoading}
                >
                  Click For Spinner
                </Button>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase">Badges with Dot</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand" hasDot>Brand</Badge>
                  <Badge variant="success" hasDot>Active</Badge>
                  <Badge variant="warning" hasDot>Pending</Badge>
                  <Badge variant="danger" hasDot>Failed</Badge>
                  <Badge variant="info" hasDot>Information</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dialogs & Modals */}
          <Card>
            <CardHeader>
              <CardTitle>Modals & Dialogs</CardTitle>
              <CardDescription>Accessible focus-trapped dialogs with transitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-gray-500">
                Trigger lightweight general dialogs or pre-built confirmation prompts with custom actions.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={openModal}>Open Standard Modal</Button>
                <Button variant="danger" onClick={openConfirm}>
                  Open Confirm Dialog
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Standard Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Reusable Modal Component"
        description="Easily configurable with custom footer, header, and body."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>
            <Button size="sm" onClick={() => { toast.success("Saved!"); closeModal(); }}>Confirm</Button>
          </>
        }
      >
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p>This modal automatically manages backdrop blur, ESC key listeners, and body scroll lock.</p>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs">
            Escape key listener active. Click outside to dismiss.
          </div>
        </div>
      </Modal>

      {/* Confirm Dialog Demo */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={() => {
          toast.success("Action confirmed!");
          closeConfirm();
        }}
        title="Confirm Deletion?"
        description="Are you sure you want to proceed? This will permanently delete the selected item from the database."
        confirmText="Yes, Delete"
        variant="danger"
      />
    </DashboardShell>
  );
}
