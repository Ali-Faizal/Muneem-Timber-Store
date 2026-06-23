import { NextResponse } from "next/server";
import { verifySession } from "./lib/auth-edge";

export async function middleware(request) {
  try {
    const { pathname } = request.nextUrl;

    const isAdminRoute = pathname.startsWith("/admin");
    const isOwnerPanelRoute = pathname.startsWith("/mts-owner-panel-1995");

    if (isAdminRoute || isOwnerPanelRoute) {
      const session = request.cookies.get("owner_session")?.value;
      let isValid = false;
      try {
        isValid = await verifySession(session);
      } catch (err) {
        console.error("verifySession failed in middleware:", err);
      }

      if (!isValid) {
        // Redirect unauthorized users to the secure separate owner login page
        const loginUrl = new URL("/secure-owner", request.url);
        return NextResponse.redirect(loginUrl);
      } else {
        // If authenticated and accessing root panel routes, redirect to dashboard
        if (pathname === "/admin" || pathname === "/mts-owner-panel-1995") {
          const dashboardUrl = new URL("/mts-owner-panel-1995/dashboard", request.url);
          return NextResponse.redirect(dashboardUrl);
        }
      }
    }
  } catch (error) {
    console.error("Unhandled middleware error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/mts-owner-panel-1995/:path*",
  ],
};
