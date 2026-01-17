import { Separator } from "@/components/ui/separator";
import { Switch } from "../ui/switch";

export function NotificationSettings() {
	return (
		<div className="mx-4 space-y-8">
			{/* Channels */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">Notification channels</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Email notifications</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Receive important updates and summaries via email.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Push notifications</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Get real-time alerts on your devices.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">In-app notifications</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							See notifications inside the app.
						</p>
					</div>
					<Switch checked disabled />
				</div>
			</div>

			<Separator />

			{/* Notification Types */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">What you receive</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Product updates</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Changes that affect how the product works.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">New feature announcements</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Be notified when new features are released.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Marketing & promotions</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Occasional tips, offers, and newsletters.
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Security alerts</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Login attempts, password changes, and security events.
						</p>
					</div>
					<Switch checked disabled />
				</div>
			</div>

			<Separator />

			{/* Preferences */}
			<div className="space-y-4">
				<p className="text-sm font-semibold">Preferences</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Notification frequency</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Control how often we notify you.
						</p>
					</div>
					<span className="text-xs text-muted-foreground">
						Real-time
					</span>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm">Quiet hours</span>
						<p className="text-xs text-muted-foreground max-w-xs">
							Pause non-critical notifications during set hours.
						</p>
					</div>
					<Switch />
				</div>
			</div>

			<p className="text-[11px] text-muted-foreground/60 max-w-md">
				Critical security notifications are always enabled and cannot be turned off.
			</p>
		</div>
	);
}
