import { ResetPasswordForm } from "@/components/auth-module/reset-password"
import { comparePassword } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation"

export default async function ResetPasswordPage({searchParams}: {searchParams: Promise<{token?: string}>;}) {
  
 const token = (await searchParams).token;

  if (!token) {
    return (
      notFound()
    )
  }

  const user = await prisma.user.findFirst({
    where: {
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user || !user.resetTokenExpiry) {
    return (
      notFound()
    )
  }

  const isTokenValid = await comparePassword(token, user.resetToken!);
  if (!isTokenValid) {
    return (
      notFound()
    )
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 md:p-10">
      <div className="w-full max-w-md">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
