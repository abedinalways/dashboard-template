"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { getDefaultRouteForRole } from "@/src/lib/auth/config";
import { Button } from "@/src/components/ui/Button";
import { Shield, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, role, mockLogin } = useAuth();

  useEffect(() => {
    if (isAuthenticated && role) {
      window.location.href = getDefaultRouteForRole(role);
    }
  }, [isAuthenticated, role]);

  const handleQuickDemo = (demoRole: "ADMIN" | "USER") => {
    mockLogin(demoRole);
    window.location.href = getDefaultRouteForRole(demoRole);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
          <Sparkles className="w-3.5 h-3.5" /> Next.js 16 + Redux + RTK Query + Tailwind v4
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Enterprise Dashboard <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400">
              Boilerplate Template
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A battle-tested frontend template with dual-layer auth, automatic token refresh,
            role guards, RTK Query code-splitting, and reusable UI components.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left p-6 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Safe Auth Architecture
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Server-safe JWT secrets, Edge proxy guards, and auto mutex token refresh.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Modular RTK Query
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Split endpoints by domain with DTO-to-ViewModel mapping pattern.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reusable TopTabs
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Generic segmented, stepper, and pill tabs synchronized with URL search params.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            size="lg"
            onClick={() => handleQuickDemo("ADMIN")}
            leftIcon={<Shield className="w-5 h-5 text-amber-300" />}
          >
            Launch as Admin
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleQuickDemo("USER")}
            leftIcon={<User className="w-5 h-5" />}
          >
            Launch as User
          </Button>

          <Link href="/login">
            <Button size="lg" variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
