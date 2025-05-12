import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fixed?: boolean;
  center?: boolean;
  className?: string;
}

export const Section = ({ children, fixed, center, className, ...props }: SectionProps) => (
  <div className={clsx(styles.wrapper, fixed && styles.fixed, className && className)} {...props}>
    <section className={clsx(styles.section, center && styles.center)}>{children}</section>
  </div>
);
