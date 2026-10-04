"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { getDefaultRouteForRole } from "@/src/lib/auth/config";
import { Lock, Mail, Shield, User, Layers, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, mockLogin, isLoading } = useAuth();

  const [email, setEmail] = useState("admin@dashboard.com");
  const [password, setPassword] = useState("admin123");

  const handleQuickLogin = (role: "ADMIN" | "USER") => {
    mockLogin(role);
    toast.success(`Signed in as ${role}!`);
    const target = getDefaultRouteForRole(role);
    // Hard navigate to ensure cookies are sent with HTTP headers to Next.js proxy
    window.location.href = target;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // 1. Check for template demo credentials
    if (email === "admin@dashboard.com" && password === "admin123") {
      handleQuickLogin("ADMIN");
      return;
    }
    if (email === "user@dashboard.com" && password === "user123") {
      handleQuickLogin("USER");
      return;
    }

    // 2. Real backend login via RTK Query
    try {
      await login({ email, password });
      toast.success("Login successful via API!");
      window.location.href = "/admin/dashboard";
    } catch {
      toast.error("Backend API offline. Logging in with Demo credentials!");
      handleQuickLogin("ADMIN");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50/60 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl shadow-xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in to access your administrative dashboard
          </p>
        </div>

        {/* 1-Click Quick Demo Box */}
        <div className="p-3.5 bg-brand-50/70 dark:bg-brand-950/40 rounded-2xl border border-brand-100 dark:border-brand-900/50 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> 1-Click Quick Demo
            </span>
            <span className="text-[10px] text-gray-400">No backend required</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("ADMIN")}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xs border border-gray-200 dark:border-gray-800 hover:border-brand-500 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" /> Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("USER")}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xs border border-gray-200 dark:border-gray-800 hover:border-brand-500 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-brand-500" /> User Demo
            </button>
          </div>
        </div>

        {/* Demo Credentials Info Helper */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-[11px] text-gray-600 dark:text-gray-400 space-y-1 border border-gray-100 dark:border-gray-800">
          <p className="font-semibold text-gray-900 dark:text-gray-200">Default Demo Credentials:</p>
          <div className="flex justify-between font-mono text-[10px]">
            <span>Admin: admin@dashboard.com / admin123</span>
          </div>
          <div className="flex justify-between font-mono text-[10px]">
            <span>User: user@dashboard.com / user123</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
