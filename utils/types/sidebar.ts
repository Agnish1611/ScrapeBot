import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface SidebarItems extends Array<SidebarItem> { }