import { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./button-group.module.scss";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  // Add "responsive" as a valid option
  direction?: "horizontal" | "vertical" | "responsive";
  className?: string;
}

export const ButtonGroup = ({
  children,
  // Default to "responsive" to make it the standard behavior
  direction = "responsive",
  className,
  ...props
}: ButtonGroupProps) => {
  return (
    <div
      className={clsx(styles.buttonGroup, className)}
      // The data-direction attribute is now driven by the prop
      data-direction={direction}
      {...props}
    >
      {children}
    </div>
  );
};