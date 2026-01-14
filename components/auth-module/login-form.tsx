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
import {  useState } from "react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("rememberMe") === "true";
  });

  const [email, setEmail] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    if (localStorage.getItem("rememberMe") === "true") {
      return localStorage.getItem("rememberEmail") ?? "";
    }
    return "";
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    // const formData = new FormData(e.currentTarget);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (data.code) {
          case "USER_NOT_FOUND":
            toast.error("Email not found or inactive account.");
            break;

          case "WRONG_PASSWORD":
            toast.error("Password is incorrect.");
            break;

          case "RATE_LIMITED":
            toast.error("Too many attempts. Try again later.");
            break;

          case "INVALID_INPUT":
            toast.error("Please enter email and password.");
            break;

          default:
            toast.error("Something went wrong. Please try again.");
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

      // toast.success("Signed in successfully!");
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
        <div className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl font-semibold uppercase">
            Run your entire finance team smarter with Bookwise.
          </h1>
          <p className="text-muted-foreground text-sm">
            Bookwise keeps everything organized, accurate, and audit-ready.
          </p>
        </div>
        <br />
        <Field>
          <FieldLabel htmlFor="email">EMAIL</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="example@bookwise.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">PASSWORD</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              placeholder="*********"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Field>
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              value="true"
              
              checked={remember}
              onCheckedChange={v => setRemember(v === true)}
            />
            <FieldLabel htmlFor="rememberMe"  className="text-xs">
              REMEMBER ME ON THIS DEVICE
            </FieldLabel>
          </div>
        </Field>

        <Button type="submit" disabled={loading}>
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </Button>

        <FieldDescription className="text-center">
          <Link href="/forgot-password">FORGOT YOUR PASSWORD?</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
