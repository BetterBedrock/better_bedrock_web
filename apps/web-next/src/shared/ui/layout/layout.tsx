import { LayoutFooter } from "@/shared/ui/layout/layout-footer";
import { LayoutNavbar } from "@/shared/ui/layout/layout-navbar";
import { LayoutNotification } from "@/shared/ui/layout/layout-notification";
import { ReactNode } from "react";

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
