import clsx from "clsx";
import { ReactNode } from "react";
import { default as NextRouterLink } from "next/link";
import styles from "./link.module.scss";

interface LinkProps {
  link?: string;
  isExternalLink?: boolean;
  children: ReactNode;
  hideStyles?: boolean;
  className?: string;
  onClick?: () => void;
  scroll?: boolean;
  underlined?: boolean;
}

export const Link = ({
  children,
  hideStyles = false,
  link,
  isExternalLink = false,
  className,
  onClick,
  scroll,
  underlined = false
}: LinkProps) => {
  if (!link) return children;

  return isExternalLink ? (
    <a
      href={link}
      className={clsx(className && className, hideStyles && styles.hide, underlined && styles.underlined)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <NextRouterLink
      href={link}
      className={clsx(className && className, hideStyles && styles.hide, underlined && styles.underlined)}
      onClick={onClick}
      scroll={scroll}
    >
      {children}
    </NextRouterLink>
  );
};
