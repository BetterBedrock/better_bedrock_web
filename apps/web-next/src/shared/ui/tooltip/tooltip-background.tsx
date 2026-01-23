import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./tooltip.module.scss";

interface TooltipBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const TooltipBackground = ({ children, className }: TooltipBackgroundProps) => (
  <div className={clsx(styles.tooltip, className)}>
    <div className={clsx(styles.box, styles.unlimited)}>{children}</div>
  </div>
);
