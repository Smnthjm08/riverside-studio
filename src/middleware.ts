import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname === "/sign-in" ||
    pathname.startsWith("/room/")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
