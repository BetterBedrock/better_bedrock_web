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
    <div
      ref={ref}
      className={clsx(styles.container, sub && styles.sub, className)}
      {...rest}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

export const CardDivider = () => (
  <div>
    <div className={styles.top} />
    <div className={styles.bottom} />
  </div>
);
