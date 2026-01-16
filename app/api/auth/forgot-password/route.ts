import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { generateResetToken } from "@/lib/tokens";
import { transporter } from "@/lib/mailer";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      (process.env.NODE_ENV === "development" ? "dev-ip" : "unknown");

    const rateLimited = isRateLimited(`forgot-password-${ip}`, 100, 60 * 60 * 1000);
    if (rateLimited) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          code: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }

  const cookieStore = cookies();
  const { email: bodyEmail } = await request.json().catch(() => ({}));
  
  const email = bodyEmail || (await cookieStore).get("reset_email")?.value;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "If the email is registered, a reset link has been sent." },
        { status: 200 }
      );
    }

    const { rawToken, hashedToken } = generateResetToken();
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${rawToken}`;

    await transporter.sendMail({
      from: `"BookWise" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your reset password link for BookWise",
      html: `
        <p>Hi,</p>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,<br/>The BookWise Team</p>
    `,
    });
    
    (await cookieStore).set("reset_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",  
      maxAge: 5 * 60,
    }
    );

    (await cookieStore).set("reset_email_sent", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60,
    });
    
    return NextResponse.json(
      { message: "If the email is registered, a reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return NextResponse.json(
      { error: "Internal Server Error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}