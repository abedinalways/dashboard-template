# 🚀 Enterprise Next.js Dashboard Boilerplate Template

A scalable, clean, and production-ready frontend dashboard template built with **Next.js 16 (App Router)**, **Redux Toolkit + RTK Query**, **Tailwind CSS v4**, and **TypeScript**.

Designed to serve as the unified, reusable foundation for all your future frontend dashboard projects.

---

## 🌟 Key Architectural Features

- **🔐 Dual-Layer Authentication & Route Guards:**
  - **Edge Middleware (`src/proxy.ts` / `src/middleware.ts`):** High-performance role-based route protection using `jose` JWT verification on Edge runtime.
  - **Client Auth Hook (`src/hooks/useAuth.ts`):** Easy access to auth state, login triggers, and mock logins for zero-backend development.
  - **Role-based Redirection:** Strict isolation between `ADMIN` and `USER` portals.

- **🔄 Production-Grade Token Refresh:**
  - Implements `baseQueryWithReauth` with a **Singleton Mutex Promise** to avoid the "Thundering Herd" race condition when multiple parallel queries hit HTTP 401.
  - Seamlessly updates access tokens and cookies, retrying the failed queries automatically.

- **⚡ Feature-Sliced RTK Query:**
  - Code-splits endpoints across domains using `baseApi.injectEndpoints({ ... })`.
  - Centralized cache tags in `src/redux/api/tagTypes.ts` for automated query invalidation.
  - **DTO-to-ViewModel Pattern:** Isolates backend API schema changes from UI components using `transformResponse`.

- **📑 Generic, Multi-Variant `TopTabs`:**
  - Generic TypeScript typing: `TopTabs<T extends string>`.
  - Supports 3 distinct visual modes:
    1. `segmented` (Default): Modern iOS/Pill switcher.
    2. `stepper`: Multi-step form/checkout progress wizard with completed step checkmarks (✓).
    3. `pills`: Filter chips with live count badges.
  - URL Synchronization Hook (`useTopTabs`): Syncs active tab directly with `?tab=name` for shareable links and preserved reload state.

- **🎨 Modern Tailwind CSS v4 Design System:**
  - Pure CSS-driven token architecture using `@theme` and `@utility` directives in `src/app/globals.css`.
  - Clean light and dark mode toggling.

---

## 📁 Folder Structure

```text
src/
├── app/                        # Next.js App Router
│   ├── (public)/               # Public unauthenticated routes
│   │   ├── login/              # Sign in page (with Quick Demo buttons)
│   │   ├── sign-up/            # Registration page
│   │   └── forgot-password/    # Password reset flow
│   ├── (protected)/            # Role-guarded routes
│   │   ├── (admin)/admin/      # Admin portal & management pages
│   │   └── (user)/user/        # Standard user portal
│   ├── globals.css             # Tailwind v4 theme, tokens & utility classes
│   ├── layout.tsx              # Root Layout (Redux, Theme, Sidebar, Toaster)
│   └── page.tsx                # Welcome portal & redirection
├── components/                 # Reusable UI component library
│   ├── common/                 # Widgets (TopTabs, StatCard, DataTable)
│   ├── layout/                 # Shell (AppHeader, AppSidebar, DashboardShell)
│   └── ui/                     # Atoms (Button, Input, Modal)
├── context/                    # React Contexts (SidebarContext, ThemeContext)
├── hooks/                      # Custom hooks (useAuth, useModal, useDebounce, useTopTabs)
├── lib/                        # Helpers, Env configs, Auth helpers, Error parsers
├── proxy.ts                    # Next.js 16 Edge Route Guard
├── middleware.ts               # Proxy re-export for tooling compatibility
├── redux/                      # Redux Toolkit & RTK Query
│   ├── api/                    # baseApi.ts (baseQueryWithReauth) & tagTypes.ts
│   ├── features/               # Feature Slices (authSlice, authApi, dashboardApi)
│   ├── ReduxProvider.tsx      # Client Store Provider
│   └── store.ts                # Typed Redux Store
└── types/                      # TypeScript definitions (auth, common, dashboard)
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ How to Extend for New Projects

1. **Add a New API Feature:**
   Create a new file under `src/redux/features/[feature]/[feature]Api.ts` and use:
   ```typescript
   import { baseApi } from "@/src/redux/api/baseApi";

   export const myFeatureApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
       getItems: builder.query({ ... }),
     }),
   });
   ```

2. **Add a New Role:**
   Update `AuthRole` in `src/types/auth.ts` and define its default redirect in `src/lib/auth/config.ts`.
# dashboard-template
