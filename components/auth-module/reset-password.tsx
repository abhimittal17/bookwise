"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Avatar } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex  gap-2 md:justify-between items-center">
                <div className="flex items-center gap-2 font-medium">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
                  </Avatar>

                </div>
                {/* <p className="text-xs">BOOKWISE.</p> */}
              </div>
              <h1 className="text-xl font-bold">RESET YOUR PASSWORD</h1>
              <FieldDescription>
                Enter your new password below to reset your account password.
              </FieldDescription>
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor="password">NEW PASSWORD</FieldLabel>
           <div className="relative">
             <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              required
            />
            <button
            type="button"
            onClick={()=> setShowPassword(!showPassword)}
             className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
              </button>
           </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">CONFIRM PASSWORD</FieldLabel>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>
          <Field>
            <Button type="submit">RESET PASSWORD</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="text-center">
        REMEMBER YOUR PASSWORD? <Link href="/sign-in">SIGN IN</Link>
      </FieldDescription>
    </div>
  )
}
