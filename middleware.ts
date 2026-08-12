import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\/[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/en")) {
    const response = NextResponse.next();

    response.cookies.set("site_lang", "en", {
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("googtrans", "/auto/en", {
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  if (pathname.startsWith("/bg")) {
    const targetPath =
      pathname.replace(/^\/bg(?=\/|$)/, "") || "/";

    const redirectUrl = new URL(
      `${targetPath}${search}`,
      request.url
    );

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("site_lang", "bg", {
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("googtrans", "/auto/bg", {
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  const response = NextResponse.next();

  response.cookies.set("site_lang", "bg", {
    path: "/",
    sameSite: "lax",
  });

  response.cookies.set("googtrans", "/auto/bg", {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|events.xml).*)",
  ],
};