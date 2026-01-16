import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { comparePassword, hashPassword } from "@/lib/hash";
import { resetRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {

  try {
    const { token, password } = await request.json().catch(() => ({}));

    if (!token || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Your password is invalid or too short.", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    
    const users = await prisma.user.findMany({
      where: {
        resetToken: { not: null },
        resetTokenExpiry: { gt: new Date() },
      },
      select: {
        id: true,
        resetToken: true,
      },
    });

    let matchedUser = null;

    for (const user of users) {
      if (await comparePassword(token, user.resetToken!)) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return NextResponse.json(
    { error: "Your reset token is invalid or has expired.", code: "INVALID_TOKEN" },
        { status: 400 }
      );
    }

  

     const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: matchedUser.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    resetRateLimit(`forgot-password-${matchedUser.id}`);

    const response = NextResponse.json(
      { message: "Password has been reset successfully." },
      { status: 200 }
    );

    response.cookies.set("password_reset_success", "true", {
      httpOnly: true,
      maxAge: 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}