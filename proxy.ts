import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


const PUBLIC_ROUTES = [
    "/sign-in",
    "/forgot-password",
];

const PROTECTED_ROUTES = [
    "/home",
    "/profile",
    "/settings",
    "/data-management",
    "my-attendance",
    "/tasks",
    "/tasks/[id]",
    "/team-management",
    "/projects/[id]",
];


export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value;


    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        if (pathname.startsWith("/sign-in") && token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET!);
                return NextResponse.redirect(
                    new URL("/home", request.url)
                );
            } catch {
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(
                new URL("/404", request.url)
            );
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(
                new URL("/404", request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/forgot-password",
    "/home/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/data-management/:path*",
    "/my-attendance/:path*",
    "/tasks/:path*",
    "/team-management/:path*",
    "/projects/:path*",
  ],
};
