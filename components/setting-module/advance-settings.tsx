import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function AccountDeletion() {
    return (
        <div className="mx-4 space-y-8">
            <div className="space-y-6">
                <p className="text-xs font-medium text-muted-foreground">
                    Data management
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Back up your data</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            Create a secure backup to restore your account later.
                        </p>
                    </div>
                    <Button variant="outline" className="text-xs rounded-full">
                        Backup data
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Restore from backup</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            Restore your account using a previously created backup.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="text-xs rounded-full"
                        disabled
                    >
                        Restore
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Download your data</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            Export your data (JSON / CSV) for personal records.
                        </p>
                    </div>
                    <Button variant="outline" className="text-xs rounded-full">
                        Download
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="space-y-6">
                <p className="text-xs font-medium text-muted-foreground">
                    Account controls
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Deactivate account</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            Temporarily disable your account. Reactivate anytime by logging in.
                        </p>
                    </div>
                    <Button variant="outline" className="text-xs rounded-full">
                        Deactivate
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="space-y-6">
                <p className="text-xs font-medium text-red-600">
                    Danger zone
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Delete organization</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            Permanently remove the organization and all related data.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="text-xs rounded-full border-red-700 text-red-700 hover:text-red-900 hover:border-red-700"
                    >
                        Delete organization
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm">Delete account</span>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                            This permanently deletes your account and cannot be undone.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="text-xs rounded-full border-red-700 text-red-700 hover:text-red-900 hover:border-red-700"
                    >
                        Delete account
                    </Button>
                </div>
            </div>

            <p className="text-[11px] text-muted-foreground/60">
                For security reasons, some actions may require password or multi-factor authentication.
            </p>
        </div>
    );
}
