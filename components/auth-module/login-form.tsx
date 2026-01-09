"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold text-primary/90 tracking-wide uppercase ">
            Run your entire finance team smarter with Bookwise.
          </h1>
          <p className="text-muted-foreground font-extralight  text-sm">
            Bookwise keeps everything organized, accurate, and audit-ready.
          </p>
        </div>
        <br />
        <Field>
          <FieldLabel htmlFor="email">EMAIL</FieldLabel>
          <Input id="email" type="email" placeholder="example@bookwise.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">PASSWORD</FieldLabel>

          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
              className="pr-10"
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
          <div className="flex items-center space-x-2">
              <Checkbox id="rememberPassword" />
              <FieldLabel
                htmlFor="rememberPassword"
                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
              >
                REMEMBER ME ON THIS DEVICE
              </FieldLabel>
            </div>
        </Field>
        <Field>
          <Button type="submit">SIGN IN</Button>
        </Field>
        <FieldDescription className="text-center">
          <Link
            href="/forgot-password">
                  FORGOT YOUR PASSWORD?
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
