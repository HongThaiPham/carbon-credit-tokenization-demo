"use client";

import * as React from "react";
import {
  ArrowDownUpIcon,
  HistoryIcon,
  LayersIcon,
  LeafyGreenIcon,
  LifeBuoy,
  PlusCircleIcon,
  RefreshCwIcon,
  Send,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const data = {
  user: {
    name: "Leo Pham",
    email: "hongthaipro@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Data endpoints",
      url: "/admin/endpoints",
      icon: SettingsIcon,
      isActive: true,
    },
    {
      title: "Create token",
      url: "/admin/create-token",
      icon: PlusCircleIcon,
    },
    {
      title: "User KYC",
      url: "/admin/user-kyc",
      icon: UsersIcon,
    },
  ],
  navMainForMinter: [
    {
      title: "Mint token",
      url: "/minter/mint-token",
      icon: LayersIcon,
      isActive: true,
    },
    {
      title: "Mint history",
      url: "/minter/mint-history",
      icon: HistoryIcon,
    },
  ],
  navMainForTrader: [
    {
      title: "Swap",
      url: "/trader/swap",
      icon: ArrowDownUpIcon,
      isActive: true,
    },
    {
      title: "Retire",
      url: "/trader/retire",
      icon: RefreshCwIcon,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LeafyGreenIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Carbon Credit</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="ADMIN" items={data.navMain} />
        <NavMain label="MINTER" items={data.navMainForMinter} />
        <NavMain label="TRADER" items={data.navMainForTrader} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
