
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Avatar, AvatarImage } from "../ui/avatar"

export function MultiFactor({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex  gap-2 md:justify-between items-center">
                            <div className="flex items-center gap-2 font-medium">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
                                </Avatar>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">MULTI-FACTOR AUTHENTICATION</h1>
                        <FieldDescription>
                            Please enter the 6-digit verification code sent to your authentication app.
                        </FieldDescription>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="otp" className="sr-only">
                            Verification code
                        </FieldLabel>
                        <InputOTP
                            maxLength={6}
                            id="otp"
                            required
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
                    </Field>
                    <Field>
                        <Button type="submit">VERIFY</Button>
                    </Field>
                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
                BY SIGNING IN, YOU AGREE TO OUR <span className="underline">TERMS OF SERVICE</span> AND <span className="underline">PRIVACY POLICY</span>.

            </FieldDescription>
        </div>
    )
}
