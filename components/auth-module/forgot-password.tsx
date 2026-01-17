"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail =
    email.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Reset link sent. Check your inbox.");
      router.push("/password-reset-email");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {/* Header */}
          <div className="flex flex-col items-center gap-3 ">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/bookwise.png"
                alt="Bookwise logo"
                className="dark:invert rounded-md"
              />
            </Avatar>

            <h1 className="text-xl font-bold text-center">Forgot your password?</h1>
            <FieldDescription>
              Enter your email address and we&apos;ll send you a secure link to
              reset your password.
            </FieldDescription>
          </div>

          {/* Email */}
          <Field>
            {/* <FieldLabel htmlFor="email">Email address</FieldLabel> */}
            <Input
              id="email"
              type="email"
              placeholder="example@bookwise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!isValidEmail && email.length > 0}
            />

            {email.length > 0 && !isValidEmail && (
              <p className="text-xs text-red-600 mt-1">
                Please enter a valid email address
              </p>
            )}
          </Field>

          {/* Submit */}
          <Field>
            <Button
              type="submit"
              disabled={isLoading || !isValidEmail}
              className="w-full"
            >
              {isLoading ? "SENDING RESET LINK…" : "SEND RESET LINK"}
            </Button>
          </Field>

          {/* Helper text */}
          <p className="text-[11px] text-muted-foreground text-center">
            Didn&apos;t receive an email? Check your spam folder or try again in
            a few minutes.
          </p>
        </FieldGroup>
      </form>

      {/* Footer */}
      <FieldDescription className="text-center">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-medium">
          Sign in
        </Link>
      </FieldDescription>
    </div>
  );
}
