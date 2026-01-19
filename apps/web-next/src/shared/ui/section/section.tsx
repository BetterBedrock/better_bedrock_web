import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import styles from "./section.module.scss";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fixed?: boolean;
  center?: boolean;
  className?: string;
  extraClassName?: string;
}

export const Section = ({
  children,
  fixed,
  center,
  className,
  extraClassName,
  ...props
}: SectionProps) => (
  <div className={clsx(styles.wrapper, !fixed && className && className)} {...props}>
    {fixed && <div className={clsx(fixed && styles.fixed, className && className)} />}
    <section
      className={clsx(styles.section, center && styles.center, extraClassName && extraClassName)}
    >
      {children}
    </section>
  </div>
);
