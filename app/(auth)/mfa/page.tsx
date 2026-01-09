import {MultiFactor } from "@/components/auth-module/multi-factor"

export default function MultiFactorPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <MultiFactor />
      </div>
    </div>
  )
}
