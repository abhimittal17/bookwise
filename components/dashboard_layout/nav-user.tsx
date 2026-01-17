"use client"

import {
  LogOut,
  ArrowDownUp,
  Settings,
  // CircleUser,
  // CreditCard,
  // Info,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logout from "../auth-module/logout"
import { useState } from "react"
import { IconNotification } from "@tabler/icons-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar();
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [color] = useState(() => Math.floor(Math.random() * 16777215).toString(16));

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=!open]:rounded-none rounded-md bg-sidebar-accent"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?backgroundColor=${color}`} alt={user.name} />
                <AvatarFallback className="rounded-md">AB</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ArrowDownUp className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "top" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?backgroundColor=${color}`} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AB</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup >
               <Link href="/profile">
                <DropdownMenuItem className="text-xs text-accent-foreground">
                  <Settings />
                  PROFILE
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="text-xs text-accent-foreground">
                  <Settings />
                  SETTINGS
                </DropdownMenuItem>
              </Link>
              <Link href="/notifications">
                <DropdownMenuItem className="text-xs text-accent-foreground">
                  <IconNotification />
                  NOTIFICATIONS
                </DropdownMenuItem>
              </Link>
              {/* <Link href="/billing">
                <DropdownMenuItem className="text-xs text-accent-foreground">
                  <CreditCard />
                  BILLING
                </DropdownMenuItem>
              </Link> */}
              {/* <Link href="/help">
                <DropdownMenuItem className="text-xs text-accent-foreground">
                  <Info />
                  GET HELP
                </DropdownMenuItem>
              </Link> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLogoutDialog(true)} className="text-xs text-accent-foreground">
              <LogOut />
              LOG OUT
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Logout
          open={logoutDialog}
          onOpenChange={setLogoutDialog}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
