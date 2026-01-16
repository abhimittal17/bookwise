import { AppSidebar } from "@/components/dashboard_layout/app-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/common-module/theme-provider";
import { ModeSwitcher } from "@/components/common-module/mode-switcher"
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-12 shrink-0 items-center gap-2  border  rounded-lg m-2 bg-sidebar drop-shadow-xs/5">
                        <div className="flex flex-1 items-center gap-2 px-2 md:px-3">
                            <SidebarTrigger />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                        </div>
                        <div className="ml-auto px-2 flex items-center gap-2">
                            <Badge variant="default" className="px-2 py-1 text-xs">
                                CHECK IN : 00:00 hrs
                            </Badge>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full"
                            >
                                <Bell />
                            </Button>

                            <ModeSwitcher />

                        </div>
                    </header>

                    <ScrollArea className="h-[calc(100vh-5rem)] pt-2 inset-0">
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>
                    </ScrollArea>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider >
    )
}
