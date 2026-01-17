import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "./lib/prisma";


const PUBLIC_ROUTES = [
    "/sign-in",
    "/forgot-password",
];

const PROTECTED_ROUTES = [
    "/home",
    "/profile",
    "/settings",
    "/data-management",
    "/my-attendance",
    "/tasks",
    "/tasks/[id]",
    "/team-management",
    "/projects/[id]",
];


export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value;

    const clearSessionandRedirectToSignIn = () => {
        const response = NextResponse.redirect(
            new URL("/sign-in", request.url)
        );
        response.cookies.delete("session");
        return response;
    }

    if (request.nextUrl.pathname === "/password-reset-email") {
        const allowed = request.cookies.get("pwd_reset_allowed");

        if (!allowed) {
            return NextResponse.redirect(
                new URL("/404", request.url)
            );
        }
    }


    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/reset-password") && token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return NextResponse.redirect(
                new URL("/password-changed", request.url)
            );
        } catch {
            return NextResponse.next();
        }
    }


    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        if (pathname.startsWith("/sign-in") && token || pathname.startsWith("/forgot-password") && token || pathname.startsWith("/reset-password") && token || pathname.startsWith("/password-reset-email") && token || pathname.startsWith("/password-changed") && token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET!);
                return NextResponse.redirect(
                    new URL("/home", request.url)
                );
            } catch {
                return clearSessionandRedirectToSignIn();
            }
        }

        return NextResponse.next();
    }

    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        if (!token) return clearSessionandRedirectToSignIn();
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as { id: string };

            // 🔥 THIS IS THE FIX
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, isActive: true },
            });

            if (!user || !user.isActive) {
                return clearSessionandRedirectToSignIn();
            }
            return NextResponse.next();
        } catch {
            return clearSessionandRedirectToSignIn();
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
