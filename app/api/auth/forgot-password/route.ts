import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { generateResetToken } from "@/lib/tokens";
import { transporter } from "@/lib/mailer";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
const ip =
  request.headers.get("cf-connecting-ip") ||
  request.headers.get("x-real-ip") ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
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
    // console.log("FORGOT: rawToken =", rawToken);
    // console.log("FORGOT: hashedToken =", hashedToken);

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    // console.log("FORGOT: updatedUser.resetToken =", updatedUser.resetToken);

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${encodeURIComponent(rawToken)}`;
    await transporter.sendMail({
      from: `"BookWise" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your reset password link for BookWise",
      html: `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Sofia+Sans:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: Open Sans, Arial, sans-serif;
    }
    table {
      border-spacing: 0;
    }
    img {
      border: 0;
      display: block;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      border: 1px solid #ebebeb;
      border-radius: 4px;
      padding: 44px 42px 32px;
    }
    h1 {
      font-family: Montserrat, Arial, sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: #141414;
      margin: 0 0 18px;
      border-bottom: 1px solid #eff1f4;
      padding-bottom: 18px;
    }
    p {
      font-size: 15px;
      line-height: 25px;
      color: #141414;
      margin: 0 0 24px;
    }
    .button {
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      font-family: Sofia Sans, Arial, sans-serif;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      padding: 12px 26px;
      border-radius: 40px;
      margin:15px 0px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #dfe1e4;
      font-size: 14px;
      line-height: 20px;
      color: #222222;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <table width="100%" role="presentation">
    <tr>
      <td align="center">

        <table class="container" role="presentation" width="100%">
          <!-- Logo -->
          <tr>
            <td align="left">
              <img src="/bookwise.png"
                   width="42"
                   height="43"
                   alt="Bookwise Logo"
                   style="border-radius:10px;">
            </td>
          </tr>

          <tr><td height="40"></td></tr>

          <tr>
            <td>
              <h1>Reset your account password</h1>
            </td>
          </tr>

          <tr>
            <td>
              <p>
                We received a request to reset the password for your Bookwise account.
                Click the button below to create a new password.
              </p>
            </td>
          </tr>

          <tr>
            <td align="left">
              <a href="${resetUrl}" class="button" style="color:#ffffff; text-decoration:none;">
                Reset your password
              </a>
            </td>
          </tr>

          <tr>
            <td class="footer">
              This password reset link will expire in 15 minutes.
              If you didn&apos;t request this, you can safely ignore this email.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
    `,
    });

    (await cookieStore).set("reset_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60,
    }
    );

    (await cookieStore).set("reset_email_sent", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60,
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