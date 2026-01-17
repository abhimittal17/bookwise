"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ResendEmailButton() {
    const [loading, setLoading] = useState(false);

    async function handleResend() {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Too many requests");
            } else {
                toast.success("If the email exists, a reset link was sent again.");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant="link"
            onClick={handleResend}
            disabled={loading}
            className="p-0 h-auto"
        >
            {loading ? "Sending..." : "Resend email"}
        </Button>
    );
}
