import { HTMLAttributes, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <div className={clsx(styles.wrapper, className && className)} {...props}>
      <section className={styles.section}>{children}</section>
    </div>
  );
};
