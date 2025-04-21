import { ReactNode } from 'react';
import { LayoutNavbar, LayoutFooter } from '.';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNavbar />
    {children}
    <LayoutFooter />
  </>
);