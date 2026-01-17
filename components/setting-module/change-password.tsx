"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Eye, EyeOff,} from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import Link from "next/link";

export function ChangePassword() {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const hasMinLength = newPassword.length >= 8;
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!$@%]/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

    const passwordStrength =
        hasMinLength && hasNumber && hasSymbol
            ? "Strong"
            : newPassword.length > 0
            ? "Weak"
            : "";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-xs rounded-full">
                    Change
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-md font-semibold">
                        Change password
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Use at least 8 characters with letters, numbers, and symbols (!$@%).
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-4">
                    {/* Current password */}
                    <Field>
                        <div className="relative">
                            <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Current password"
                                required
                              
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3"
                                onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                }
                            >
                                {showCurrentPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </Field>

                    {/* New password */}
                    <Field>
                        <div className="relative">
                            <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3"
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                            >
                                {showNewPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>

                        {passwordStrength && (
                            <p
                                className={`text-xs mt-1 ${
                                    passwordStrength === "Strong"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Password strength: {passwordStrength}
                            </p>
                        )}
                    </Field>

                    {/* Confirm password */}
                    <Field>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>

                        {confirmPassword.length > 0 && !passwordsMatch && (
                            <p className="text-xs text-red-600 mt-1">
                                Passwords do not match
                            </p>
                        )}
                    </Field>

                    {/* Password rules */}
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

                    <FieldDescription className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-blue-500 text-sm"
                        >
                            Forgot your password?
                        </Link>
                    </FieldDescription>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={
                            isLoading ||
                            !passwordsMatch ||
                            !hasMinLength ||
                            !hasNumber ||
                            !hasSymbol
                        }
                    >
                        {isLoading ? "Changing..." : "Change password"}
                    </Button>

                    <div className="flex items-center gap-2">
                        <Checkbox id="logout" />
                        <FieldLabel
                            htmlFor="logout"
                            className="text-xs text-muted-foreground"
                        >
                            Log out of all devices after changing password
                        </FieldLabel>
                    </div>

                    <p className="text-[11px] text-muted-foreground/60">
                        For security reasons, you may be asked to re-authenticate.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
