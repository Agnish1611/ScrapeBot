import { DollarSignIcon, Home, ShieldCheckIcon, Workflow } from "lucide-react";
import { SidebarItems } from "../types/sidebar";

export const sidebarItems: SidebarItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Workflows",
        url: "/workflows",
        icon: Workflow,
    },
    {
        title: "Credentials",
        url: "/credentials",
        icon: ShieldCheckIcon,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: DollarSignIcon,
    }
];