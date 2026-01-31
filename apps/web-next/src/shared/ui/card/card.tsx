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
  gapSize?: "sm" | "md" | "lg";
  gap?: boolean;
  smallerGap?: boolean;
  smallerPadding?: boolean;
  noPaddingBottom?: boolean;
  className?: string;
}

export const CardBody = ({ children, gap, smallerGap, smallerPadding, noPaddingBottom, className, gapSize, ...rest }: CardBodyProps) => (
  <div className={clsx(children && styles.body, gap && styles.gap, smallerGap && styles.smallerGap, smallerPadding && styles.smallerPadding, noPaddingBottom && styles.noPaddingBottom, className, gapSize && styles[`cardBodyGapSize${gapSize}`])} {...rest}>{children}</div>
);

interface CardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gapSize?: "sm" | "md" | "lg";
}

export const CardWrapper = ({ children, gapSize = "sm", ...rest }: CardWrapperProps) => (
  <div className={clsx(styles.cardWrapper, gapSize && styles[`cardWrapperGapSize${gapSize}`])} {...rest}>
    {children}
  </div>
);

Card.displayName = "Card";