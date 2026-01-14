import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Logout({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }

      router.push("/sign-in");
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            CONFIRM LOGOUT
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            CANCEL
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className={buttonVariants({ variant: "destructive" })}
          >
            LOGOUT
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
