import { ResendEmailButton } from "@/components/auth-module/resend-email-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function maskEmail(email: string) {
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    return `${user[0]}***@${domain}`;
}

export default async function PasswordResetEmailPage() {
    const cookieStore = cookies();
    const allowed = (await cookieStore).get("reset_email")?.value || "";

    if (!allowed) {
        redirect("/forgot-password");
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
                        Password reset email sent
                    </h1>

                    <FieldDescription className="max-w-sm">
                        We&apos;ve sent a password reset link to{" "}
                        <span className="font-medium">
                            {maskEmail(allowed)}
                        </span>
                        . Check your inbox and follow the instructions to reset
                        your password.
                    </FieldDescription>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        href="mailto:"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-primary/90"
                    >
                        Open email inbox
                    </Link>

                    <p className="text-xs text-muted-foreground text-center">
                        It may take a few minutes for the email to arrive.
                        Don&apos;t forget to check your spam or promotions folder.
                    </p>
                </div>

                {/* Resend */}
                <div className="text-center space-y-2">
                    <FieldDescription>
                        Didn&apos;t receive the email?{" "}
                        <ResendEmailButton />
                    </FieldDescription>

                    <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline"
                    >
                        Enter a different email address
                    </Link>
                </div>

                {/* Security note */}
                <p className="text-[11px] text-muted-foreground/60 text-center max-w-sm mx-auto">
                    If you didn&apos;t request a password reset, you can safely
                    ignore this email. Your account remains secure.
                </p>
            </div>
        </div>
    );
}
