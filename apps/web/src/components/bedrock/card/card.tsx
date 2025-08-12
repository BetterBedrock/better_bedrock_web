import clsx from "clsx";
import { styles } from ".";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  sub?: boolean;
}

export const Card = ({ className, children, sub, ...rest }: CardProps) => (
  <div className={clsx(styles.container, sub && styles.sub, className && className)} {...rest}>
    {children}
  </div>
);

export const CardDivider = () => (
  <div>
    <div className={styles.top} />
    <div className={styles.bottom} />
  </div>
);
