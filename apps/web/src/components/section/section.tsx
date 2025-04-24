import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fixed?: boolean;
  className?: string;
}

export const Section = ({ children, fixed, className, ...props }: SectionProps) => {
  return (
    <div className={clsx(styles.wrapper, fixed && styles.fixed, className && className)} {...props}>
      <section className={styles.section}>{children}</section>
    </div>
  );
};
