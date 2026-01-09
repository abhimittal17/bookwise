"use client"

import * as React from "react"
import {
  DatabaseZap,
  User2,
  HomeIcon,
  Users,
  LayoutList,
  Clock4
} from "lucide-react"

import { NavMain } from "@/components/dashboard_layout/nav-main"
import { NavDocuments } from "@/components/dashboard_layout/nav-secondary"
import { NavUser } from "@/components/dashboard_layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { IconDatabase, IconFileWord, IconReport } from "@tabler/icons-react"

const data = {
  user: {
    name: "Abhi Mittal",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "HOME",
      url: "/home",
      icon: HomeIcon,
      isActive: true,

    },

    {
      title: "MANAGE DATA",
      url: "/data-management",
      icon: DatabaseZap,

    },
    {
      title: "MANAGE TEAM",
      url: "/team-management",
      icon: Users

    },
    {
      title: "MY ATTENDANCE",
      url: "/my-attendance",
      icon:   Clock4,
    },
    {
      title: "TASKS",
      url: "/tasks",
      icon: LayoutList,

    },
    {
      title: "MY PROFILE",
      url: "/profile",
      icon: User2,

    },

  ],
  documents: [
    {
      name: "DATA LIBRARY",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "REPORTS",
      url: "#",
      icon: IconReport,
    },
    {
      name: "WORD ASSISTANT",
      url: "#",
      icon: IconFileWord,
    },
  ],


}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:text-sidebar-accent-foreground data-[state=open]:rounded-none hover:bg-transparent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/bookwise.png" alt="logo" className="dark:invert rounded-tr-md rounded-tl rounded-br" />
          </Avatar>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
