import { NextRequest, NextResponse } from "next/server";
import { env } from "@/src/lib/env";
import {
  authCookieNames,
  authRoutes,
  getDefaultRouteForRole,
  normalizeAuthRole,
} from "@/src/lib/auth/config";
import { verifyAccessToken } from "@/src/lib/auth/verify-token";

const buildLoginRedirect = (request: NextRequest) => {
  const loginUrl = new URL(authRoutes.login, request.url);
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (redirectTo !== authRoutes.home) {
    loginUrl.searchParams.set("redirect", redirectTo);
  }

  return loginUrl;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Design mode bypass
  if (env.isDesignMode) {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieNames.token)?.value;
  const cookieRole = request.cookies.get(authCookieNames.role)?.value;

  const isAuthPage =
    pathname === authRoutes.login ||
    pathname === authRoutes.signUp ||
    pathname === authRoutes.forgotPassword;

  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");

  // 1. Public Auth Pages (/login, /sign-up, etc.)
  if (isAuthPage) {
    if (!token) return NextResponse.next();

    const payload = await verifyAccessToken(token);
    if (!payload) return NextResponse.next();

    const role = normalizeAuthRole(payload.role ?? cookieRole);
    return NextResponse.redirect(new URL(getDefaultRouteForRole(role), request.url));
  }

  // 2. Home Route (/)
  if (pathname === authRoutes.home) {
    if (!token) {
      return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    const role = normalizeAuthRole(payload.role ?? cookieRole);
    return NextResponse.redirect(new URL(getDefaultRouteForRole(role), request.url));
  }

  // 3. Protected Routes (/admin/*, /user/*)
  if (isAdminRoute || isUserRoute) {
    if (!token) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    const role = normalizeAuthRole(payload.role ?? cookieRole);
    const defaultRoute = getDefaultRouteForRole(role);

    // Enforce role-based isolation
    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    if (isUserRoute && role !== "USER") {
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/admin/:path*",
    "/user/:path*",
  ],
};
