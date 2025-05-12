import { HTMLAttributes } from "react";
import styles from "./label.module.css";
import clsx from "clsx";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: string;
  width?: string;
  minHeight?: string;
  type?: "green" | "white";
  className?: string;
  extraClassName?: string;
}

export const Label = ({
  children,
  width = "100%",
  height = "auto",
  minHeight,
  type = "white",
  className,
  extraClassName,
  ...props
}: LabelProps) => (
  <div
    outer-data-type={type}
    className={clsx(styles.outer_div, className && className)}
    style={{ width: width, height: height, minHeight: minHeight }}
    {...props}
  >
    <div inner-data-type={type} className={clsx(styles.inner_div, extraClassName && extraClassName)}>
      {children}
    </div>
  </div>
);
