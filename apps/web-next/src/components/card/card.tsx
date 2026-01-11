import clsx from "clsx";
import { styles } from ".";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  sub?: boolean;
  fullWidth?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, sub, fullWidth, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.container, sub && styles.sub, fullWidth && styles.fullWidth, className)} {...rest}>
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

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: boolean;
}

export const CardBody = ({ children, gap, ...rest }: CardBodyProps) => (
  <div className={clsx(styles.body, gap && styles.gap)} {...rest}>{children}</div>
);

Card.displayName = "Card";