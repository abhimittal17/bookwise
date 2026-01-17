import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FieldDescription } from "@/components/ui/field";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PasswordChangedPage() {
    const cookieStore = cookies();
    const success = (await cookieStore).get("password_reset_success");

    if (!success) {
        redirect("/sign-in");
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 md:p-10">
            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src="/bookwise.png"
                            alt="Bookwise logo"
                            className="dark:invert rounded-md"
                        />
                    </Avatar>


                    <h1 className="text-xl font-bold">
                        Password changed
                    </h1>

                    <FieldDescription className="max-w-sm">
                        Your password has been updated successfully. For
                        security reasons, all active sessions have been signed
                        out.
                    </FieldDescription>
                </div>

                {/* Primary action */}
                <div className="flex justify-center">
                    <Link
                        href="/sign-in"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Sign in with new password
                    </Link>
                </div>

                {/* Secondary actions */}
                <div className="space-y-2 text-center">
                    <p className="text-xs text-muted-foreground">
                        Having trouble signing in?
                    </p>
                    <Link
                        href="/forgot-password"
                        className="text-xs underline text-muted-foreground"
                    >
                        Reset your password again
                    </Link>
                </div>

                {/* Security notice */}
                <p className="text-[11px] text-muted-foreground/60 text-center max-w-sm mx-auto">
                    If you did not make this change, please reset your password
                    immediately and contact support.
                </p>
            </div>
        </div>
    );
}
