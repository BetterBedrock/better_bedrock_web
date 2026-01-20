import clsx from "clsx";
import { styles } from ".";

interface TiptapIconProps {
  className?: string;
  icon: string;
}

export const TiptapIcon = ({ icon, className }: TiptapIconProps) => (
  <img src={icon} className={clsx(styles.icon, className && className)} alt="icon" />
);
