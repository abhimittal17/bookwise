"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  token: string;
}

export function ResetPasswordForm({
  token,
  className,
  ...props
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!$@%]/.test(password);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const isValid =
    hasMinLength && hasNumber && hasSymbol && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Reset link expired or invalid"
        );
      }

      router.push("/password-changed");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit} noValidate>
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

            <h1 className="text-xl font-bold">Reset your password</h1>
            <FieldDescription className="max-w-sm">
              Choose a strong new password for your account.
            </FieldDescription>
          </div>

          {/* New password */}
          <Field>
            <FieldLabel htmlFor="password">New password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             
                placeholder="Create a new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

          
          </Field>

          {/* Confirm */}
          <Field>
            <FieldLabel htmlFor="confirm-password">
              Confirm password
            </FieldLabel>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-0 px-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs text-red-600 mt-1">
                Passwords do not match
              </p>
            )}
          </Field>

          {/* Rules */}
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className={hasMinLength ? "text-green-600" : ""}>
              • At least 8 characters
            </li>
            <li className={hasNumber ? "text-green-600" : ""}>
              • Contains a number
            </li>
            <li className={hasSymbol ? "text-green-600" : ""}>
              • Contains a symbol (!$@%)
            </li>
          </ul>

          {error && (
            <FieldDescription className="text-destructive/70">
              {error}
            </FieldDescription>
          )}

          <Field>
            <Button
              type="submit"
              disabled={loading || !isValid}
              className="w-full"
            >
              {loading ? "Resetting…" : "Reset password"}
            </Button>
          </Field>

          <p className="text-[11px] text-muted-foreground/60 text-center">
            For security, this link can only be used once.
          </p>
        </FieldGroup>
      </form>

      <FieldDescription className="text-center">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-medium">
          Sign in
        </Link>
      </FieldDescription>
    </div>
  );
}
