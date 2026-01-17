import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { createSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { isRateLimited, resetRateLimit } from "@/lib/rate-limit";
import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";



export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      (process.env.NODE_ENV === "development" ? "dev-ip" : "unknown");

    const rateLimited = isRateLimited(`signin-${ip}`, 100, 15 * 60 * 1000);

    if (rateLimited) {
      return NextResponse.json(
        {
          error: "Too many sign-in attempts. Please try again later.",
          code: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }

    const { email, password, remember, token } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email, password, and captcha token are required.", code: "INVALID_INPUT", },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Your token is required.", code: "MISSING_TURNSTILE_TOKEN", },
        { status: 400 }
      );
    }

    const validateResponse = await validateTurnstileToken({
      secretKey: process.env.TURNSTILE_SECRET_KEY || "",
      token,
      idempotencyKey: v4(),
      sandbox: process.env.NODE_ENV === "development",
    });

    if (!validateResponse.success) {
      return NextResponse.json(
        { error: "Your captcha verification failed.", code: "TURNSTILE_FAILED", },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Email not found or inactive.", code: "USER_NOT_FOUND", },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect.", code: "WRONG_PASSWORD", },
        { status: 401 }
      );
    }

    await createSession(
      { id: user.id, role: user.role },
      remember,
    );

    resetRateLimit(`signin-${ip}`);

    return NextResponse.json({
      success: true,
    });
  }

  catch (error) {
    console.error("SIGN-IN ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", code: "SERVER_ERROR", },
      { status: 500 }
    );
  }
}
