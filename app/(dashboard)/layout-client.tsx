"use client";

import { Session } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import MobileSidebar from "@/components/mobile-sidebar";
import SignoutButton from "@/components/signout-button";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const LayoutClient = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full h-dvh">
        <div className="flex flex-col flex-1 min-h-dvh">
          <header className="flex items-center justify-between px-6 py-4 max-sm:pl-14 h-[70px] container">
            <div className="flex items-center gap-4">
              <div className="max-sm:hidden">
                <SidebarTrigger />
              </div>
              <div className="sm:hidden">
                <MobileSidebar />
              </div>
              <BreadcrumbHeader />
            </div>
            <div className="gap-5 flex items-center">
              {!session ? (
                <div className="flex gap-5">
                  <Link href="/signin">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Signup</Button>
                  </Link>
                </div>
              ) : (
                <SignoutButton />
              )}
              <ModeToggle />
            </div>
          </header>
          <Separator />
          <div className="overflow-auto">
            <div className="flex-1 container py-4 text-accent-foreground">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LayoutClient;
