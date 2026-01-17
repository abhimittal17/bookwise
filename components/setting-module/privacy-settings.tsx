import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "../ui/switch";
import { ChangePassword } from "./change-password";
import { ChevronRight } from "lucide-react";

export default function PrivacySettings() {
	return (
		<div className="mx-4 space-y-8">
			{/* Password */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">Password</p>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Change password</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Use a strong password you don&apos;t reuse elsewhere.
						</p>
					</div>
					<ChangePassword />
				</div>

				<p className="text-[11px] text-muted-foreground/60">
					Last changed: 3 months ago
				</p>
			</div>

			<Separator />

			{/* MFA */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">
					Multi-factor authentication (MFA)
				</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Authenticator app</span>
						<p className="text-xs text-muted-foreground">
							Use one-time codes from an authenticator app.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Recovery codes</span>
						<p className="text-xs text-muted-foreground">
							Access your account if you lose your MFA device.
						</p>
					</div>
					<Button variant="ghost" size="icon">
						<ChevronRight />
					</Button>
				</div>
			</div>

			<Separator />

			{/* Sessions */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">Sessions & devices</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Manage logged-in devices</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							View and manage active sessions across devices.
						</p>
					</div>
					<Button variant="ghost" size="icon">
						<ChevronRight />
					</Button>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Session timeout</span>
						<p className="text-xs text-muted-foreground">
							Automatically log out after inactivity.
						</p>
					</div>
					<Button variant="outline" className="text-xs rounded-full">
						30 minutes
					</Button>
				</div>
			</div>

			<Separator />

			{/* Security Alerts */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">Security alerts</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Login notifications</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Get notified when a new device logs into your account.
						</p>
					</div>
					<Switch />
				</div>
			</div>

			<Separator />

			{/* Logout */}
			<div className="space-y-4">
				<p className="text-sm font-semibold text-red-600">Sign out</p>

				<div className="flex items-center justify-between">
					<span className="text-sm">Log out of this device</span>
					<Button variant="outline" className="text-xs rounded-full">
						Log out
					</Button>
				</div>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Log out of all devices</span>
						<p className="text-xs text-muted-foreground/70 max-w-xs">
							End all active sessions. Other devices may take up to
							30 minutes to sign out.
						</p>
					</div>
					<Button
						variant="outline"
						className="text-xs rounded-full border-red-700 text-red-700 hover:text-red-900 hover:border-red-700"
					>
						Log out all
					</Button>
				</div>
			</div>

			<p className="text-[11px] text-muted-foreground/60 max-w-md">
				Some security actions may require re-authentication.
			</p>
		</div>
	);
}
