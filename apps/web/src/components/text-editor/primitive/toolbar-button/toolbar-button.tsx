import { SimpleButton } from "~/components/bedrock/simple-button";
import { Tooltip } from "~/components/bedrock/tooltip";
import clsx from "clsx";
import { styles } from ".";
import { forwardRef } from "react";

export interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { className, children, tooltip, showTooltip = true, "aria-label": ariaLabel, ...props },
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

    // console.log({ pres: Boolean(props["aria-pressed"]), tpp: tooltip });

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
