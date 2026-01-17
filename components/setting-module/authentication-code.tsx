"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Copy, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "@tanstack/react-query";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { disableMFAMutationFn, mfaSetupQueryFn, mfaStatusFn, mfaType, verifyMFAMutationFn } from "@/features/auth-module/api/api";

const EnableMfa = ({ }: { isEnabled: boolean }) => {
  // const [enabled, setEnabled] = useState(isEnabled);
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mfaData, setMfaData] = useState<mfaType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSetupDialog, setShowSetupDialog] = useState(false);

  const { data, isLoading : isQuearyLoading , refetch, error } = useQuery({
    queryKey: ["mfa_status"],
    queryFn: mfaStatusFn,
    staleTime: Infinity,
  });

  const FormSchema = z.object({
    pin: z.string().length(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const res = await verifyMFAMutationFn({ code: values.pin });
      if (res.success) {
        toast.success(res.message);
        // setEnabled(true);
        setShowSetupDialog(false); // Close the setup dialog on success
        setMfaData(null); // Reset MFA data after enabling
        refetch()
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const setupMFA = async () => {
    try {
      setIsLoading(true);
      setShowSetupDialog(true); // Open dialog when setup starts
      const response = await mfaSetupQueryFn();
      if (!response.success || !response.qrImageUrl) {
        throw new Error(response.message || "Failed to enable 2FA");
      }
      setMfaData(response);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setShowSetupDialog(false); // Close dialog on failure
    } finally {
      setIsLoading(false);
    }
  };

  const disableMFA = async () => {
    try {
      const response = await disableMFAMutationFn();
      if (response.success) {
        toast.success("MFA disabled successfully");
        // setEnabled(false);
        refetch()
        setShowConfirmDialog(false);
      } else {
        throw new Error(response.message);
      }
    } catch {
      toast.error("Failed to disable MFA. Please try again.");
    }
  };

  const onToggle = () => {
    if (data.enabled) {
      setShowConfirmDialog(true);
    } else {
      setupMFA();
    }
  };

  //something went wrong component
  if ( error ) { 
    return (
      <div>
        <p className="text-red-600">Something went wrong</p>
      </div>
    )
  }

  const handleCopyClick = (): void => {
    //copy the secrert key to the clipboard
    if( mfaData ){
      navigator.clipboard.writeText(mfaData?.secret);
      toast.success("Secret key copied to clipboard");
    }
  }

  return (
    <div>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Label>Multi-Factor Authentication</Label>
            {data && data.enabled && (
              <span className="bg-green-500/20 text-green-500 text-xs h-6 px-2 rounded flex items-center">
                Enabled
              </span>
            )}
          </div>
          {
            isQuearyLoading ? (
              <Loader className="h-6 w-6 animate-spin" />
            ) : (
              <>
                {
                  data && 
                  <Switch checked={data.enabled} onCheckedChange={onToggle} />
                }
              </>
            )
          }
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Protect your account by adding an extra layer of security.
        </p>
      </div>






      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="w-11/12 rounded-lg md:w-12/12">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Disable Multi-Factor Authentication
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable Multi-Factor Authentication?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={disableMFA}
              className={buttonVariants({ variant: "destructive" })}
            >
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MFA Setup Dialog */}
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="gap-0 w-11/12 rounded-lg md:w-full">
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-sm md:text-md font-semibold">
              Setup Multi-Factor Authentication
            </p>
            <p className="mt-6 text-sm text-muted-foreground font-medium">
              Scan the QR code
            </p>
            <span className="text-sm text-muted-foreground font-normal">
              Use an app like{" "}
              <a
                className="text-blue-500"
                href="https://support.1password.com/one-time-passwords/"
                target="_blank"
                rel="noopener noreferrer"
              >
                1Password
              </a>{" "}
              or{" "}
              <a
                className="text-blue-500"
                href="https://safety.google/authentication/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Authenticator
              </a>{" "}
              to scan the QR code below.
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="rounded-md border p-2">
              {isLoading ? (
                <Skeleton className="w-40 h-40" />
              ) : (
                <div className="flex justify-center">
                  {
                    mfaData && <QRCodeSVG
                      value={mfaData.qrImageUrl}
                      size={200}
                      bgColor="transparent"
                      fgColor="dark:foreground"
                      className="dark:invert"
                    />
                  }

                </div>
              )}
            </div>
            {showKey ? (
              <>
                {
                  mfaData ? (
                    <div className="w-full max-w-55">
                      <div className="flex items-center gap-1 text-sm font-normal">
                        <span className="font-semibold">Copy setup key</span>
                        <button onClick={handleCopyClick} className="text-blue-500">
                          <Copy className="size-4" />
                        </button>
                      </div>
                      <p className="text-sm truncate font-normal text-muted-foreground">
                        {mfaData.secret}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Skeleton className="w-40 h-6" />
                    </div>
                  )
                }
              </>
            ) : (
              <span className="text-sm font-semibold">
                Can&apos;t scan the code?{" "}
                <button
                  className="text-blue-500"
                  type="button"
                  onClick={() => setShowKey(true)}
                >
                  View the Setup Key
                </button>
              </span>
            )}
          </div>
          <div className="mt-8 border-t">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mt-6 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs mb-1 text-muted-foreground">
                        Then enter the code
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          {...field}
                          className="justify-center"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="md:w-14 " />
                            <InputOTPSlot index={1} className="md:w-14 " />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} className="md:w-14 " />
                            <InputOTPSlot index={3} className="md:w-14 " />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} className="md:w-14 " />
                            <InputOTPSlot index={5} className="md:w-14 " />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full h-10">VERIFY</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnableMfa;
