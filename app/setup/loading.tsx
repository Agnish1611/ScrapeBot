import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Image
        src="/assets/images/logo-with-name.png"
        alt="logo"
        height={50}
        width={200}
        priority
      />
      <Separator className="max-w-xs" />
      <div className="flex items-center gap-2 justify-center">
        <Loader2Icon size={16} className="animate-spin stroke-primary" />
        <p className="text-muted-foreground">Setting up your account</p>
      </div>
    </div>
  );
};

export default loading;
