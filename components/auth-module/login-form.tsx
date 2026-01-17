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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Turnstile } from "next-turnstile";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [turnstileStatus, setTurnstileStatus] =
    useState<"required" | "error" | "expired" | "success">("required");

  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("rememberMe") === "true";
  });

  const [email, setEmail] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("rememberMe") === "true"
      ? localStorage.getItem("rememberEmail") ?? ""
      : "";
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    isValidEmail &&
    password.length > 0 &&
    turnstileStatus === "success" &&
    !loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          remember,
          token: "cf-turnstile-response",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (data.code) {
          case "USER_NOT_FOUND":
            toast.error("Email not found or inactive account.");
            break;
          case "WRONG_PASSWORD":
            toast.error("Incorrect password.");
            break;
          case "RATE_LIMITED":
            toast.error("Too many attempts. Try again later.");
            break;
          case "TURNSTILE_FAILED":
            toast.error("Security verification failed.");
            break;
          default:
            toast.error("Unable to sign in. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (remember) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberMe");
      }

      router.push("/home");
    } catch {
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl font-semibold uppercase">
            Run your finance team smarter with Bookwise
          </h1>
          <p className="text-muted-foreground text-sm">
            Secure, organized, and audit-ready financial workflows.
          </p>
        </div>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@bookwise.com"
            aria-invalid={!isValidEmail && email.length > 0}
            required
          />
          {email.length > 0 && !isValidEmail && (
            <FieldDescription className="text-destructive/70">
              Enter a valid email address
            </FieldDescription>
          )}
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        {/* Turnstile */}
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          retry="auto"
          refreshExpired="auto"
          sandbox={process.env.NODE_ENV === "development"}
          onError={() => {
            setTurnstileStatus("error");
            setError("Security check failed.");
          }}
          onExpire={() => {
            setTurnstileStatus("expired");
            setError("Security check expired.");
          }}
          onVerify={() => {
            setTurnstileStatus("success");
            setError(null);
          }}
        />

        {error && (
          <FieldDescription className="text-destructive/70">
            {error}
          </FieldDescription>
        )}

        {/* Remember */}
        <Field>
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={remember}
              onCheckedChange={(v) => setRemember(!!v)}
            />
            <FieldLabel htmlFor="rememberMe" className="text-xs">
              Remember this device
            </FieldLabel>
          </div>
        </Field>

        {/* Submit */}
        <Button type="submit" disabled={!canSubmit}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        {/* Footer */}
        <FieldDescription className="text-center">
          <Link href="/forgot-password">Forgot your password?</Link>
        </FieldDescription>

        <p className="text-[11px] text-muted-foreground text-center">
          New or unrecognized devices may require additional verification.
        </p>
      </FieldGroup>
    </form>
  );
}
