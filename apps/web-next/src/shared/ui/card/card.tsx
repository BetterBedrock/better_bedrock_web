import clsx from "clsx";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

import styles from "./card.module.scss";

export const gapSizes = ["xxsm", "xsm", "sm", "md", "lg"] as const;
export type GapSize = (typeof gapSizes)[number];

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  sub?: boolean;
  fullWidth?: boolean;
  negativeMarginTop?: boolean;
  negativeMarginBottom?: boolean;
}

interface CardDividerProps {
  sub?: boolean;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: GapSize;
  className?: string;
}

export interface CardItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: GapSize;
}

type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> & {
  Divider: React.FC<CardDividerProps>;
  Body: React.FC<CardBodyProps>;
  Item: React.FC<CardItemProps>;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      sub,
      fullWidth,
      negativeMarginTop,
      negativeMarginBottom,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={clsx(
        styles.container,
        sub && styles.sub,
        fullWidth && styles.fullWidth,
        negativeMarginTop && styles.negativeMarginTop,
        negativeMarginBottom && styles.negativeMarginBottom,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
) as CardComponent;

const CardDivider = ({ sub }: CardDividerProps) => (
  <div className={styles.divider}>
    <div className={clsx(styles.top, sub && styles.light)} />
    <div className={clsx(styles.bottom, sub && styles.light)} />
  </div>
);

const CardBody = ({ children, className, gap, ...rest }: CardBodyProps) => (
  <div
    {...rest}
    className={clsx(children && styles.body, gap && styles[gap], className)}
  >
    {children}
  </div>
);

const CardItem = ({ children, gap = "xsm", ...rest }: CardItemProps) => (
  <div className={clsx(styles.item, gap && styles[gap])} {...rest}>
    {children}
  </div>
);

Card.Divider = CardDivider;
Card.Body = CardBody;
Card.Item = CardItem;

Card.displayName = "Card";
