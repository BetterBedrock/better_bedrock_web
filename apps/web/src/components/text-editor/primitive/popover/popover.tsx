import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "~/lib/tiptap-utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn("tiptap-popover", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
