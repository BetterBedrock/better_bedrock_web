import { useComposedRef } from "~/hooks/use-composed-ref";
import clsx from "clsx";
import { styles, useToolbar } from ".";
import { styles as descriptionStyles } from "~/pages/project/components/description";
import { forwardRef, useRef, HTMLAttributes } from "react";

export const Toolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const toolbarRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRef(toolbarRef, ref);
    useToolbar(toolbarRef);

    return (
      <div
        ref={composedRef}
        className={clsx(styles.card, descriptionStyles.toolbar, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
