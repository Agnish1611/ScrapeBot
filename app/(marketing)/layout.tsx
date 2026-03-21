import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { buttonVariants } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="container mx-auto px-4 sm:px-8 flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Image 
                src="/assets/images/logo-with-name.png" 
                alt="ScrapeBot Logo" 
                width={160} 
                height={44} 
                priority 
                className="object-contain"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
              <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link 
              href="/signin" 
              className={`${buttonVariants({ variant: "ghost" })} hidden sm:inline-flex rounded-full px-6`}
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className={`${buttonVariants({ variant: "default" })} rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center w-full pt-20">
        {children}
      </main>
      <footer className="border-t border-border/40 py-12 w-full bg-background/50">
        <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <Image 
                src="/assets/images/logo-with-name.png" 
                alt="ScrapeBot Logo" 
                width={120} 
                height={32} 
                className="object-contain opacity-50 grayscale"
              />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} ScrapeBot. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
