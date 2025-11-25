import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./interfaces/user";

const protectedRoutes = "dashboard";
const publicRoutes = "login";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtectedRoute = path.includes(protectedRoutes);
  const isPublicRoute = path.includes(publicRoutes);

  const user: User | null = JSON.parse(
    cookieStore.get("user")?.value || "null"
  );
  const token: string = cookieStore.get("token")?.value || "";

  if (isProtectedRoute && !token && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    isPublicRoute &&
    token &&
    user &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
