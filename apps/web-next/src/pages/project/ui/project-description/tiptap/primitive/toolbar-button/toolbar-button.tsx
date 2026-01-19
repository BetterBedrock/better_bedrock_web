import clsx from "clsx";
import { styles } from ".";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { SimpleButton } from "@/shared/ui/simple-button";
import { Tooltip } from "@/shared/ui/tooltip";

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  tooltip?: ReactNode;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { className, children, tooltip, "aria-label": ariaLabel, ...props },
    ref,
  ) => (
    <Tooltip text={String(tooltip)}>
      <SimpleButton
        transparent
        className={clsx(styles.button, className)}
        extraClassName={styles.child}
        ref={ref}
        aria-label={ariaLabel}
        isClicked={Boolean(props["aria-pressed"])}
        {...props}
      >
        {children}
      </SimpleButton>
    </Tooltip>
  ),
);

ToolbarButton.displayName = "ToolbarButton";
