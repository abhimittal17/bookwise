"use client"

import * as React from "react"
import {
  Bell,
  Lock,
  ShieldAlert,
  Trash,
  User,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useSettingsDialog } from "./settings-dialog-context"
import ProfileSettings from "./profile-settings"
import PrivacySettings from "./privacy-settings"
import { NotificationSettings } from "./notification-settings"
import { ScrollArea } from "../ui/scroll-area"
import Advance from "./advance-settings"


const nav = [
  { name: "Personalization", key: "MY_PROFILE", icon: User, component: ProfileSettings },
  { name: "Security", key: "PRIVACY", icon: Lock, component: PrivacySettings },
  { name: "Notifications", key: "NOTIFICATIONS", icon: Bell, component: NotificationSettings },
  { name:"Account controls", key: "ADVANCE", icon: ShieldAlert, component: Advance}
] as const

export function SettingsDialog() {
  const { open, closeDialog, section, openDialog } = useSettingsDialog()

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="overflow-hidden max-h-140 p-0 md:max-h-150 md:max-w-150 lg:max-w-180">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your account settings and set e-mail preferences.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex w-48 shrink-0">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-4 space-y-0.5">
                    {nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton

                          isActive={section === item.key}
                          onClick={() =>
                            openDialog(item.key)
                          }
                        >
                          <item.icon />
                          <span className="text-accent-foreground">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-160 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 border-b border-muted  items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <div className="text-lg font-semibold">{nav.find(item => item.key === section)?.name}</div>
              </div>
            </header>
            <ScrollArea className="h-[calc(80vh-7rem)] pt-2 inset-0  my-3">
              <div className="flex flex-1 flex-col gap-4 pt-0">
                {(() => {
                  const currentComponent = nav.find(item => item.key === section)?.component
                  return currentComponent ? React.createElement(currentComponent) : null
                })()}
              </div>
            </ScrollArea>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
