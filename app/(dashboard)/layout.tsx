import LayoutClient from "./layout-client";
import { headers } from "next/headers";
import { auth } from "@/auth";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <LayoutClient session={session}>{children}</LayoutClient>;
}

export default RootLayout;
