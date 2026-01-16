import { ResendEmailButton } from "@/components/auth-module/resend-email-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import { redirect} from "next/navigation";
import { cookies } from "next/headers";

export default async function PasswordResetEmailPage() {
    const cookieStore = cookies();
    const allowed = (await cookieStore).get("reset_email")?.value || "";

    if (!allowed) {
        redirect("/forgot-password");  
    }
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex  gap-2 md:justify-between items-center">
                        <div className="flex items-center gap-2 font-medium">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
                            </Avatar>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold">PASSWORD RESET EMAIL SENT</h1>
                    <FieldDescription>
                        We have sent a password reset link to your email address {allowed}. Please check your inbox and follow the instructions to reset your password.
                    </FieldDescription>
                </div>
                <div className="flex justify-center my-4">
                    <Link
                        href="mailto:"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-primary px-4 py-2 text-white dark:text-black hover:bg-primary/90 w-full text-center"
                    >
                        OPEN EMAIL INBOX
                    </Link>
                </div>

                <div>
                    <FieldDescription className="text-center mt-4">
                        DIDN&apos;T RECEIVE THE EMAIL? <ResendEmailButton />
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}