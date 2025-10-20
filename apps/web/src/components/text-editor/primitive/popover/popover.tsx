import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styles } from ".";
import { cn } from "~/lib/tiptap-utils";
import { ComponentProps } from "react";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) => (
  // <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(styles.popover, className)}
      {...props}
    />
  // </PopoverPrimitive.Portal>
);
