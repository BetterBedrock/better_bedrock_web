import clsx from "clsx";
import { styles } from ".";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  sub?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
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

interface CardBodyProps {
  children: ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => (
  <div className={styles.body}>{children}</div>
);
