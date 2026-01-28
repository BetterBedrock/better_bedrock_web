import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

import styles from "./card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  sub?: boolean;
  fullWidth?: boolean;
  negativeMarginTop?: boolean;
  negativeMarginBottom?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, sub, fullWidth, negativeMarginTop, negativeMarginBottom, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.container, sub && styles.sub, fullWidth && styles.fullWidth, negativeMarginTop && styles.negativeMarginTop, negativeMarginBottom && styles.negativeMarginBottom, className)} {...rest}>
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
  smallerGap?: boolean;
  smallerPadding?: boolean;
  noPaddingBottom?: boolean;
  className?: string;
}

export const CardBody = ({ children, gap, smallerGap, smallerPadding, noPaddingBottom, className, ...rest }: CardBodyProps) => (
  <div className={clsx(children && styles.body, gap && styles.gap, smallerGap && styles.smallerGap, smallerPadding && styles.smallerPadding, noPaddingBottom && styles.noPaddingBottom, className)} {...rest}>{children}</div>
);

Card.displayName = "Card";