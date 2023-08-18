import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("userToken");

  if (
    (!userToken || Date.now() > Number(JSON.parse(userToken).expires_at))
    && request.nextUrl.pathname !== "/login"
  ) {
    request.cookies.delete("userToken");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("userToken");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};