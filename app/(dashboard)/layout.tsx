import { Separator } from "@/components/ui/separator";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <div className="flex flex-col flex-1 min-h-dvh">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          ScrapeBot
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
