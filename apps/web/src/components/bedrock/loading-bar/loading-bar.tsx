import { HTMLAttributes } from "react";
import { styles } from ".";
import clsx from "clsx";

interface LoadingBarProps extends HTMLAttributes<HTMLDivElement> {
  percentage: number;
  className?: string;
}

export const LoadingBar = ({ percentage, className, ...props }: LoadingBarProps) => (
  <div className={clsx(styles.outer, className && className)} {...props}>
    <div className={styles.inner} style={{ width: `${percentage}%` }} />
  </div>
);
