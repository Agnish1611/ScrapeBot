"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sidebarItems } from "@/utils/constants/sidebar";
import { SidebarItem } from "@/utils/types/sidebar";
import { buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";

export function AppSidebar() {
  const pathname: string = usePathname();

  return (
    <Sidebar className="max-md:hidden" collapsible="icon">
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel className="p-5 my-5">
            <Image
              src="/assets/images/logo-with-name.png"
              alt="logo"
              height={200}
              width={500}
              priority
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item: SidebarItem) => (
                <SidebarMenuItem
                  key={item.title}
                  className={buttonVariants({
                    variant:
                      pathname === item.url
                        ? "activeSidebarItem"
                        : "sidebarItem",
                  })}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
