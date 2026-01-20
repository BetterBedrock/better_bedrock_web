import { ReactNode } from "react";
import { LayoutNavbar, LayoutFooter, LayoutNotification } from ".";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNotification />
    <LayoutNavbar />
    {children}
    <LayoutFooter />
  </>
);
