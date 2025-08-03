import { HTMLAttributes } from "react";
import styles from "./label.module.css";
import clsx from "clsx";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: string;
  width?: string;
  minHeight?: string;
  type?: "green" | "white" | "dark";
  className?: string;
}

export const Label = ({
  children,
  width = "100%",
  height = "auto",
  minHeight,
  type = "white",
  className,
  ...props
}: LabelProps) => (
  <div
    className={clsx(styles.label, styles[type], className && className)}
    style={{ width: width, height: height, minHeight: minHeight }}
    {...props}
  >
    {children}
  </div>
);
