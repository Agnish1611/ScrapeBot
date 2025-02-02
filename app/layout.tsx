import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppProviders from "@/components/providers/app-providers";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "sonner";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = "light";

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <body className="__variable_d65c78 antialiased" cz-shortcut-listen="true">
        <AppProviders>
          <ToasterShadcn />
          <ToasterSonner />
          <main className="w-full">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
