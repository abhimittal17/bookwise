import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";

export default function PasswordChangedPage() {
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
                        {/* <p className="text-xs">BOOKWISE.</p> */}
                    </div>
                    <h1 className="text-xl font-bold">PASSWORD CHANGED</h1>
                    <FieldDescription>
                        Your password was updated successfully. You can now sign in with your new password.
                    </FieldDescription>
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        href="/sign-in"
                        className="inline-block rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 w-full text-center"
                    >
                        SIGN IN NOW
                    </Link>
                </div>
            </div>
        </div>
    )
}