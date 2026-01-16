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
import { useRouter } from "next/navigation"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        router.push("/password-changed");
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex  gap-2 md:justify-between items-center">
                <div className="flex items-center gap-2 font-medium">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
                  </Avatar>

                </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>
          {error && (
            <FieldDescription className="text-destructive/70">
              {error}
            </FieldDescription>
          )}
          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "RESETTING..." : "RESET PASSWORD"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="text-center">
        REMEMBER YOUR PASSWORD? <Link href="/sign-in">SIGN IN</Link>
      </FieldDescription>
    </div>
  )
}
