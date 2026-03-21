import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Bot, BarChart, Clock, Sparkles, Grip, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <div className="w-full flex-col relative overflow-hidden">
      {/* Hero Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-60 dark:opacity-30" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-chart-1/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40 dark:opacity-20 hidden md:block" />

      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-appearance backdrop-blur-sm shadow-sm shadow-primary/10">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>ScrapeBot 2.0 is now live — Smarter, faster, easier</span>
        </div>
        
        <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-8 animate-appearance leading-[1.1]" style={{ animationDelay: "100ms" }}>
          Extract data visually. <br className="hidden md:block" />
          Automate with <span className="text-primary relative inline-block">
            AI Magic
            <svg className="absolute -bottom-2 w-full h-3 text-primary/40 -z-10 left-0" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 animate-appearance leading-relaxed" style={{ animationDelay: "200ms" }}>
          Stop writing messy scraping scripts. ScrapeBot gives you a stunning visual canvas to build scraping pipelines, powered by advanced LLMs to intelligently extract exactly what you need.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-appearance w-full justify-center px-4" style={{ animationDelay: "300ms" }}>
          <Link href="/signup" className={buttonVariants({ variant: "default", size: "lg", className: "h-14 px-8 text-lg font-medium shadow-lg shadow-primary/25 rounded-full" })}>
            Build Your First Scraper
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="#how-it-works" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg font-medium rounded-full bg-background/50 backdrop-blur-sm" })}>
            See How It Works
          </Link>
        </div>

        {/* Hero Image (Dashboard) */}
        <div className="mt-20 w-full max-w-6xl rounded-2xl bg-background border border-border shadow-2xl shadow-primary/10 overflow-hidden relative animate-appearance flex flex-col items-center justify-center p-1 md:p-3" style={{ animationDelay: "400ms" }}>
          <Image 
            src="/assets/images/dashboard.png" 
            alt="ScrapeBot Workflow Editor" 
            width={1200} 
            height={800} 
            className="rounded-xl object-cover w-full h-auto border border-border shadow-sm"
            priority
          />
        </div>
      </section>


      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="container mx-auto px-4 py-32">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="text-primary font-semibold tracking-wide uppercase mb-2">Workflow</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Scraping made stupid simple</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            You don&apos;t need a PhD in DOM traversal to get your data. Just follow these three intuitive steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-[20%] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">1</div>
            <h3 className="text-xl font-bold mb-3">Drop the URL</h3>
            <p className="text-muted-foreground">Start by pasting the target URL into the visual builder canvas. We handle the proxies and stealth configurations instantly.</p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">2</div>
            <h3 className="text-xl font-bold mb-3">Tell AI what you want</h3>
            <p className="text-muted-foreground">Don&apos;t write CSS selectors. Just describe the data shape you need in plain English. Our LLMs figure out the rest accurately.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">3</div>
            <h3 className="text-xl font-bold mb-3">Automate & Export</h3>
            <p className="text-muted-foreground">Schedule the workflow using cron syntax and push the structured output directly to your CRM, Webhooks, or Databases.</p>
          </div>
        </div>
      </section>

      {/* 4. BENTO GRID FEATURES */}
      <section id="features" className="bg-muted/10 py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-primary font-semibold tracking-wide uppercase mb-2">Features</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to scrape at scale</h2>
              <p className="text-lg text-muted-foreground">
                Our platform provides powerful tools beneath a minimalistic interface, engineered for reliability.
              </p>
            </div>
            <Link href="/signup" className={buttonVariants({ variant: "outline", className: "h-12 px-6 rounded-full bg-background" })}>
              View All Features <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
            {/* Large Feature - Visual Builder */}
            <div className="col-span-1 md:col-span-2 row-span-2 group relative overflow-hidden rounded-3xl bg-background border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-8 flex flex-col justify-end min-h-[400px]">
              <div className="absolute top-8 left-8 p-3 bg-secondary rounded-2xl border border-border/50 text-primary">
                <Grip className="h-8 w-8" />
              </div>
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-3">Visual Canvas Builder</h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  Construct complex scraping pipelines using our intuitive drag-and-drop interface. Connect actions, extractors, and logic nodes effortlessly without a single line of code.
                </p>
              </div>
            </div>

            {/* Medium Feature - AI Extraction */}
            <div className="col-span-1 md:col-span-2 group relative overflow-hidden rounded-3xl bg-background border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-8 flex flex-col justify-end min-h-[250px]">
              <div className="absolute right-8 top-8 p-4 bg-purple-500/10 rounded-full text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                <Bot className="h-10 w-10" />
              </div>
              <div className="relative z-10 w-3/4">
                <h3 className="text-2xl font-bold mb-2">AI-Powered Extraction</h3>
                <p className="text-muted-foreground">
                  Leverage advanced GenAI models to intelligently identify and extract structured data from completely unstructured web pages.
                </p>
              </div>
            </div>

            {/* Small Feature - Automation */}
            <div className="col-span-1 group relative overflow-hidden rounded-3xl bg-background border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-6 flex flex-col min-h-[250px]">
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-auto group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Automated Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Run your workflows on robust cron schedules and receive data fresh precisely when you need it.
              </p>
            </div>

            {/* Small Feature - Stealth */}
            <div className="col-span-1 group relative overflow-hidden rounded-3xl bg-background border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-6 flex flex-col min-h-[250px]">
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-auto group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Built-in Stealth</h3>
              <p className="text-sm text-muted-foreground">
                Bypass captchas and bot detections automatically using our rotating residential proxy networks.
              </p>
            </div>

            {/* Wide Feature - Analytics */}
            <div className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-4 transition-all shadow-xl shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              <div className="flex-1 relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Deep Analytics & Billing Management</h3>
                <p className="text-primary-foreground/80 max-w-3xl text-lg">
                  Monitor your workflow execution stats, track precise credit consumption, and gain deep insights into your scraping pipeline performance with our holistic, real-time dashboard.
                </p>
              </div>
              <div className="relative z-10 p-6 bg-black/20 rounded-full backdrop-blur-sm shrink-0 border border-white/10 group-hover:bg-black/30 transition-colors">
                <BarChart className="h-16 w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="container mx-auto px-4 py-32 flex flex-col items-center">
        <div className="text-primary font-semibold tracking-wide uppercase mb-2">Pricing</div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">Pay only for what you scrape</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto text-center">
          Start for free to test the waters. Need more power? Simply buy credits as you go.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {/* Small Pack */}
          <div className="rounded-3xl border border-border bg-card p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Small Pack</h3>
            <div className="mb-4 text-muted-foreground">Perfect for one-off tasks</div>
            <div className="my-6">
              <span className="text-5xl font-extrabold">$9.99</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span className="font-medium">1,000 Credits</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> <span>Credits never expire</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> <span>Full feature access</span></li>
            </ul>
            <Link href="/dashboard/billing" className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl" })}>
              Purchase
            </Link>
          </div>

          {/* Medium Pack */}
          <div className="rounded-3xl border-2 border-primary bg-card p-8 flex flex-col shadow-xl shadow-primary/10 relative overflow-hidden md:scale-105 z-10">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Medium Pack</h3>
            <div className="mb-4 text-muted-foreground">Great for growing data needs</div>
            <div className="my-6">
              <span className="text-5xl font-extrabold text-primary">$39.99</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span className="font-medium text-lg">5,000 Credits</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span className="font-medium">Credits never expire</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Smart AI Extraction Models</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Priority execution queue</span></li>
            </ul>
            <Link href="/dashboard/billing" className={buttonVariants({ variant: "default", className: "w-full h-12 rounded-xl text-md shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow" })}>
              Purchase
            </Link>
          </div>

          {/* Large Pack */}
          <div className="rounded-3xl border border-border bg-card p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Large Pack</h3>
            <div className="mb-4 text-muted-foreground">For scaling up automation</div>
            <div className="my-6">
              <span className="text-5xl font-extrabold">$69.99</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span className="font-medium">10,000 Credits</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> <span>Credits never expire</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> <span>Smart AI Extraction Models</span></li>
            </ul>
            <Link href="/dashboard/billing" className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-xl" })}>
              Purchase
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="border-t bg-muted/10 py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Got a question? We&apos;ve got answers. If you have some other questions, feel free to contact us.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-background rounded-2xl border p-2 shadow-sm">
            <AccordionItem value="item-1" className="px-4 border-b">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6">Do I need coding experience to use ScrapeBot?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                Not at all. ScrapeBot&apos;s visual workflow builder is designed for zero-code execution. You can simply drag blocks to create your automation flow or rely on our AI extraction node by typing what data you need in plain English.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-4 border-b">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6">How are &quot;credits&quot; calculated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                Credits are consumed per node execution in a workflow. Simple actions like clicking a button cost a fraction, while heavy operations like AI extraction consume slightly more. This ensures you only pay for exactly the compute power you utilize.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-4 border-b">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6">Can it bypass Cloudflare or Captchas?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                Yes. Our platform utilizes integrated headless browsing techniques backed by rotating residential proxies that drastically reduce the chances of being blocked by modern bot-protection systems.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="px-4 border-none border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6">Can I export the data directly to my database?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                Absolutely! Our workflow builder allows you to connect the final output to Webhooks. You can easily catch these payloads on your server to populate your Postgres, MySQL, or MongoDB directly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="container mx-auto px-4 py-32 flex flex-col items-center text-center relative">
        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -z-10 mt-10 md:mt-20 mx-4 max-w-6xl md:mx-auto" />
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">Stop manually copying pasting. Let AI do the heavy lifting.</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-xl">
          Join thousands of developers and data scientists who automate their web scraping with ScrapeBot.
        </p>
        <Link href="/signup" className={buttonVariants({ variant: "default", size: "lg", className: "h-16 px-12 text-lg font-medium rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-transform" })}>
          Get Started For Free
          <Sparkles className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
