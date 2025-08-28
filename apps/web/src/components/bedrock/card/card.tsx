import React from "react";
import clsx from "clsx";
import { styles } from ".";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  sub?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, sub, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.container, sub && styles.sub, className)} {...rest}>
      {children}
    </div>
  ),
);

interface CardDividerProps {
  sub?: boolean;
}

export const CardDivider = ({ sub }: CardDividerProps) => (
  <div>
    <div className={clsx(styles.top, sub && styles.light)} />
    <div className={clsx(styles.bottom, sub && styles.light)} />
  </div>
);
