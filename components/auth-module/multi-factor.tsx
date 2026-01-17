"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useState } from "react";

export function MultiFactor({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isComplete = otp.length === 6;

    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!isComplete) return;
                    setLoading(true);
                    setError(null);
                    // submit logic here
                }}
            >
                <FieldGroup>
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
                            Multi-factor authentication
                        </h1>

                        <FieldDescription className="max-w-sm">
                            Enter the 6-digit code from your authenticator
                            app (Google Authenticator, Authy, etc.).
                        </FieldDescription>
                    </div>

                    {/* OTP */}
                    <Field>
                        <FieldLabel htmlFor="otp" className="sr-only">
                            Verification code
                        </FieldLabel>

                        <InputOTP
                            id="otp"
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            containerClassName="gap-4"
                        >
                            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-10 md:*:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>

                            <InputOTPSeparator />

                            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-10 md:*:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Codes refresh every 30 seconds and can only be
                            used once.
                        </p>
                    </Field>

                    {/* Error */}
                    {error && (
                        <FieldDescription className="text-destructive/70 text-center">
                            {error}
                        </FieldDescription>
                    )}

                    {/* Submit */}
                    <Field>
                        <Button
                            type="submit"
                            disabled={!isComplete || loading}
                            className="w-full"
                        >
                            {loading ? "Verifying…" : "Verify"}
                        </Button>
                    </Field>

                    {/* Recovery */}
                    <div className="text-center space-y-2">
                        <Link
                            href="/use-recovery-code"
                            className="text-xs underline"
                        >
                            Use a recovery code
                        </Link>

                        <p className="text-xs text-muted-foreground">
                            Can&apos;t access your authenticator?{" "}
                            <span className="underline">
                                Get help
                            </span>
                        </p>
                    </div>
                </FieldGroup>
            </form>

            {/* Legal */}
            <FieldDescription className="px-6 text-center text-[11px]">
                By signing in, you agree to our{" "}
                <span className="underline">
                    Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline">
                    Privacy Policy
                </span>
                .
            </FieldDescription>
        </div>
    );
}
