"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FieldLabel } from "../ui/field";

export default function ProfileSettings() {
  return (
    <div className="mx-4 space-y-10">
      {/* Identity */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Identity</h2>

        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            Avatar
          </div>

          <Button variant="outline" size="sm">
            Change avatar
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Display name
            </FieldLabel>
            <Input value="Alex Morgan" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Legal name
            </FieldLabel>
            <Input placeholder="As it appears on records" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Username
            </FieldLabel>
            <Input value="alex.morgan" disabled />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Contact & preferences</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Email address
            </FieldLabel>
            <Input value="alex@bookwise.com" disabled />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Phone number
            </FieldLabel>
            <Input placeholder="+1 (555) 000-0000" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Time zone
            </FieldLabel>
            <Input value="UTC −05:00 (Eastern Time)" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Language
            </FieldLabel>
            <Input value="English (US)" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Work & access */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Work & access</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Organization
            </FieldLabel>
            <Input value="Bookwise Inc." disabled />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Role
            </FieldLabel>
            <Input value="Senior Accountant" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Department
            </FieldLabel>
            <Input placeholder="e.g. Finance, Audit, Payroll" />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Permission level
            </FieldLabel>
            <Input value="Standard user" disabled />
          </div>

          <div className="space-y-1">
            <FieldLabel className="text-xs text-muted-foreground">
              Account status
            </FieldLabel>
            <Input value="Active" disabled />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button disabled>Save changes</Button>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-muted-foreground/60 max-w-md">
        Profile details are used for audit logs, access control, and
        compliance records. Some fields may be restricted by your
        organization administrator.
      </p>
    </div>
  );
}
