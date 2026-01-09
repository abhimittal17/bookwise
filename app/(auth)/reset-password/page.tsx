import { ResetPasswordForm } from "@/components/auth-module/reset-password"

export default function ResetPasswordPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 md:p-10">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
