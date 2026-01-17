import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function MFADisabledPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 md:p-10">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/bookwise.png"
              alt="Bookwise logo"
              className="dark:invert rounded-md"
            />
          </Avatar>

          <h1 className="text-xl font-semibold">Multi-factor authentication disabled</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          You successfully signed in using a recovery key. As a result,
          multi-factor authentication has been disabled for your account.
        </p>

        <div className="rounded-lg border bg-accent p-4 text-sm ">
          Your account is now less secure. We strongly recommend enabling MFA again.
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/settings/security">
              Re-enable MFA now
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/home">
              Continue to Home
            </Link>
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground/70">
          Didn&apos;t do this? Secure your account immediately by changing your password
          and reviewing recent activity.
        </p>
      </div>
    </div>
  );
}
