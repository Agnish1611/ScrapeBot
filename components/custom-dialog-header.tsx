import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon className={cn("stroke-primary", props.iconClassName)} />
          )}
          {props.title && (
            <div className={cn("text-xl text-primary", props.titleClassName)}>
              {props.title}
            </div>
          )}
          {props.subTitle && (
            <div
              className={cn(
                "text-sm text-muted-foreground",
                props.subTitleClassName
              )}
            >
              {props.subTitle}
            </div>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
