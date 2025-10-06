"use client"

import * as React from "react"
import {
  Apple,
  Dna,
  Info,
  Sparkles,
  Dumbbell
} from "lucide-react"
import Link from "next/link";
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import avatarImg from "@/app/avatar1.jpg"
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "Mario Rossi",
    email: "mario.rossi@email.it",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Analisi",
      url: "/dashboard",
      icon: Sparkles,
    },
    {
      title: "Dieta",
      url: "/dieta",
      icon: Apple,
    },
    {
      title: "Fit",
      url: "#",
      icon: Dumbbell,
      
    },
    {
      title: "Scopri di più",
      url: "#",
      icon: Info,
      
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar - nascosta su mobile */}
      <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="bg-white text-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Dna></Dna>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-gray-500"><span className="text-black font-bold">healthy</span>genome</span>
                  <span className="truncate text-xs">Iacopo Paolucci</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>

      {/* Mobile Bottom Navigation - visibile solo su mobile */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 rounded-full z-50 bg-background border shadow-2xl">
        <div className="rounded-full grid grid-cols-4 h-16">
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`
                  flex flex-col items-center justify-center gap-1
                  transition-colors
                  ${
                    isActive
                      ? "rounded-full text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  )
}
