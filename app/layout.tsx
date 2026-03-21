import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/app-providers";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "sonner";

export const metadata: Metadata = {
  title: "ScrapeBot",
  description: "Automated web-scraper builder",
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
