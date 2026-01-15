"use client";

import clsx from "clsx";
import { styles, useToolbar } from ".";
import { forwardRef, useRef, HTMLAttributes } from "react";
import useComposedRef from "@/widgets/project-description/model/use-composed-ref";

export const Toolbar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposedRef(toolbarRef, ref);
  useToolbar(toolbarRef);

  return (
    <div
      ref={composedRef}
      className={clsx(styles.card, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Toolbar.displayName = "Toolbar";
