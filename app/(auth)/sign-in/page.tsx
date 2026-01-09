"use client"
import { LoginForm } from "@/components/auth-module/login-form"
import { Avatar } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile";
import { AvatarImage } from "@radix-ui/react-avatar"


export default function LoginPage() {
    const mobile = useIsMobile();
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-4 md:px-8">
                <div className="flex  gap-2 md:justify-between items-center">
                    <div className="flex items-center gap-2 font-medium">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
                        </Avatar>

                    </div>
                    <p className="text-xs">BOOKWISE.</p>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">BY SIGNING IN, YOU AGREE TO OUR <span className="underline">TERMS OF SERVICE</span> AND <span className="underline">PRIVACY POLICY</span>.</p>
            </div>
            {!mobile && (
                <div className="bg-muted hidden lg:block">
                    <video className="h-full w-full object-cover" autoPlay muted loop>
                        <source src="/loginbookwise.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    )
}
