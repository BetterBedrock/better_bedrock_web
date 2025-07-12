import { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

interface LinkProps {
  link: string;
  isExternalLink?: boolean;
  children: ReactNode;
  className?: string;
}

export const Link = ({ children, link, isExternalLink = false, className }: LinkProps) => {
  return isExternalLink ? (
    <a href={link} className={className && className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <ReactRouterLink to={link} className={className && className}>
      {children}
    </ReactRouterLink>
  );
};
