import React, { useState } from "react";
import { Kanban, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { sidebarItems } from "@/utils/constants/sidebar";
import { SidebarItem } from "@/utils/types/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useTheme } from "next-themes";
import UserAvailableCredits from "./user-available-credits";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname: string = usePathname();
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md"
      >
        {isOpen ? <X /> : <Kanban className="-rotate-90" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-md"
        >
          <X />
        </button>

        <nav className="p-6 mt-5">
          <div className="p-5 my-5">
            <Image
              src="/assets/images/logo-with-name.png"
              alt="logo"
              height={200}
              width={500}
              priority
            />
          </div>
          <SidebarGroupContent>
          <div className="p-2"><UserAvailableCredits /></div>
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
                  onClick={toggleSidebar}
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
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
