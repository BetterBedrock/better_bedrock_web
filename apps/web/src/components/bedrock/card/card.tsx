import clsx from "clsx";
import { styles } from ".";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Card = ({ className, children, ...rest }: CardProps) => (
  <div className={clsx(styles.container, className && className)} {...rest}>
    {children}
  </div>
);

export const CardDivider = () => (
  <div>
    <div className={styles.top} />
    <div className={styles.bottom} />
  </div>
);
