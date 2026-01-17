"use client"

import * as React from "react"
import {
  Bell,
  Lock,
  Paintbrush,
  User,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
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
import { ProfileSettings } from "./profile-settings"
import { PrivacySettings } from "./privacy-settings"
import { NotificationSettings } from "./notification-settings"
import { AppearanceSettings } from "./appearance-settings"


const nav = [
  { name: "MY PROFILE", key: "MY_PROFILE", icon: User,component: ProfileSettings },
  { name: "SECURITY & PRIVACY", key: "PRIVACY", icon: Lock, component: PrivacySettings },
  { name: "NOTIFICATIONS", key: "NOTIFICATIONS", icon: Bell, component: NotificationSettings },
  { name: "APPEARANCE", key: "APPEARANCE", icon: Paintbrush, component: AppearanceSettings },
] as const

export function SettingsDialog() {
  const { open, closeDialog, section, openDialog } = useSettingsDialog()

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="overflow-hidden max-h-140 p-0 md:max-h-150 md:max-w-150 lg:max-w-200">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your account settings and set e-mail preferences.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex w-48 shrink-0">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-4">
                    {nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                    
                       isActive={section === item.key}
                          onClick={() =>
                            openDialog(item.key)
                          }
                        >
                            <item.icon />
                            <span className="text-xs text-accent-foreground">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-160 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{nav.find(item => item.key === section)?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {(() => {
                const currentComponent = nav.find(item => item.key === section)?.component
                return currentComponent ? React.createElement(currentComponent) : null
              })()}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
