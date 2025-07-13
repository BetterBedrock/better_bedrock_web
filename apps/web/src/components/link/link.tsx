import clsx from "clsx";
import { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { styles } from ".";

interface LinkProps {
  link: string;
  isExternalLink?: boolean;
  children: ReactNode;
  hideStyles?: boolean;
  className?: string;
}

export const Link = ({
  children,
  hideStyles = false,
  link,
  isExternalLink = false,
  className,
}: LinkProps) => {
  return isExternalLink ? (
    <a
      href={link}
      className={clsx(className && className, hideStyles && styles.hide)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <ReactRouterLink to={link} className={clsx(className && className, hideStyles && styles.hide)}>
      {children}
    </ReactRouterLink>
  );
};
