import { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./button-group.module.scss";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "horizontal" | "vertical" | "responsive";
  className?: string;
}

export const ButtonGroup = ({
  children,
  direction = "responsive",
  className,
  ...props
}: ButtonGroupProps) => (
  <div
    className={clsx(styles.buttonGroup, className)}
    // The data-direction attribute is now driven by the prop
    data-direction={direction}
    {...props}
  >
    {children}
  </div>
);
