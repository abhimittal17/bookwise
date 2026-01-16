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
import { Avatar } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      toast.success("Password reset link sent to your email");
      router.push("/password-reset-email");
    } 
    catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } 
    finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit} >
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
              <h1 className="text-xl font-bold">FORGOT YOUR PASSWORD?</h1>
              <FieldDescription>
                Enter your email address below and we&apos;ll send you a link to reset
              </FieldDescription>
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor="email">EMAIL</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@bookwise.com"
              required
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isLoading}>{isLoading ? "SENDING..." : "FORGOT PASSWORD"}</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="text-center">
        REMEMBER YOUR PASSWORD? <Link href="/sign-in">SIGN IN</Link>
      </FieldDescription>
    </div>
  )
}
