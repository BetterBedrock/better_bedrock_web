import * as React from "react";

// --- Lib ---
import { cn } from "~/lib/tiptap-utils";

import "~/components/tiptap-ui-primitive/button/button-colors.scss";
import "~/components/tiptap-ui-primitive/button/button-group.scss";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { Tooltip } from "~/components/bedrock/tooltip";
import clsx from "clsx";
import { styles } from ".";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  shortcutKeys?: string;
}

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({ shortcuts }) => {
  if (shortcuts.length === 0) return null;

  return (
    <div>
      {shortcuts.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </React.Fragment>
      ))}
    </div>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      tooltip,
      showTooltip = true,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {

    if (!tooltip || !showTooltip) {
      return (
        <SimpleButton
          transparent
          className={clsx(styles.button, className)}
          ref={ref}
          aria-label={ariaLabel}
          isClicked={Boolean(props["aria-pressed"])}
          {...props}
        >
          {children}
        </SimpleButton>
      );
    }

    console.log({ pres: Boolean(props["aria-pressed"]), tpp: tooltip });

    return (
      <Tooltip text={String(tooltip)}>
        <SimpleButton
          transparent
          className={clsx(styles.button, className)}
          ref={ref}
          aria-label={ariaLabel}
          isClicked={Boolean(props["aria-pressed"])}
          {...props}
        >
          {children}
        </SimpleButton>
      </Tooltip>
    );
  },
);

Button.displayName = "Button";

export const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, children, orientation = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("tiptap-button-group", className)}
      data-orientation={orientation}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
});
ButtonGroup.displayName = "ButtonGroup";

export default Button;
