import clsx from "clsx";
import { ReactNode } from "react";
import { default as NextRouterLink } from "next/link";
import { styles } from ".";

interface LinkProps {
  link?: string;
  isExternalLink?: boolean;
  children: ReactNode;
  hideStyles?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Link = ({
  children,
  hideStyles = false,
  link,
  isExternalLink = false,
  className,
  onClick,
}: LinkProps) => {
  if (!link) return children;

  return isExternalLink ? (
    <a
      href={link}
      className={clsx(className && className, hideStyles && styles.hide)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <NextRouterLink
      href={link}
      className={clsx(className && className, hideStyles && styles.hide)}
      onClick={onClick}
    >
      {children}
    </NextRouterLink>
  );
};
