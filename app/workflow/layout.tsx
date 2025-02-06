import { ModeToggle } from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-dvh">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Image
          src="/assets/images/logo-with-name.png"
          alt="logo"
          height={100}
          width={150}
          priority
        />
        <ModeToggle />
      </footer>
    </div>
  );
};

export default layout;
